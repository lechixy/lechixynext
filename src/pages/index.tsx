import React, { useEffect, useState } from 'react';
import styles from '../utils/styles/main/Home.module.scss';
import socials from '../utils/socials';
import { FaDiscord, FaGithub, FaInstagram, FaSpotify, FaStar, FaSteam, FaTwitch } from 'react-icons/fa';
import { NextPage } from 'next';
import Head from 'next/head';
import { DiscordPanel } from '../components/main/DiscordPanel';
import { Props } from '../utils/types';
import { WebSocketContext } from '../utils/context';
import { websocketlog } from '../utils/log';

const Main: NextPage = () => {

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

  const [data, setData] = useState(null)

  useEffect(() => {
    connectToWebSocket();
  }, [])

  return (
    <div className={styles.main}>
      <Head>
        <title>lechixy | sweetest pie!</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.stuff}>
          <div>
            <div className={styles.stuff_header}>
              Stuffs
            </div>
            <div className={styles.stuff_item}>
              {
                socials.map(social => {
                  return (
                    <a href={social.url} className={`${styles.app} ${styles[`app_${social.name.toLowerCase()}`]}`} key={social.name}>
                      {
                        social.name === 'Instagram' && (
                          <FaInstagram className={styles.app_icon} />
                        )
                      }
                      {
                        social.name === 'Twitch' && (
                          <FaTwitch className={styles.app_icon} />
                        )
                      }
                      {
                        social.name === 'Steam' && (
                          <FaSteam className={styles.app_icon} />
                        )
                      }
                      {
                        social.name === 'Spotify' && (
                          <FaSpotify className={styles.app_icon} />
                        )
                      }
                      {
                        social.name === 'Github' && (
                          <FaGithub className={styles.app_icon} />
                        )
                      }
                      {
                        social.name === 'lechsbott' && (
                          <FaStar className={styles.app_icon} />
                        )
                      }
                      {social.name}
                    </a>
                  )
                })
              }
            </div>
          </div>
          <div className={styles.made_text}>
            <p>{`hay aksi sona ulaştın | melih 💖`}</p>
          </div>
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
      </div>
    </div>
  );
}

export default Main;