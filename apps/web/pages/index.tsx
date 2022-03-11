import Head from 'next/head'
import config from '../config';

import styles from '../styles/Home.module.css';
import Hero from '../src/components/landing/Hero';
import Footer from '../src/components/Footer';

export default function Home() {
  return (
    <div className={styles.container} style={{ backgroundColor: config.PALETTE.BACKGROUND_SECONDARY }}>
      <Head>
        <title>{config.PAGE_TITLE}</title>
      </Head>
      <Hero />
    </div>
  )
}
