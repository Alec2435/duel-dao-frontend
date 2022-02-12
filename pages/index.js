import Head from 'next/head'
import config from '../config';

import styles from '../styles/Home.module.css';
import Hero from '../src/components/landing/Hero';
import PrimaryValue from '../src/components/landing/PrimaryValue';
import Feature1 from '../src/components/landing/Feature1';
import Feature2 from '../src/components/landing/Feature2';
import Feature3 from '../src/components/landing/Feature3';
import Pricing from '../src/components/landing/Pricing';
import PreFooterCTA from '../src/components/landing/PreFooterCTA';
import Footer from '../src/components/Footer';

export default function Home() {
  return (
    <div className={styles.container} style={{backgroundColor: config.PALETTE.BACKGROUND_SECONDARY}}>
      <Head>
        <title>{config.PAGE_TITLE}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      {/* Comes with access to our twitter-card generator and open graph generator
      Comes with access to our setup tool which will get you set up with Stripe, Slack, Github, vercel, and firebase
      Fully responsive starter landing page */}
      <PrimaryValue />
      <Feature1/>
      <Feature2/>
      <Feature3/>
      <Pricing />
      {/* "Our scraper handles everything" Crawler that runs on google chrome which sets up all of your environment variables for you Stripe, Github, vercel, and firebase */}
      {/* Fully responsive landing page template */}
      {/* Your environment variables get written to a .env file on your local machine for testing, and your live site is automatically populated with the production keys */}
      {/* Twitter graph snapshots on every deployment */}
      <PreFooterCTA />
      <Footer/>
    </div>
  )
}
