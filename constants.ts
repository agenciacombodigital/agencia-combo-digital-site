
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
