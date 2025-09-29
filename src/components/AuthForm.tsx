import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { COLORS } from '../constants';

const AuthForm: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      let response;
      if (isSignUp) {
        response = await supabase.auth.signUp({ email, password });
      } else {
        response = await supabase.auth.signInWithPassword({ email, password });
      }

      if (response.error) {
        throw response.error;
      }

      if (isSignUp && response.data.user && !response.data.session) {
        setMessage({ type: 'success', text: 'Verifique seu e-mail para confirmar sua conta!' });
      } else if (response.data.session) {
        setMessage({ type: 'success', text: `Bem-vindo(a), ${response.data.user?.email}!` });
        // Optionally redirect or update UI after successful login
      } else {
        setMessage({ type: 'error', text: 'Ocorreu um erro inesperado.' });
      }

    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Erro de autenticação.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 shadow-2xl shadow-blue-500/10">
      <h2 className="text-4xl font-bold text-white mb-8 text-center">
        {isSignUp ? 'Criar Conta' : 'Entrar'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="seu@email.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-300 text-sm font-bold mb-2">
            Senha
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="********"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 rounded-lg font-bold text-white uppercase tracking-widest transition-all duration-300
                     bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700
                     disabled:opacity-50 disabled:cursor-not-allowed"
          data-cursor-hover
        >
          {loading ? 'Carregando...' : (isSignUp ? 'Registrar' : 'Entrar')}
        </button>
      </form>
      {message && (
        <p className={`mt-6 text-center font-semibold ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
          {message.text}
        </p>
      )}
      <p className="mt-8 text-center text-gray-400">
        {isSignUp ? 'Já tem uma conta?' : 'Não tem uma conta?'}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="ml-2 font-bold text-orange-400 hover:text-orange-300 transition-colors"
          data-cursor-pointer
        >
          {isSignUp ? 'Entrar' : 'Registrar'}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;