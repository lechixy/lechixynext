/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import styles from "../utils/styles/main/Home.module.scss";
import socials from "../utils/socials";
import { NextPage } from "next";
import Head from "next/head";
import Discord from "../components/main/Discord";
import { WebSocketContext } from "../utils/lanyard";
import { websocketlog } from "../utils/";
import getIcon from "../components/main/Icon";
import { getTime } from "../utils";
import Spinner from "../components/main/Spinner";
import { getRandomBackground } from "../utils/getBackground";

const Main: NextPage = () => {
  const connectToWebSocket = () => {
    websocketlog("Trying to connect websocket...");
    let ws = new WebSocket("wss://api.lanyard.rest/socket");
    let number = 1;
    let intervalObject: NodeJS.Timer;

    ws.addEventListener("open", () => {
      websocketlog("Connected to websocket!");
    });
    ws.addEventListener("message", (message) => {
      let jsConvert = JSON.parse(message.data);
      switch (jsConvert.op) {
        case 1:
          let op1 = {
            op: 2,
            d: {
              subscribe_to_id: "391511241786654721",
            },
          };
          let interval = jsConvert.d.heartbeat_interval;
          ws.send(JSON.stringify(op1));
          intervalObject = setInterval(() => {
            websocketlog("Sending heartbeat interval...");
            let op3 = {
              op: 3,
            };
            ws.send(JSON.stringify(op3));
          }, interval);
          break;
        case 0:
          websocketlog(`${number++}. data received from discord, updating... `);
          let discordData = jsConvert.d;
          setData(discordData);
          break;
      }
    });

    ws.addEventListener("error", (error) => {
      clearInterval(intervalObject);
      ws.close();
      websocketlog(`An error occurred while websocket connection: ${error}`);
      websocketlog("Trying to reconnect to websocket!");
      connectToWebSocket();
    });

    return ws;
  };

  const [data, setData] = useState(null);
  const [bg, setBg] = useState(getRandomBackground());
  const bgRef = useRef<any>(null);

  useEffect(() => {
    let ws = connectToWebSocket();
    // window.addEventListener('load', () => {
    //   const preloader = document.querySelector(`.${styles.preloader}`)
    //   preloader?.classList.add('disappear')
    //   setTimeout(() => {
    //     preloader?.remove()
    //   }, 1000)
    // })

    return () => ws.close();
  }, []);

  return (
    <div className={styles.main}>
      <Head>
        <title>lechixy | sweetest pie!</title>
      </Head>
      {/*//TODO: add a preloader*/}
      <div className={styles.background} ref={bgRef}>
        <div>
          <img src={bg} alt="background" />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.stuff}>
          <div>
            <div className={styles.stuff_header}>Stuffs</div>
            <div className={styles.stuff_item}>
              {socials.map((social) => {
                return (
                  <a
                    href={social.url}
                    target={"_blank"}
                    rel={"noreferrer"}
                    className={`${styles.app} ${styles[`app_${social.name.toLowerCase()}`]}`}
                    key={social.name}
                  >
                    {getIcon(social.name, styles)}
                    {social.name}
                  </a>
                );
              })}
            </div>
          </div>
          <div className={styles.made_text}>
            <p>{`melih 💖`}</p>
          </div>
        </div>
        <div className={styles.discord}>
          {data ? (
            <WebSocketContext.Provider value={data}>
              <Discord />
            </WebSocketContext.Provider>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
      {/* <div className={styles.preloader} >
        <Spinner />
      </div> */}
    </div>
  );
};

export default Main;
