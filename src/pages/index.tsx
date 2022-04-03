import React, { useEffect } from 'react';
import styles from '../utils/styles/main/Home.module.scss';
import socials from '../utils/socials';
import * as icon from 'react-icons/fa';
import { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { DiscordPanel } from '../components/main/DiscordPanel';
import { getDiscordProfile } from '../utils/api';
import { Props } from '../utils/types';

const Main: NextPage<Props> = ({ info }) => {
  return (
    <div className={styles.main}>
      <Head>
        <title>lechixy | backstabber!</title>
      </Head>
      <div id="social" className={styles.social_links}>
        <a id="app" className={styles.app} href={socials.instagram}>
          <icon.FaInstagram className={styles.app_instagram} size={55} />
        </a>
        <a id="app" className={styles.app} href={socials.snapchat}>
          <icon.FaSnapchat className={styles.app_snapchat} size={55} />
        </a>
        <a id="app" className={styles.app} href={socials.twitch}>
          <icon.FaTwitch className={styles.app_twitch} size={55} />
        </a>
        <a id="app" className={styles.app} href={socials.steam}>
          <icon.FaSteam className={styles.app_steam} size={55} />
        </a>
        <a id="app" className={styles.app} href={socials.spotify}>
          <icon.FaSpotify className={styles.app_spotify} size={55} />
        </a>
        <a id="app" className={styles.app} href={socials.github}>
          <icon.FaGithub className={styles.app_github} size={55} />
        </a>
        <a id="app" className={styles.app} href={socials.discord}>
          <icon.FaDiscord className={styles.app_discord} size={55} />
        </a>
      </div>
      <div className={styles.discord} id="discord">
        <DiscordPanel info={info} />
      </div>
      <div className={styles.more}>
        <h2 id="more" className={styles.more_header}>Other stuffs</h2>
        <div>
          <p className={styles.more_text}>
            time flies by... they all sang along
          </p>
        </div>
      </div>

      <div className={styles.made_text}>
        <p>Made with ❤️ by Melih</p>
      </div>
    </div>
  );
}

export default Main;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return getDiscordProfile(context);
}