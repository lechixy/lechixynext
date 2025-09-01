/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import styles from "styles/main/Home.module.scss";
import socials from "utils/socials";
import { GetServerSidePropsResult, GetStaticPropsContext, NextPage } from "next";
import Head from "next/head";
import Discord from "components/Discord";
import { WebSocketContext } from "utils/lanyard";
import getIcon from "components/Icon";
import { BingImageResponse, isMobile, Util } from "utils/Util";
import { ApiRespond } from "utils/types";
import { extractColors } from "extract-colors";
import { DynamicColorContext } from "utils/dynamicColor";
import Link from "next/link";
import { FaInfo, FaVolumeDown, FaVolumeMute } from "react-icons/fa";
import Tooltips from "components/Tooltips";
import KeyboardMovementContainer from "components/KeyboardMovement";

type MainProps = {
  background: {
    src: string;
    animated: boolean;
  };
  bingImage: BingImageResponse;
  loadingText: string;
}

export type BgInfo = {
  bingImage: BingImageResponse;
  usingBackground: "bing" | "seasonal";
}

const usingBackground: "bing" | "seasonal" = "bing";

const Main: NextPage<MainProps> = ({ background, loadingText, bingImage }) => {

  const [data, setData] = useState<ApiRespond | null>(null);
  const [seasonEmojis, setSeasonEmojis] = useState("");

  /**
   * * Background Selection *
   */
  let bg: string = bingImage.images[0].url;
  if (usingBackground === "bing") {
    bg = bingImage.images[0].url;
  } else if (usingBackground === "seasonal") {
    bg = background.src;
  }

  let bgInfo: BgInfo = {
    bingImage,
    usingBackground,
  }

  let season = Util.getSeasonName();
  const [videoMuted, setVideoMuted] = useState(true);
  const [dynamicColor, setDynamicColor] = useState(`var(--${season})`);

  useEffect(() => {
    //console.log(data)
    if (data && data.spotify) {
      extractColors(data.spotify.album_art_url, {
        crossOrigin: "anonymous",
        pixels: 100000,
        colorValidator: (r, g, b, a = 255) => a > 200,
        distance: 0.15,
      })
        .then(colors => {
          //console.log(colors)
          //let newColors = colors.length >= 3 ? `${colors[0].hex}, ${colors[1].hex}, ${colors[2].hex}` : `${colors[0].hex}, ${colors[1].hex}`;
          let newColors = `${colors[0].hex}, ${colors[1].hex}, ${colors[2].hex}`
          setDynamicColor(newColors)
          let stuffs_header = document.querySelector(`.${styles.stuff_header}`) as HTMLDivElement;
          stuffs_header.style.background = `linear-gradient(to right, ${newColors})`;

          let stuffsHeaderContainer = document.querySelector(`.${styles.stuffHeaderContainer}`) as HTMLDivElement;
          stuffsHeaderContainer.style.setProperty("--stuff-color-1", colors[0].hex);

          let bottomText = document.querySelector(`.${styles.bottomText}`) as HTMLDivElement;
          bottomText.style.background = `linear-gradient(to right, ${newColors})`;

          let isWhiteOrBlack = Util.handleTextColor(colors[1]);
          let stuffs_header_text = document.querySelector(`.${styles.stuffHeaderText}`) as HTMLDivElement;
          stuffs_header_text.style.color = isWhiteOrBlack;
        })
        .catch(console.error);
    } else {

      extractColors(bg, {
        crossOrigin: "anonymous",
      })
        .then(colors => {
          //console.log(colors)
          //let newColors = colors.length >= 3 ? `${colors[0].hex}, ${colors[1].hex}, ${colors[2].hex}` : `${colors[0].hex}, ${colors[1].hex}`;
          let newColors = `${colors[0].hex}, ${colors[1].hex}, ${colors[2].hex}`
          setDynamicColor(newColors)
          let stuffs_header = document.querySelector(`.${styles.stuff_header}`) as HTMLDivElement;
          stuffs_header.style.background = `linear-gradient(to right, ${newColors})`;

          let stuffsHeaderContainer = document.querySelector(`.${styles.stuffHeaderContainer}`) as HTMLDivElement;
          stuffsHeaderContainer.style.setProperty("--stuff-color-1", colors[0].hex);

          let bottomText = document.querySelector(`.${styles.bottomText}`) as HTMLDivElement;
          bottomText.style.background = `linear-gradient(to right, ${newColors})`;

          let isWhiteOrBlack = Util.handleTextColor(colors[1]);
          let stuffs_header_text = document.querySelector(`.${styles.stuffHeaderText}`) as HTMLDivElement;
          stuffs_header_text.style.color = isWhiteOrBlack;
        })
        .catch(console.error);
      // setDynamicColor(`var(--${season})`)
      // Util.log("No data from Spotify, using seasonal color...");
      // let stuffs_header = document.querySelector(`.${styles.stuff_header}`) as HTMLDivElement;
      // stuffs_header.style.background = `linear-gradient(to right, var(--${season}))`;

      // let bottom_text = document.querySelector(`.${styles.bottom_text}`) as HTMLDivElement;
      // bottom_text.style.background = `linear-gradient(to right, var(--${season}))`;
    }

  }, [data])

  useEffect(() => {
    function updateMousePosition(e: MouseEvent, element: HTMLAnchorElement) {
      const rect = element.getBoundingClientRect();
      const x = Math.floor(((e.clientX - rect.left) / rect.width) * 100);
      const y = Math.floor(((e.clientY - rect.top) / rect.height) * 100);

      element.style.setProperty('--mouse-x', `${x}%`);
      element.style.setProperty('--mouse-y', `${y}%`);
    }

    // Tüm hover efektli elementleri seç
    const hoverElements = document.querySelectorAll(`.${styles.social}`) as NodeListOf<HTMLAnchorElement>;

    hoverElements.forEach(element => {
      element.addEventListener('mousemove', (e) => {
        updateMousePosition(e, element);
      });
    });

    // * WebSocket Connection *
    let interval: NodeJS.Timeout;
    let intervalTime: number;
    let ws: WebSocket;

    const connectToWebSocket = () => {
      Util.websocketlog("Trying to connect websocket...");
      ws = new WebSocket("wss://api.lanyard.rest/socket");
      let number = 1;

      ws.addEventListener("open", () => {
        Util.websocketlog("Connected to websocket!");
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

            intervalTime = jsConvert.d.heartbeat_interval;
            ws.send(JSON.stringify(op2));

            interval = setInterval(sendHeartbeat, intervalTime);
            break;


          case 0:
            Util.websocketlog(`${number++}. data received from discord, updating... `);
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

        Util.websocketlog(`Closed websocket connection: [${close?.code}] ${close?.reason}`);
      });
      ws.addEventListener("error", (error) => {
        clearInterval(interval);
        ws.close(1000);
        Util.websocketlog(`An error occurred while websocket connection:`);
        console.log(error);
      });

      return ws;
    };
    const sendHeartbeat = () => {
      Util.websocketlog("Sending heartbeat interval...");

      if (ws.readyState === ws.CONNECTING) {
        Util.websocketlog("Still trying to connect to websocket, passing heartbeat interval");
        setData(null);
        return;
      }
      else if (ws.readyState === ws.CLOSED) {
        setData(null);
        Util.websocketlog("No websocket connection, trying to reconnect...");
        clearInterval(interval)
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
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    let layerContainer = document.querySelector(`.${styles.layerContainer}`);

    const season = Util.getSeasonName();
    //const season = "summer"
    const seasonContent = Util.getSeasonContent(season);

    //Season Theme
    let bottomText = document.querySelector(`.${styles.bottomText}`) as HTMLDivElement;
    let bottomTextSpan = bottomText.querySelector(`span`) as HTMLSpanElement;
    bottomTextSpan.textContent = seasonContent.seasonEmojis

    setSeasonEmojis(season.charAt(0).toUpperCase() + season.slice(1).toLowerCase());

    let interval: NodeJS.Timeout | null = null;

    if (seasonContent.renderParticle) {
      let spawnEvery = isMobile(navigator) ? 450 : 200;
      interval = setInterval(() => {
        createParticles();
      }, spawnEvery);
    }

    function createParticles() {
      let particle_div = document.createElement("div");
      particle_div.innerHTML = seasonContent.seasonParticle;
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
      // Depth
      let depth = Math.round(Math.random() * 1);
      particle_div.style.zIndex = depth.toString();

      // If site in mobile version
      if (window.innerWidth < 650) {
        end_y = end_y + 100;
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

      layerContainer?.append(particle_div);

      let clear_timeout = setTimeout(() => {
        particle_div.remove();
        clearTimeout(clear_timeout);
      }, life_time);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [data]);

  function changeVideoVolume() {
    let video = document.querySelector("video") as HTMLVideoElement;
    video.volume = 0.25;
    if (video.muted) {
      setVideoMuted(false);
    } else {
      setVideoMuted(true);
    }
  }

  return (
    <div className={styles.main}>
      <Head>
        <title>lechixy's website | flawless</title>
      </Head>
      <div className={styles.background} onClick={() => background.animated && changeVideoVolume()}>
        {background.animated ? (
          <>
            <video src={background.src} controls={false} disablePictureInPicture loop autoPlay muted={videoMuted} />
            <button className={styles.muteButton} onClick={() => changeVideoVolume()}
            >
              {videoMuted ? <FaVolumeMute /> : <FaVolumeDown />}
            </button>
          </>
        ) : (
          <>
            <img src={bg} alt="background" />
            {usingBackground === "bing" && (
              <div className={styles.backgroundInfo}>
                <FaInfo />
              </div>
            )}
          </>
        )}
      </div>
      <WebSocketContext.Provider value={data}>
        <DynamicColorContext.Provider value={dynamicColor}>
          <KeyboardMovementContainer
            moveDistance={100}
          >
            <div className={styles.stuff}>
              <div>
                <div className={styles.stuff_header}>
                  <div className={styles.stuffHeaderContainer}>
                    <span className={styles.stuffHeaderText}>Stuffs</span>
                    <span className={styles.stuffHeaderTextGlow}>Stuffs</span>
                  </div>
                </div>
                <div className={styles.stuffApps}>
                  {socials.map((social) => {
                    if (social.value == "ig" || social.value == "dc") return null;
                    let appHoverColorFirst = social.color.replace("1)", "0.3)");
                    let appHoverColorSecond = social.color.replace("1)", "0.05)");
                    return (
                      <Link
                        href={social.url}
                        target={social.type && social.type != "_blank" ? social.type : "_blank"}
                        className={`${styles.social} ${styles[`social_${social.value.toLowerCase()}`]}`}
                        style={{
                          ["--app-color" as any]: social.color,
                          ["--app-hover-color-1" as any]: appHoverColorFirst,
                          ["--app-hover-color-2" as any]: appHoverColorSecond
                        }}
                        key={social.name}
                      >
                        <div className={styles.socialIcon}>
                          {getIcon(social.value, styles)}
                        </div>
                        <div className={styles.socialInfo}>
                          <div className={styles.socialNameContainer}>
                            <span className={styles.socialName}>{social.name}</span>
                            <span className={styles.socialNameGlow}>{social.name}</span>
                          </div>
                          <div className={styles.socialDetails}>{social.details}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div
                className={styles.bottomText}
              >
                <span>this will change i guess</span>
              </div>
            </div>
            <div className={styles.discord}>
              <Discord loadingText={loadingText} />
            </div>
          </KeyboardMovementContainer>
        </DynamicColorContext.Provider>
      </WebSocketContext.Provider>
      <div className={styles.layerContainer}>
        <div className={styles.layers}>
          {data && (
            <Tooltips data={data} bgInfo={bgInfo} />
          )}
        </div>
      </div>
      {/* <div className={styles.preloader} >
        <Spinner />
      </div> */}
    </div>
  );
};

export async function getServerSideProps(context: GetStaticPropsContext): Promise<GetServerSidePropsResult<MainProps>> {
  let bg = Util.getRandomSeasonalBackground();
  let bing = await Util.getTodaysBingImage()
  let loadingText = Util.getRandomLoadingText();

  return {
    props: {
      background: bg,
      bingImage: bing,
      loadingText: loadingText
    },
  };
}

export default Main;
