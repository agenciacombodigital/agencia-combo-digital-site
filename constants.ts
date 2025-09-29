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
  { name: Page.Auth, path: '/auth' }, // Nova página de autenticação
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 1,
    title: 'Projeto Alfa',
    category: 'Web',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
    description: 'Um rebranding completo e um novo site para uma startup de tecnologia, com foco em uma estética futurista e limpa que impulsionou a aquisição de usuários.',
    featured: true,
    metric: '+300% conversões',
    technologies: ['React', 'WebGL', 'GSAP', 'Figma'],
    colorPalette: ['#00a1ff', '#0d1117', '#ffffff', '#30363d']
  },
  {
    id: 2,
    title: 'Salto Quântico',
    category: 'Motion',
    imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
    description: 'Uma campanha imersiva de mídia social que utilizou motion graphics e storytelling para gerar milhões de impressões e engajamento viral.',
    technologies: ['After Effects', 'Cinema 4D', 'Lottie'],
    colorPalette: ['#fb5626', '#fcc017', '#000000', '#ffffff']
  },
  {
    id: 3,
    title: 'Campos Elíseos',
    category: 'Branding',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
    description: 'Um evento pop-up que mesclou realidades físicas e digitais para uma marca de luxo, criando uma experiência de marca inesquecível e exclusiva.',
    featured: true,
    metric: '+450% vendas online',
    technologies: ['Identidade Visual', 'TouchDesigner', 'Marketing de Experiência'],
    colorPalette: ['#fcc017', '#1a1a1a', '#ffffff', '#e0e0e0']
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
        quote: "A parceria com a Combo no projeto Campos Elíseos foi um divisor de águas. A fusão de realidades físicas e digitais resultou em um aumento de 450% nas vendas online. Eles não seguem tendências, eles as criam.",
        author: "Ana Souza",
        title: "Diretora de Marketing - Elysian Fields Lux",
        imageUrl: "https://picsum.photos/seed/ana/100/100"
    },
    {
        quote: "O rebranding do Projeto Alfa foi executado com maestria. A nova identidade visual e o web design futurista foram cruciais para o aumento de 300% em nossas conversões. Uma agência que realmente entende de tecnologia e estética.",
        author: "Carlos Pereira",
        title: "CEO - Alpha Startup",
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