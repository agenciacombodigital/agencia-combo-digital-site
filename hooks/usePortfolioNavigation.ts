import { useRouter } from 'next/router';
import { PortfolioItem, Page } from '../types';
import { PORTFOLIO_ITEMS } from '../constants';

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
    // Helper to map Page enum to path defined in constants (e.g., 'Início' -> '/')
    const path = PORTFOLIO_ITEMS.find(p => p.name === page)?.path || `/${page.toLowerCase().replace(/\s/g, '-')}`;
    router.push(path);
  };

  return { showPortfolioItem, navigateToPage };
};