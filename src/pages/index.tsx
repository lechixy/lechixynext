/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import styles from "../utils/styles/main/Home.module.scss";
import socials from "../utils/socials";
import { GetServerSidePropsResult, GetStaticPropsContext, NextPage } from "next";
import Head from "next/head";
import Discord from "../components/main/Discord";
import { WebSocketContext } from "../utils/lanyard";
import { websocketlog } from "../utils/";
import getIcon from "../components/main/Icon";
import Spinner from "../components/main/Spinner";
import { getRandomBackground } from "../utils/getBackground";
import { ParticleType } from "../utils/types";

const Main: NextPage<any> = ({ background }) => {
  const [data, setData] = useState(null);
  const bg = background;
  const [season, setSeason] = useState<ParticleType>("cherry");

  useEffect(() => {
    let intervalObject: NodeJS.Timer;
    let interval: number;
    let ws: WebSocket;

    const connectToWebSocket = () => {
      websocketlog("Trying to connect websocket...");
      ws = new WebSocket("wss://api.lanyard.rest/socket");
      let number = 1;
      
      ws.addEventListener("open", () => {
        websocketlog("Connected to websocket!");
      });
      ws.addEventListener("message", (message) => {
        let jsConvert = JSON.parse(message.data);
        switch (jsConvert.op) {
          // Opcode 1: Hello
          case 1:
            // Opcode 2: Initialize
            let op2 = {
              op: 2,
              d: {
                subscribe_to_id: "391511241786654721",
              },
            };

            interval = jsConvert.d.heartbeat_interval;
            ws.send(JSON.stringify(op2));

            intervalObject = setInterval(sendHeartbeat, interval);
            break;

            
          case 0:
            websocketlog(`${number++}. data received from discord, updating... `);
            let discordData = jsConvert.d;
            setData(discordData);
            break;
        }
      });
      ws.addEventListener("close", (close) => {
        if (close.code === 1000) {
          connectToWebSocket();
          return;
        }

        websocketlog(`Closed websocket connection: [${close?.code}] ${close?.reason}`);
      });
      ws.addEventListener("error", (error) => {
        clearInterval(intervalObject);
        ws.close(1000);
        websocketlog(`An error occurred while websocket connection:`);
        console.log(error);
      });

      return ws;
    };
    const sendHeartbeat = () => {
      websocketlog("Sending heartbeat interval...");

      if (ws.readyState === ws.CONNECTING){
        websocketlog("Still trying to connect to websocket, passing heartbeat interval");
        setData(null);
        return;
      }
      else if (ws.readyState === ws.CLOSED) {
        setData(null);
        websocketlog("No websocket connection, trying to reconnect...");
        clearInterval(intervalObject);
        ws = connectToWebSocket();
        return;
      }

      let op3 = {
        op: 3,
      };
      ws.send(JSON.stringify(op3));
    };

    ws = connectToWebSocket();
    // window.addEventListener('load', () => {
    //   const preloader = document.querySelector(`.${styles.preloader}`)
    //   preloader?.classList.add('disappear')
    //   setTimeout(() => {
    //     preloader?.remove()
    //   }, 1000)
    // })

    return () => {
      ws.close(1000);
      clearInterval(intervalObject);
    };
  }, []);

  useEffect(() => {
    let layer_container = document.querySelector(`.${styles.layer_container}`);

    //Season Theme
    let stuffs_header = document.querySelector(`.${styles.stuff_header}`) as HTMLDivElement;
    stuffs_header.style.background = `linear-gradient(to right, var(--${season}))`;

    let bottom_text = document.querySelector(`.${styles.bottom_text}`) as HTMLDivElement;
    bottom_text.style.background = `linear-gradient(to right, var(--${season}))`;

    let interval = setInterval(() => {
      createParticles();
    }, 150);

    function createParticles() {
      let emoji = season === "snow" ? "❄" : "🌸";

      let particle_div = document.createElement("div");
      particle_div.textContent = emoji;
      particle_div.classList.add(styles.particle, styles[season]);

      /**
       * ! Particle Values
       */

      // Time
      let life_time = Math.floor(Math.random() * 10) + 4250;
      // Scale
      let spawn_scale = Math.random() * 0.6 + 0.5;
      let end_scale = Math.random() * 0.25 + spawn_scale;
      // Position
      let spawn_x = Math.floor(Math.random() * window.innerWidth);
      let end_x = Math.floor(Math.random() * window.innerWidth);
      let end_y = 102;
      // Opacity
      let spawn_opacity = Math.random() * 1 + 0.65;
      let end_opacity = Math.abs(Math.random() * spawn_opacity);
      // Rotation
      let rotate_start = Math.floor(Math.random() * 270) + 90;
      let rotate_end = Math.floor(Math.random() * (360 * 3));

      // If site in mobile version
      if (window.innerWidth < 650) {
        end_y = end_y + 50;
      }

      particle_div.animate(
        [
          {
            transform: `translateY(-2vh) translateX(${spawn_x}px) rotateZ(${rotate_start}deg) scale(${spawn_scale})`,
            opacity: spawn_opacity.toString(),
          },
          {
            transform: `translateY(${end_y}vh) translateX(${end_x}px) rotateZ(${rotate_end}deg) scale(${end_scale})`,
            opacity: end_opacity.toString(),
          },
        ],
        {
          duration: life_time,
          fill: "forwards",
          easing: "linear",
        }
      );

      layer_container?.append(particle_div);

      let clear_timeout = setTimeout(() => {
        particle_div.remove();
        clearTimeout(clear_timeout);
      }, life_time);
    }

    return () => {
      clearInterval(interval);
    };
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
