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
    <div className={styles.container} style={{ backgroundColor: config.PALETTE.BACKGROUND_SECONDARY }}>
      <Head>
        <title>{config.PAGE_TITLE}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      {/* <PrimaryValue />
      <Feature1/>
      <Feature2/>
      <Feature3/>
      <Pricing /> 
      <PreFooterCTA />
      <Footer/> */}
    </div>
  )
}
