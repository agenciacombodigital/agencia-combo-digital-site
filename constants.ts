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
    title: 'Salgueiro, Nossa Terra, Nossa Pele',
    category: 'Branding',
    imageUrl: '/images/portfolio/salgueiro/capa.jpeg',
    galleryImages: [
      '/images/portfolio/salgueiro/detalhe-1.jpeg',
      '/images/portfolio/salgueiro/detalhe-2.jpeg',
      '/images/portfolio/salgueiro/detalhe-3.jpeg',
      '/images/portfolio/salgueiro/detalhe-4.jpeg',
      '/images/portfolio/salgueiro/detalhe-5.jpeg',
      '/images/portfolio/salgueiro/detalhe-6.jpeg',
      '/images/portfolio/salgueiro/detalhe-7.jpeg',
      '/images/portfolio/salgueiro/detalhe-8.png',
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
    imageUrl: '/images/portfolio/pizzahut/capa.webp.webp',
    galleryImages: [
      '/images/portfolio/pizzahut/detalhe-1.webp.webp',
      '/images/portfolio/pizzahut/detalhe-2.webp.webp',
      '/images/portfolio/pizzahut/detalhe-3.webp.webp',
      '/images/portfolio/pizzahut/detalhe-4.webp.webp',
      '/images/portfolio/pizzahut/detalhe-5.webp.webp',
      '/images/portfolio/pizzahut/detalhe-6.webp.webp',
      '/images/portfolio/pizzahut/detalhe-7.webp.webp',
      '/images/portfolio/pizzahut/detalhe-8.webp.webp',
      '/images/portfolio/pizzahut/detalhe-9.webp.webp',
      '/images/portfolio/pizzahut/detalhe-10.webp.webp',
      '/images/portfolio/pizzahut/detalhe-11.webp.webp',
      '/images/portfolio/pizzahut/detalhe-12.webp.webp',
    ],
    description: "Campanha publicitária com linguagem popular e criativa, trazendo humor e irreverência para engajar torcedores na expectativa pelo título, unindo futebol, cultura brasileira e espírito de celebração.",
    featured: true,
    metric: '+2M impressões',
    technologies: ['After Effects', 'Social Media', 'Marketing de Conteúdo', 'Motion Graphics'],
    colorPalette: ['#d92d2d', '#ffffff', '#000000', '#f2a700']
  },
  {
    id: 3,
    title: 'Açaí que vem da Amazônia',
    category: 'Branding',
    imageUrl: '/images/portfolio/acai-yasai/capa.png',
    galleryImages: [
      '/images/portfolio/acai-yasai/detalhe-1.png',
      '/images/portfolio/acai-yasai/detalhe-2.png',
      '/images/portfolio/acai-yasai/detalhe-3.png',
      '/images/portfolio/acai-yasai/detalhe-4.png',
      '/images/portfolio/acai-yasai/detalhe-5.png',
      '/images/portfolio/acai-yasai/detalhe-6.png',
      '/images/portfolio/acai-yasai/detalhe-7.png',
      '/images/portfolio/acai-yasai/detalhe-8.png',
    ],
    description: "Campanha publicitária para a Yasaí, destacando a origem amazônica do produto em peças visuais impactantes, unindo natureza, cultura e energia em cada pote de açaí.",
    featured: true,
    metric: 'Origem Destacada',
    technologies: ['Branding', 'Embalagem', 'Fotografia', 'Social Media'],
    colorPalette: ['#4a2c6a', '#f5d13e', '#ffffff', '#8bc34a']
  },
  {
    id: 4,
    title: 'Testemunhas de Djonga',
    category: 'Branding',
    imageUrl: '/images/portfolio/djonga/capa.webp.webp',
    galleryImages: [
      '/images/portfolio/djonga/detalhe-1.webp.webp',
      '/images/portfolio/djonga/detalhe-2.webp.webp',
      '/images/portfolio/djonga/detalhe-3.webp.webp',
      '/images/portfolio/djonga/detalhe-4.webp.webp',
      '/images/portfolio/djonga/detalhe-5.webp.webp',
      '/images/portfolio/djonga/detalhe-6.webp.webp',
      '/images/portfolio/djonga/detalhe-7.webp.webp',
      '/images/portfolio/djonga/detalhe-8.webp.webp',
      '/images/portfolio/djonga/detalhe-9.webp.webp',
      '/images/portfolio/djonga/detalhe-10.webp.webp',
    ],
    description: "Campanha criativa inspirada na força cultural do rap nacional, destacando a identidade, a resistência e a voz das ruas em peças visuais impactantes para engajar fãs e comunidades.",
    metric: '+500K seguidores',
    technologies: ['Identidade Visual', 'Social Media', 'Figma', 'Comunidade'],
    colorPalette: ['#000000', '#ffcc00', '#ffffff', '#cccccc']
  },
  {
    id: 5,
    title: 'Website Nuria Uliana',
    category: 'Web',
    imageUrl: '/images/portfolio/nuria-uliana/capa.png',
    galleryImages: [],
    description: "Criação do site oficial da produtora Nuria Uliana, com design elegante e funcional, destacando seu portfólio audiovisual e transmitindo sua identidade criativa de forma moderna e impactante.",
    technologies: ['React', 'GSAP', 'Figma', 'Headless CMS'],
    colorPalette: ['#1a1a1a', '#ffffff', '#fb5626', '#a0a0a0']
  },
  {
    id: 6,
    title: 'Conectando França e Brasil',
    category: 'Web',
    imageUrl: '/images/portfolio/moohtech/capa.png',
    galleryImages: [],
    description: "Campanha publicitária para a Mooh Tech, unindo inovação tecnológica e impacto social em peças visuais que mostram como a empresa conecta pessoas e soluções entre Brasil e França.",
    technologies: ['Marketing Digital', 'Landing Page', 'SEO', 'Google Ads'],
    colorPalette: ['#0055a4', '#ffffff', '#ef4135', '#00a1ff']
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