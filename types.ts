export enum Page {
  Home = 'Início',
  About = 'Quem Somos',
  Portfolio = 'Portfólio',
  Contact = 'Contato',
  Auth = 'Autenticação', // Nova página para autenticação
}

export interface NavLink {
  name: Page;
  path: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  featured?: boolean;
  metric?: string;
  technologies: string[];
  colorPalette: string[];
}