import React from 'react';
import Head from 'next/head';
import InteractiveTimeline from '@/components/InteractiveTimeline';

const About: React.FC = () => {
  return (
    <div className="min-h-screen about-page-container">
      <Head><title>Quem Somos — Combo Digital</title></Head>
      <section className="about-hero">
        <h1 className="fluid-title combo-gradient-text">Combo Digital</h1>
      </section>
      <InteractiveTimeline />
    </div>
  );
};

export default About;