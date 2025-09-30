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
  { name: Page.About, path: '/about' },
  { name: Page.Portfolio, path: '/portfolio' },
  { name: Page.Contact, path: '/contact' },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 1,
    title: 'Chronus Sports',
    category: 'Web',
    imageUrl: '/images/portfolio/Chronus Sports/Capa-Chronus-Sports.png',
    description: "Desenvolvimento de um website e plataforma de e-commerce para a marca de artigos esportivos Chronus, com foco em performance e experiência do usuário.",
    featured: true,
    metric: '+150% vendas online',
    technologies: ['React', 'Vtex', 'Figma', 'Node.js'],
    colorPalette: ['#00a1ff', '#0d1117', '#ffffff', '#fb5626']
  },
  {
    id: 2,
    title: 'Dá um hut no Hexa',
    category: 'Motion',
    imageUrl: '/images/portfolio/Dá um hut no Hexa/capa-projeto-Dá-um-hut-no-Hexa.webp',
    description: "Campanha de marketing digital para a Pizza Hut durante a Copa do Mundo, utilizando motion graphics e conteúdo interativo para engajar torcedores.",
    featured: true,
    metric: '+2M impressões',
    technologies: ['After Effects', 'Social Media', 'Marketing de Conteúdo'],
    colorPalette: ['#d92d2d', '#ffffff', '#000000', '#f2a700']
  },
  {
    id: 3,
    title: 'Testemunhas de Djonga',
    category: 'Branding',
    imageUrl: '/images/portfolio/Testemunhas de Djonga/capa-projeto-Testeminhas-de-Djonga-webp.webp',
    description: "Uma identidade visual e campanha de lançamento para o fã-clube oficial do artista Djonga, criando uma comunidade engajada e apaixonada.",
    featured: true,
    metric: '+500K seguidores',
    technologies: ['Identidade Visual', 'Social Media', 'Figma'],
    colorPalette: ['#000000', '#ffcc00', '#ffffff', '#cccccc']
  },
  {
    id: 4,
    title: 'Viajante Estelar',
    category: 'Web',
    imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
    description: 'Projetando uma interface intuitiva e deslumbrante para um aplicativo de viagens, focada em microinterações e uma experiência de usuário fluida.',
    technologies: ['React Native', 'Figma', 'Lottie', 'GraphQL'],
    colorPalette: ['#00a1ff', '#161b22', '#ffffff', '#a0a0a0']
  },
    {
    id: 5,
    title: 'Sonhos Cibernéticos',
    category: 'Motion',
    imageUrl: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
    description: 'Criação de assets visuais e animações 3D impressionantes para o trailer de um videogame, definindo a estética visual do projeto.',
    featured: true,
    metric: '1M+ downloads',
    technologies: ['Unreal Engine', 'Blender', 'Houdini', 'DaVinci Resolve'],
    colorPalette: ['#fb5626', '#00a1ff', '#050505', '#fcc017']
  },
  {
    id: 6,
    title: 'Iniciativa Oráculo',
    category: 'Web',
    imageUrl: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
    description: 'Desenvolvimento de um motor de recomendação de conteúdo inteligente com IA para um gigante da mídia, personalizando a experiência para milhões de usuários.',
    technologies: ['Python', 'TensorFlow', 'React', 'AWS'],
    colorPalette: ['#00a1ff', '#0d1117', '#84CC16', '#ffffff']
  }
];

export const TESTIMONIALS = [
    {
        quote: "A parceria com a Combo no projeto 'Testemunhas de Djonga' foi um divisor de águas. A identidade visual e a campanha de lançamento resultaram em uma comunidade com mais de 500 mil seguidores. Eles não seguem tendências, eles as criam.",
        author: "Ana Souza",
        title: "Diretora de Marketing - Djonga Corp",
        imageUrl: "https://picsum.photos/seed/ana/100/100"
    },
    {
        quote: "A campanha 'Dá um hut no Hexa' para a Pizza Hut foi executada com maestria. O conteúdo interativo e os motion graphics foram cruciais para alcançarmos mais de 2 milhões de impressões. Uma agência que realmente entende de engajamento.",
        author: "Carlos Pereira",
        title: "CMO - Pizza Hut Brasil",
        imageUrl: "https://picsum.photos/seed/carlos/100/100"
    },
    {
        quote: "A equipe da Combo é o motor criativo que toda marca precisa. Eles transformaram nossa visão em uma realidade digital impactante, superando todas as metas.",
        author: "Juliana V.",
        title: "Chefe de Inovação - Quantum Dynamics",
        imageUrl: "https://picsum.photos/seed/juliana/100/100"
    },
    {
        quote: "Trabalhar com a Combo Digital elevou nosso jogo. A abordagem deles para UI/UX no nosso aplicativo móvel foi revolucionária, resultando em um engajamento recorde.",
        author: "Marcos Andrade",
        title: "CTO - Viajante Estelar App",
        imageUrl: "https://picsum.photos/seed/marcos/100/100"
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