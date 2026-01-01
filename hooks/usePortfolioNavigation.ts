import { useRouter } from 'next/router';
import { PortfolioItem, Page } from '../src/types';
import { PAGES } from '../src/constants';

export const usePortfolioNavigation = () => {
  const router = useRouter();

  const showPortfolioItem = (item: PortfolioItem) => {
    router.push({
      pathname: '/portfolio',
      query: { itemId: item.id },
    });
  };

  const navigateToPage = (page: Page) => {
    const navLink = PAGES.find(p => p.name === page);
    const path = navLink ? navLink.path : '/';
    router.push(path);
  };

  return { showPortfolioItem, navigateToPage };
};