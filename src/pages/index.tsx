import type { NextPage } from 'next'
import React, { useEffect } from 'react';
import styles from '../utils/styles/main/Home.module.scss'
import socials from '../utils/socials';
import * as icon from 'react-icons/fa'
import Head from 'next/head'

export default function Main() {

  //Snowflakes
  // useEffect(() => {
  //   console.log('Snowflakes are activated!')
  //   setInterval(createFlake, 155)
  //   window.addEventListener("resize", removeParticles)

  //   function createFlake() {
  //     const snowflake = document.createElement("i");
  //     snowflake.classList.add('fas')
  //     snowflake.classList.add('fa-snowflake')

  //     let duration = Math.random() * 10 + 2 + 's';

  //     snowflake.style.left = Math.random() * window.outerWidth + 'px';
  //     snowflake.style.animationDuration = duration;
  //     snowflake.style.opacity = Math.random().toString();
  //     snowflake.style.fontSize = (Math.random() * 4) + 7 + 'px';

  //     document.body.appendChild(snowflake)

  //     let toms = duration.substr(0, duration.length - 1)
  //     let splitted = toms.split('.')
  //     let lastms = `${splitted[0]}${splitted[1].substr(0, 1)}00`

  //     setTimeout(() => {
  //       snowflake.remove()
  //     }, parseInt(lastms))
  //   }

  //   function removeParticles() {
  //     console.log("Cleared all particles because window is resized to another size!")
  //     let particles = document.querySelectorAll("i")

  //     particles.forEach(x => {
  //       if (x.classList.contains("fa-snowflake")) {
  //         x.remove()
  //         clearTimeout()
  //       } else return;
  //     })
  //   }
  // })

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
      <div>
        <h2 id="more" className={styles.more}>Other stuffs</h2>

        <div className={styles.more}>
          ksurua bakma krdşm burayı yapmaya üşendim az sabır
        </div>
      </div>

      <div className={styles.made_text}>
        <p>Made with ❤️ by Melih</p>
      </div>
    </div>
  );
}