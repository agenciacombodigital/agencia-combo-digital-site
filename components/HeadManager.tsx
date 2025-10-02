import React, { useEffect } from 'react';
import { Page, PortfolioItem } from '../types';
import { PORTFOLIO_ITEMS } from '../constants';

interface HeadManagerProps {
  currentPage: Page;
  selectedPortfolioItem: PortfolioItem | null;
}

const HeadManager: React.FC<HeadManagerProps> = ({ currentPage, selectedPortfolioItem }) => {
  useEffect(() => {
    const updateHead = () => {
      let title = "Combo Digital";
      let description = "Agência criativa de Combo Digital — experiências digitais exclusivas com criatividade audaciosa e tecnologia de ponta.";
      let ogImage = "https://combo.digital/web-app-manifest-512x512.png"; // Use a PNG for better compatibility
      let ogUrl = "https://combo.digital/";
      let jsonLd: any[] = [];

      // Organization JSON-LD (global)
      jsonLd.push({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Combo Digital",
        "url": "https://combo.digital/",
        "logo": "https://combo.digital/Logo-ComboDigitalV2.svg",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+55-11-99999-8888",
          "contactType": "customer service",
          "email": "hello@combo.digital"
        },
        "sameAs": [
          "https://twitter.com/combo_digital", // Placeholder, update with real links
          "https://www.instagram.com/agenciacombodigital/",
          "https://linkedin.com/company/combo-digital" // Placeholder, update with real links
        ]
      });

      // BreadcrumbList JSON-LD (dynamic based on current page)
      const breadcrumbItems = [{ "@type": "ListItem", "position": 1, "name": "Início", "item": "https://combo.digital/" }];
      if (currentPage !== Page.Home) {
        breadcrumbItems.push({ "@type": "ListItem", "position": 2, "name": currentPage, "item": `https://combo.digital/${currentPage.toLowerCase().replace(/\s/g, '-')}` });
      }
      if (selectedPortfolioItem && currentPage === Page.Portfolio) {
        breadcrumbItems.push({ "@type": "ListItem", "position": 3, "name": selectedPortfolioItem.title, "item": `https://combo.digital/portfolio/${selectedPortfolioItem.title.toLowerCase().replace(/\s/g, '-')}` });
      }
      jsonLd.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbItems
      });


      switch (currentPage) {
        case Page.Home:
          title = "Nós não seguimos, nós criamos — Combo Digital";
          description = "Agência criativa de Combo Digital — experiências digitais exclusivas com criatividade audaciosa e tecnologia de ponta. Explore nosso trabalho.";
          ogUrl = "https://combo.digital/";
          break;
        case Page.About:
          title = "Quem Somos — Os Arquitetos do Futuro | Combo Digital";
          description = "Conheça a filosofia, valores e jornada da Combo Digital — fusão de criatividade e tecnologia desde 2018.";
          ogUrl = "https://combo.digital/quem-somos";
          break;
        case Page.Portfolio:
          if (selectedPortfolioItem) {
            title = `${selectedPortfolioItem.title} | Portfólio Imersivo | Combo Digital`;
            description = selectedPortfolioItem.description;
            ogImage = `https://combo.digital${selectedPortfolioItem.imageUrl}`; // Ensure full URL
            ogUrl = `https://combo.digital/portfolio/${selectedPortfolioItem.title.toLowerCase().replace(/\s/g, '-')}`;
            
            // CaseStudy/CreativeWork JSON-LD for selected portfolio item
            jsonLd.push({
              "@context": "https://schema.org",
              "@type": "CreativeWork", // Or CaseStudy if more specific schema is available
              "name": selectedPortfolioItem.title,
              "description": selectedPortfolioItem.description,
              "image": ogImage,
              "url": ogUrl,
              "keywords": selectedPortfolioItem.technologies.join(', ') + ', ' + selectedPortfolioItem.category,
              "creator": {
                "@type": "Organization",
                "name": "Combo Digital"
              }
            });

          } else {
            title = "Portfólio Imersivo | Combo Digital";
            description = "Projetos que respiram tecnologia e arte — portfólio com cases como Projeto Alfa, Campos Elíseos e Salto Quântico.";
            ogUrl = "https://combo.digital/portfolio";
          }
          break;
        case Page.Contact:
          title = "Contato — Vamos Criar o Impossível | Combo Digital";
          description = "Entre em contato com a Combo Digital. Sua próxima grande ideia começa com uma conversa.";
          ogUrl = "https://combo.digital/contato";
          break;
      }

      document.title = title;

      // Update or create meta tags
      const updateMeta = (name: string, content: string, property?: string) => {
        let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
        if (!element && property) {
          element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
        }
        if (!element) {
          element = document.createElement('meta');
          if (name) element.setAttribute('name', name);
          if (property) element.setAttribute('property', property);
          document.head.appendChild(element);
        }
        element.setAttribute('content', content);
      };

      updateMeta('description', description);
      updateMeta('', title, 'og:title');
      updateMeta('', description, 'og:description');
      updateMeta('', ogImage, 'og:image');
      updateMeta('', ogUrl, 'og:url');
      updateMeta('', 'website', 'og:type');
      updateMeta('', 'Combo Digital', 'og:site_name');
      updateMeta('twitter:card', 'summary_large_image');
      updateMeta('twitter:title', title);
      updateMeta('twitter:description', description);
      updateMeta('twitter:image', ogImage);
      
      // Remove existing JSON-LD scripts
      document.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove());

      // Add new JSON-LD scripts
      jsonLd.forEach(data => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
      });
    };

    updateHead();
  }, [currentPage, selectedPortfolioItem]);

  return null; // This component doesn't render anything visible
};

export default HeadManager;