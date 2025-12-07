import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0'
import { createTransport } from "npm:nodemailer@6.9.13";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

serve(async (req) => {
  // 1. CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  // 2. Validação de Método
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Método não permitido.' }), {
      status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  try {
    const rawBody = await req.text();
    if (!rawBody) {
      return new Response(JSON.stringify({ error: 'Payload vazio.' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const { name, email, message, token } = JSON.parse(rawBody);

    // 3. Validação Turnstile
    if (!token) {
      return new Response(JSON.stringify({ error: 'Token de segurança ausente.' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const secretKey = Deno.env.get('CLOUDFLARE_TURNSTILE_SECRET_KEY');
    const formData = new URLSearchParams();
    formData.append('secret', secretKey ?? '');
    formData.append('response', token);
    formData.append('remoteip', req.headers.get('x-forwarded-for') || '');

    const turnstileRes = await fetch(TURNSTILE_VERIFY_URL, {
        method: 'POST',
        body: formData,
    });

    const verification = await turnstileRes.json();
    if (!verification.success) {
        return new Response(JSON.stringify({ error: 'Falha na verificação de segurança.', details: verification['error-codes'] }), {
            status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }

    // 4. Salvar no Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { error: dbError } = await supabase.from('contact_submissions').insert([{ name, email, message }]);

    if (dbError) {
      console.error("Erro DB:", dbError);
      throw new Error("Erro ao salvar no banco de dados.");
    }

    // 5. Enviar Email (Nodemailer)
    try {
        const smtpUser = Deno.env.get('SMTP_USER');
        const smtpPass = Deno.env.get('SMTP_PASS');

        if (smtpUser && smtpPass) {
            const transporter = createTransport({
                service: 'gmail',
                auth: { user: smtpUser, pass: smtpPass }
            });

            await transporter.sendMail({
                from: `"Site Combo Digital" <${smtpUser}>`,
                to: smtpUser, // Envia para você mesmo
                replyTo: email, // Permite responder direto para o cliente
                subject: `🚀 Novo Lead: ${name}`,
                html: `
                    <div style="font-family: sans-serif; padding: 20px; color: #333;">
                        <h2 style="color: #0070f3;">Novo contato recebido!</h2>
                        <p><strong>Nome:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Mensagem:</strong></p>
                        <blockquote style="background: #f4f4f4; padding: 15px; border-left: 4px solid #0070f3;">${message}</blockquote>
                        <hr/>
                        <small>Enviado via formulário do site.</small>
                    </div>
                `
            });
            console.log("Email de notificação enviado!");
        } else {
            console.warn("SMTP_USER ou SMTP_PASS não configurados.");
        }
    } catch (emailError) {
        console.error("Erro ao enviar email:", emailError);
        // Não falhamos a requisição inteira se o email falhar, pois o lead já está salvo.
    }

    return new Response(JSON.stringify({ message: 'Sucesso! Entraremos em contato em breve.' }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (err) {
    console.error("Erro Geral:", err);
    return new Response(JSON.stringify({ error: 'Erro interno no servidor.' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});