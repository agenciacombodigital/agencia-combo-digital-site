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
    imageUrl: '/images/portfolio/Salgueiro - Nova Camisa Salgueiro/capa.webp',
    galleryImages: [
      '/images/portfolio/Salgueiro - Nova Camisa Salgueiro/detalhe-1.webp',
      '/images/portfolio/Salgueiro - Nova Camisa Salgueiro/detalhe-2.webp',
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
    imageUrl: '/images/portfolio/Dá um hut no Hexa/capa-projeto-Dá-um-hut-no-Hexa.webp',
    galleryImages: [
      '/images/portfolio/Dá um hut no Hexa/imagem-detalhe-1.webp',
      '/images/portfolio/Dá um hut no Hexa/imagem-detalhe-2.webp',
      '/images/portfolio/Dá um hut no Hexa/imagem-detalhe-3.webp',
      '/images/portfolio/Dá um hut no Hexa/imagem-detalhe-4.webp',
      '/images/portfolio/Dá um hut no Hexa/imagem-detalhe-5.webp',
      '/images/portfolio/Dá um hut no Hexa/imagem-detalhe-6.webp',
      '/images/portfolio/Dá um hut no Hexa/imagem-detalhe-7.webp',
      '/images/portfolio/Dá um hut no Hexa/imagem-detalhe-8.webp',
      '/images/portfolio/Dá um hut no Hexa/imagem-detalhe-9.webp',
      '/images/portfolio/Dá um hut no Hexa/imagem-detalhe-10.webp',
      '/images/portfolio/Dá um hut no Hexa/imagem-detalhe-11.webp',
      '/images/portfolio/Dá um hut no Hexa/imagem-detalhe-12.webp',
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
    imageUrl: '/images/portfolio/Campanha Yasaí/capa.webp',
    galleryImages: [
      '/images/portfolio/Campanha Yasaí/detalhe-1.webp',
      '/images/portfolio/Campanha Yasaí/detalhe-2.webp',
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
    imageUrl: '/images/portfolio/Testemunhas de Djonga/capa-projeto-Testeminhas-de-Djonga-webp.webp',
    galleryImages: [
      '/images/portfolio/Testemunhas de Djonga/imagem-detalhe-1.webp',
      '/images/portfolio/Testemunhas de Djonga/imagem-detalhe-2.webp',
      '/images/portfolio/Testemunhas de Djonga/imagem-detalhe-3.webp',
      '/images/portfolio/Testemunhas de Djonga/imagem-detalhe-4.webp',
      '/images/portfolio/Testemunhas de Djonga/imagem-detalhe-5.webp',
      '/images/portfolio/Testemunhas de Djonga/imagem-detalhe-6.webp',
      '/images/portfolio/Testemunhas de Djonga/imagem-detalhe-7.webp',
      '/images/portfolio/Testemunhas de Djonga/imagem-detalhe-8.webp',
      '/images/portfolio/Testemunhas de Djonga/imagem-detalhe-9.webp',
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
    imageUrl: '/images/portfolio/Nuria Uliana/capa.webp',
    galleryImages: [
      '/images/portfolio/Nuria Uliana/detalhe-1.webp',
    ],
    description: "Criação do site oficial da produtora Nuria Uliana, com design elegante e funcional, destacando seu portfólio audiovisual e transmitindo sua identidade criativa de forma moderna e impactante.",
    technologies: ['React', 'GSAP', 'Figma', 'Headless CMS'],
    colorPalette: ['#1a1a1a', '#ffffff', '#fb5626', '#a0a0a0']
  },
  {
    id: 6,
    title: 'Conectando França e Brasil',
    category: 'Web',
    imageUrl: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2070&auto=format&fit=crop',
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