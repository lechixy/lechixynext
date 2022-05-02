import React, { useEffect, useState } from 'react';
import styles from '../utils/styles/main/Home.module.scss';
import socials from '../utils/socials';
import * as icon from 'react-icons/fa';
import { NextPage } from 'next';
import Head from 'next/head';
import { DiscordPanel } from '../components/main/DiscordPanel';
import { Props } from '../utils/types';
import { WebSocketContext } from '../utils/context';
import { websocketlog } from '../utils/log';

const Main: NextPage = () => {

  const [data, setData] = useState(null)

  useEffect(() => {
    connectToWebSocket();
  }, [])

  const connectToWebSocket = () => {
    websocketlog('Trying to connect websocket...')
    let ws = new WebSocket('wss://api.lanyard.rest/socket')
    let number = 1
    let intervalObject: NodeJS.Timer

    ws.addEventListener('open', () => {
      websocketlog('Connected to websocket!')
    })
    ws.addEventListener('message', (message) => {
      let jsConvert = JSON.parse(message.data)
      if (jsConvert.op === 1) {
        let op1 = {
          op: 2,
          d: {
            subscribe_to_id: "391511241786654721"
          }
        }
        let interval = jsConvert.d.heartbeat_interval - 1000
        ws.send(JSON.stringify(op1))
        intervalObject = setInterval(() => {
          websocketlog('Sending heartbeat interval...')
          let op3 = {
            op: 3
          }
          ws.send(JSON.stringify(op3))
        }, interval)
      }
      if (jsConvert.op === 0) {
        websocketlog(`${number++}. data received from discord, updating... `)
        let discordData = jsConvert.d
        setData(discordData)
      }
    })

    ws.addEventListener('close', (error) => {
      clearInterval(intervalObject)
      ws.close();
      websocketlog(`An error occurred while websocket connection: ${error}`)
      websocketlog('Trying to reconnect to websocket!')
      connectToWebSocket();
    })
  }

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
        {data ? (
          <WebSocketContext.Provider value={data}>
            <DiscordPanel />
          </WebSocketContext.Provider>
        ) : (
          <div className={styles.discord_loading}>
            <div className={styles.discord_loading_spinner} />
            <p className={styles.discord_loading_text}>Loading</p>
          </div>
        )
        }
      </div>
      <div className={styles.more}>
        <h2 id="more" className={styles.more_header}>Other stuffs</h2>
        <div className={styles.more_text}>
          <p>{`i can't have it all together`}</p>
        </div>
      </div>

      <div className={styles.made_text}>
        <p>{`Made with ❤️ by Melih`}</p>
      </div>
    </div>
  );
}

export default Main;