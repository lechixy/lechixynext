/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import styles from "../utils/styles/main/Home.module.scss";
import socials from "../utils/socials";
import {
  GetServerSidePropsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
  NextPage,
} from "next";
import Head from "next/head";
import Discord from "../components/main/Discord";
import { WebSocketContext } from "../utils/lanyard";
import { websocketlog } from "../utils/";
import getIcon from "../components/main/Icon";
import Spinner from "../components/main/Spinner";
import { getRandomBackground } from "../utils/getBackground";

const Main: NextPage<any> = ({ background }) => {
  const [data, setData] = useState(null);
  const bg = background;

  useEffect(() => {
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
      ws.addEventListener("close", (close) => {
        //1011 | Server error - Internal server error while operating
        if (close.code === 1000) {
          connectToWebSocket();
          return;
        }

        websocketlog(`Closed websocket connection: [${close?.code}] ${close?.reason}`);
      });
      ws.addEventListener("error", (error) => {
        clearInterval(intervalObject);
        ws.close(1000, "Error");
        console.log(error);
        websocketlog(`An error occurred while websocket connection: ${error}`);
      });

      return ws;
    };

    let ws = connectToWebSocket();
    // window.addEventListener('load', () => {
    //   const preloader = document.querySelector(`.${styles.preloader}`)
    //   preloader?.classList.add('disappear')
    //   setTimeout(() => {
    //     preloader?.remove()
    //   }, 1000)
    // })

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    let layer_container = document.querySelector(`.${styles.layer_container}`);

    let interval = setInterval(() => {
      createSnowflake();
    }, 150)

    function createSnowflake() {
      let flake_div = document.createElement("div");
      flake_div.textContent = "❄";
      flake_div.classList.add(styles.flake);

      let life_time = Math.floor(Math.random() * 10) + 4000;
      let spawn_x = Math.floor(Math.random() * window.innerWidth);
      let end_x = Math.floor(Math.random() * window.innerWidth);
      let opacity = (Math.random() * 1) + 0.3;
      let rotate_start = Math.floor(Math.random() * 360);
      let rotate_end = Math.floor(Math.random() * (360*3)) + 120;

      flake_div.style.opacity = opacity.toString();
      flake_div.animate([
        { transform: `translateY(0px) translateX(${spawn_x}px) rotateZ(${rotate_start}deg)` },
        { transform: `translateY(101vh) translateX(${end_x}px) rotateZ(${rotate_end}deg)` },
      ], {
        duration: life_time,
        fill: "forwards"
      });

      layer_container?.append(flake_div);
      

      let clear_timeout = setTimeout(() => {
        flake_div.remove();
        clearTimeout(clear_timeout);
      }, life_time);
    }

    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <div className={styles.main}>
      <Head>
        <title>lechixy | sweetest pie!</title>
      </Head>
      <div className={styles.background}>
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
          <div className={styles.bottom_text}>{`🍓`}</div>
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
      <div className={styles.layer_container} />
      {/* <div className={styles.preloader} >
        <Spinner />
      </div> */}
    </div>
  );
};

export function getServerSideProps(context: GetStaticPropsContext): GetServerSidePropsResult<any> {
  let bg = getRandomBackground();

  return {
    props: {
      background: bg,
    },
  };
}

export default Main;
