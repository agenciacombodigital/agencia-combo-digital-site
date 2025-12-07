import { Page, NavLink, PortfolioItem } from './types';

export const COLORS = {
  black: '#000000',
  blue: '#00a1ff',
  orange: '#fb5626',
  yellow: '#fcc017',
  white: '#FFFFFF',
  gray: '#1a1a1a',
};

export const PAGES: NavLink[] = [
  { name: Page.Home, path: '/' },
  { name: Page.About, path: '/quem-somos' }, // Updated path
  { name: Page.Portfolio, path: '/portfolio' },
  { name: Page.Contact, path: '/contato' }, // Updated path
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 7,
    title: 'Campanha Méris Confeitaria',
    category: 'Branding',
    imageUrl: '/images/portfolio/méris-confeitaria/Capa.webp',
    galleryImages: [
      '/images/portfolio/méris-confeitaria/detalhe-1.webp',
      '/images/portfolio/méris-confeitaria/detalhe-2.webp',
      '/images/portfolio/méris-confeitaria/detalhe-3.webp',
      '/images/portfolio/méris-confeitaria/detalhe-4.webp',
      '/images/portfolio/méris-confeitaria/detalhe-5.webp',
      '/images/portfolio/méris-confeitaria/detalhe-6.webp',
      '/images/portfolio/méris-confeitaria/detalhe-7.webp',
      '/images/portfolio/méris-confeitaria/detalhe-8.webp',
      '/images/portfolio/méris-confeitaria/detalhe-9.webp',
      '/images/portfolio/méris-confeitaria/detalhe-10.webp',
      '/images/portfolio/méris-confeitaria/detalhe-11.webp',
    ],
    description: "Campanha publicitária para a nova doceria Méris Confeitaria, unindo delicadeza e sofisticação em rosa e marrom. Destaque para doces exclusivos, embalagens personalizadas e o conceito que guia a marca: “Doce que encanta, arte que seduz.”",
    featured: true,
    metric: 'Arte que Seduz',
    technologies: ['Branding', 'Identidade Visual', 'Embalagem', 'Direção de Arte', 'Social Media'],
    colorPalette: ['#E6A4B4', '#6F4E37', '#FFFFFF', '#F3D7CA']
  },
  {
    id: 1,
    title: 'Salgueiro, Nossa Terra, Nossa Pele',
    category: 'Branding',
    imageUrl: '/images/portfolio/salgueiro/capa.webp',
    galleryImages: [
      '/images/portfolio/salgueiro/detalhe-1.webp',
      '/images/portfolio/salgueiro/detalhe-2.webp',
      '/images/portfolio/salgueiro/detalhe-3.webp',
      '/images/portfolio/salgueiro/detalhe-4.webp',
      '/images/portfolio/salgueiro/detalhe-5.webp',
      '/images/portfolio/salgueiro/detalhe-6.webp',
      '/images/portfolio/salgueiro/detalhe-7.webp',
      '/images/portfolio/salgueiro/detalhe-8.webp',
    ],
    description: "Campanha publicitária para o Salgueiro Atlético Clube no lançamento da nova camisa oficial, destacando a força do Carcará do Sertão, a cultura indígena e o orgulho da torcida sertaneja.",
    featured: true,
    metric: 'Orgulho Sertanejo',
    technologies: ['Branding', 'Campanha Publicitária', 'Social Media', 'Direção de Arte'],
    colorPalette: ['#d11a22', '#00843d', '#ffffff', '#000000']
  },
  {
    id: 2,
    title: 'Dá um hut no Hexa',
    category: 'Motion',
    imageUrl: '/images/portfolio/pizzahut/capa.webp',
    galleryImages: [
      '/images/portfolio/pizzahut/detalhe-1.webp',
      '/images/portfolio/pizzahut/detalhe-2.webp',
      '/images/portfolio/pizzahut/detalhe-3.webp',
      '/images/portfolio/pizzahut/detalhe-4.webp',
      '/images/portfolio/pizzahut/detalhe-5.webp',
      '/images/portfolio/pizzahut/detalhe-6.webp',
      '/images/portfolio/pizzahut/detalhe-7.webp',
      '/images/portfolio/pizzahut/detalhe-8.webp',
      '/images/portfolio/pizzahut/detalhe-9.webp',
      '/images/portfolio/pizzahut/detalhe-10.webp',
      '/images/portfolio/pizzahut/detalhe-11.webp',
      '/images/portfolio/pizzahut/detalhe-12.webp',
    ],
    description: "Campanha publicitária com linguagem popular e criativa, trazendo humor e irreverência para engajar torcedores na expectativa pelo título, unindo futebol, cultura brasileira e espírito de celebração.",
    featured: true,
    metric: '+2M impressões',
    technologies: ['After Effects', 'Social Media', 'Marketing de Conteúdo', 'Motion Graphics'],
    colorPalette: ['#d92d2d', '#ffffff', '#000000', '#f2a700']
  },
  {
    id: 4,
    title: 'Testemunhas de Djonga',
    category: 'Branding',
    imageUrl: '/images/portfolio/djonga/capa.webp',
    galleryImages: [
      '/images/portfolio/djonga/detalhe-1.webp',
      '/images/portfolio/djonga/detalhe-2.webp',
      '/images/portfolio/djonga/detalhe-3.webp',
      '/images/portfolio/djonga/detalhe-4.webp',
      '/images/portfolio/djonga/detalhe-5.webp',
      '/images/portfolio/djonga/detalhe-6.webp',
      '/images/portfolio/djonga/detalhe-7.webp',
      '/images/portfolio/djonga/detalhe-8.webp',
      '/images/portfolio/djonga/detalhe-9.webp',
      '/images/portfolio/djonga/detalhe-10.webp',
    ],
    description: "Campanha criativa inspirada na força cultural do rap nacional, destacando a identidade, a resistência e a voz das ruas em peças visuais impactantes para engajar fãs e comunidades.",
    featured: true,
    metric: '+500K seguidores',
    technologies: ['Identidade Visual', 'Social Media', 'Figma', 'Comunidade'],
    colorPalette: ['#000000', '#ffcc00', '#ffffff', '#cccccc']
  },
  {
    id: 3,
    title: 'Açaí que vem da Amazônia',
    category: 'Branding',
    imageUrl: '/images/portfolio/acai-yasai/capa.webp',
    galleryImages: [
      '/images/portfolio/acai-yasai/detalhe-1.webp',
      '/images/portfolio/acai-yasai/detalhe-2.webp',
      '/images/portfolio/acai-yasai/detalhe-3.webp',
      '/images/portfolio/acai-yasai/detalhe-4.webp',
      '/images/portfolio/acai-yasai/detalhe-5.webp',
      '/images/portfolio/acai-yasai/detalhe-6.webp',
      '/images/portfolio/acai-yasai/detalhe-7.webp',
      '/images/portfolio/acai-yasai/detalhe-8.webp',
    ],
    description: "Campanha publicitária para a Yasaí, destacando a origem amazônica do produto em peças visuais impactantes, unindo natureza, cultura e energia em cada pote de açaí.",
    metric: 'Origem Destacada',
    technologies: ['Branding', 'Embalagem', 'Fotografia', 'Social Media'],
    colorPalette: ['#4a2c6a', '#f5d13e', '#ffffff', '#8bc34a']
  },
  {
    id: 5,
    title: 'Website Nuria Uliana',
    category: 'Web',
    imageUrl: '/images/portfolio/nuria-uliana/capa.webp',
    galleryImages: [
      '/images/portfolio/nuria-uliana/detalhe-1.webp',
      '/images/portfolio/nuria-uliana/detalhe-2.webp',
    ],
    description: "Criação do site oficial da produtora Nuria Uliana, com design elegante e funcional, destacando seu portfólio audiovisual e transmitindo sua identidade criativa de forma moderna e impactante.",
    technologies: ['React', 'GSAP', 'Figma', 'Headless CMS'],
    colorPalette: ['#1a1a1a', '#ffffff', '#fb5626', '#a0a0a0']
  },
  {
    id: 6,
    title: 'Conectando França e Brasil',
    category: 'Web',
    imageUrl: '/images/portfolio/moohtech/capa.webp',
    galleryImages: [],
    description: "Campanha publicitária para a Mooh Tech, unindo inovação tecnológica e impacto social em peças visuais que mostram como a empresa conecta pessoas e soluções entre Brasil e França.",
    technologies: ['Marketing Digital', 'Landing Page', 'SEO', 'Google Ads'],
    colorPalette: ['#0055a4', '#ffffff', '#ef4135', '#00a1ff']
  }
];

export const TESTIMONIALS = [
    {
        quote: "A Combo não entregou apenas marketing, entregou clareza estratégica. A consultoria reformulou nossa presença digital e o marketing trouxe leads qualificados que realmente fecham negócio. Deixamos de ser apenas mais um escritório para nos tornarmos referência em contabilidade consultiva.",
        author: "Wagner Marcelo",
        title: "CEO - Black Contábil",
        imageUrl: "https://picsum.photos/seed/wagner-marcelo/100/100"
    },
    {
        quote: "Precisávamos de barulho e impacto para nossa startup, e a campanha da Combo foi ensurdecedora no melhor sentido. A criatividade deles conectou nossa tecnologia com o público de uma forma humana e viral. O resultado foi um salto imediato em downloads e reconhecimento de marca.",
        author: "Everton Cruz",
        title: "CEO - MoohTech",
        imageUrl: "https://picsum.photos/seed/everton-cruz/100/100"
    },
    {
        quote: "A Combo entendeu a alma do Espaço Vip. As campanhas capturaram a elegância da nossa marca e trouxeram um fluxo constante de novas clientes para a loja. Eles transformaram seguidores em compradoras fiéis. É incrível ver o retorno sobre o investimento mês após mês.",
        author: "Adriana Morais",
        title: "Proprietária - Espaço Vip Cosméticos",
        imageUrl: "https://picsum.photos/seed/adriana-morais/100/100"
    },
    {
        quote: "Eu tinha o trabalho, mas não tinha a 'cara'. A Combo criou um site que é uma verdadeira vitrine de luxo para minhas produções e definiu um posicionamento que me colocou em outro patamar no mercado. Hoje, minha marca pessoal fala por mim antes mesmo de eu entrar na sala.",
        author: "Nuria Uliana",
        title: "Produtora",
        imageUrl: "https://picsum.photos/seed/nuria-uliana/100/100"
    },
    {
        quote: "A otimização que a Combo implementou no nosso processo de busca foi revolucionária. O que levava horas agora é instantâneo. Eles não só desenvolveram um sistema impecável, mas entenderam nossa complexidade interna e entregaram uma solução que poupa tempo e gera inteligência comercial.",
        author: "Katya Erdmann",
        title: "Gerente Comercial - IQVIA",
        imageUrl: "https://picsum.photos/seed/katya-erdmann/100/100"
    }
];

export const TIMELINE_EVENTS = [
  {
    year: '2018',
    title: 'O Início',
    description: 'A Combo Digital nasce de uma visão: fundir criatividade audaciosa com tecnologia de ponta. Começamos em uma pequena sala, com grandes sonhos.',
  },
  {
    year: '2020',
    title: 'Primeiro Prêmio',
    description: 'Nosso projeto "Salto Quântico" é reconhecido, validando nossa abordagem inovadora e nos colocando no mapa das agências criativas.',
  },
  {
    year: '2022',
    title: 'Expansão IA',
    description: 'Integramos Inteligência Artificial em nossos serviços, automatizando processos e gerando insights preditivos para nossos clientes.',
  },
  {
    year: 'Hoje',
    title: 'Arquitetos do Futuro',
    description: 'Consolidados como uma agência de vanguarda, continuamos a explorar novas fronteiras, do WebGL a experiências imersivas.',
  },
];