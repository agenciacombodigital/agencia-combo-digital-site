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
  { name: Page.About, path: '/quem-somos' },
  { name: Page.Portfolio, path: '/portfolio' },
  { name: Page.Contact, path: '/contato' },
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
    description: "Campanha publicitária para a nova doceria Méris Confeitaria, unindo delicadeza e sofisticação em rosa e marrom.",
    featured: true,
    metric: 'Arte que Seduz',
    technologies: ['Branding', 'Identidade Visual', 'Embalagem', 'Direção de Arte'],
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
    description: "Campanha publicitária para o Salgueiro Atlético Clube no lançamento da nova camisa oficial.",
    featured: true,
    metric: 'Orgulho Sertanejo',
    technologies: ['Branding', 'Campanha Publicitária', 'Social Media'],
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
    description: "Campanha publicitária com linguagem popular e criativa para a Pizza Hut.",
    featured: true,
    metric: '+2M impressões',
    technologies: ['After Effects', 'Social Media', 'Motion Graphics'],
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
    description: "Campanha criativa inspirada na força cultural do rap nacional.",
    featured: true,
    metric: '+500K seguidores',
    technologies: ['Identidade Visual', 'Social Media', 'Figma'],
    colorPalette: ['#000000', '#ffcc00', '#ffffff', '#cccccc']
  }
];

export const TESTIMONIALS = [
    {
        quote: "A Combo não entregou apenas marketing, entregou clareza estratégica.",
        author: "Wagner Marcelo",
        title: "CEO - Black Contábil",
        imageUrl: "https://picsum.photos/seed/wagner-marcelo/100/100"
    }
];

export const TIMELINE_EVENTS = [
  {
    year: '2018',
    title: 'O Início',
    description: 'A Combo Digital nasce de uma visão: fundir criatividade audaciosa com tecnologia de ponta.',
  }
];