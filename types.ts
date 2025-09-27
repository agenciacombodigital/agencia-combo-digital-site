export enum Page {
  Home = 'Início',
  About = 'Quem Somos',
  Portfolio = 'Portfólio',
  Contact = 'Contato',
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
}
