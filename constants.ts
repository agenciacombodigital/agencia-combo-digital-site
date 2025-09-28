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
    title: 'Projeto Alfa',
    category: 'Branding & Web Design',
    imageUrl: 'https://picsum.photos/seed/alpha/800/600',
    description: 'Um rebranding completo para uma startup de tecnologia, com foco em uma estética futurista e limpa.',
    featured: true,
    metric: '+300% conversões'
  },
  {
    id: 2,
    title: 'Salto Quântico',
    category: 'Campanha Digital',
    imageUrl: 'https://picsum.photos/seed/quantum/800/600',
    description: 'Uma campanha imersiva de mídia social que gerou milhões de impressões.'
  },
  {
    id: 3,
    title: 'Campos Elíseos',
    category: 'Marketing de Experiência',
    imageUrl: 'https://picsum.photos/seed/elysian/800/600',
    description: 'Um evento pop-up que mesclou realidades físicas e digitais para uma marca de luxo.',
    featured: true,
    metric: '+450% vendas online'
  },
  {
    id: 4,
    title: 'Viajante Estelar',
    category: 'UI/UX de App Mobile',
    imageUrl: 'https://picsum.photos/seed/stellar/800/600',
    description: 'Projetando uma interface intuitiva e deslumbrante para um aplicativo de viagens.'
  },
    {
    id: 5,
    title: 'Sonhos Cibernéticos',
    category: '3D & Motion Graphics',
    imageUrl: 'https://picsum.photos/seed/cyber/800/600',
    description: 'Criação de assets visuais e animações impressionantes para o trailer de um videogame.',
    featured: true,
    metric: '1M+ downloads'
  },
  {
    id: 6,
    title: 'Iniciativa Oráculo',
    category: 'Plataforma com IA',
    imageUrl: 'https://picsum.photos/seed/oracle/800/600',
    description: 'Desenvolvimento de um motor de recomendação de conteúdo inteligente para um gigante da mídia.'
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