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
  imageUrl: string; // Capa do projeto
  galleryImages: string[]; // Imagens adicionais para o slider
  description: string;
  featured?: boolean;
  metric?: string;
  technologies: string[];
  colorPalette: string[];
}