import { useRouter } from 'next/router';
import { PortfolioItem, Page } from '../types';
import { PAGES } from '../constants'; // Importando PAGES

export const usePortfolioNavigation = () => {
  const router = useRouter();

  const showPortfolioItem = (item: PortfolioItem) => {
    // Navigate to /portfolio and pass the item ID as a query parameter
    router.push({
      pathname: '/portfolio',
      query: { itemId: item.id },
    });
  };

  const navigateToPage = (page: Page) => {
    // Busca o caminho correto na constante PAGES
    const navLink = PAGES.find(p => p.name === page);
    const path = navLink ? navLink.path : '/'; // Fallback para '/'
    router.push(path);
  };

  return { showPortfolioItem, navigateToPage };
};