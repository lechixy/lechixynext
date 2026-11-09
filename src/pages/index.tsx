import type { GetStaticProps, NextPage } from "next";
import styles from "styles/main/New.module.scss";
import Spacer from "components/Spacer";
import { FaCode, FaInfoCircle, FaRegEnvelope } from "react-icons/fa";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { ApiRespond, Project } from "utils/types";
import { Util } from "utils/Util";
import { motion } from "motion/react";
import StatusIndicator from "components/StatusIndicator";
import PresenceOverview from "components/PresenceOverview";
import Presence from "components/Presence";
import { extractColors } from "extract-colors";
import type { FinalColor } from "extract-colors/lib/types/Color";
import SplitText from "components/reactbits/SplitText";
import Spinner from "components/Spinner";
import GradientText from "components/reactbits/GradientText";
import { DynamicColorContext } from "utils/dynamicColor";
import Tooltips from "components/Tooltips";
import Projects from "components/Projects";
import Skills from "components/Skills";
import Starfield from "components/Starfield";
import { getPinnedProjects, PROJECTS_REVALIDATE_SECONDS } from "utils/githubProjects";
import ClickSpark from "@/src/components/reactbits/ClickSpark";

type HomeProps = { projects: Project[] | null };

const sectionLinks = [
    { id: "presence", label: "Presence" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
];

const homePalettes = [
    { primary: "#F7B8DC", secondary: "#D2C2FF", tertiary: "#AECFFF" },
    { primary: "#B6D4FF", secondary: "#B9EBF5", tertiary: "#B8F1D8" },
    { primary: "#FFCAA9", secondary: "#F8BCD3", tertiary: "#E1C4FC" },
    { primary: "#C7EFA6", secondary: "#B1E9CC", tertiary: "#ABE1EF" },
    { primary: "#FFD98F", secondary: "#FFC5A7", tertiary: "#F5BCD5" },
];

const developerColors = ["var(--home-primary)", "var(--home-secondary)", "var(--home-tertiary)"];

function brightness({ red, green, blue }: FinalColor) {
    return red * 0.2126 + green * 0.7152 + blue * 0.0722;
}

function albumAccent(color: FinalColor) {
    const lift = Math.round(Math.max(0, 1 - brightness(color) / 145) * 60);
    return lift ? `color-mix(in oklab, ${color.hex}, white ${lift}%)` : color.hex;
}

// In dark mode i use amoled black, in light mode i use white. I will add a toggle for dark mode later.
// Only add dark mode when i type "dark" in the className of the div. I will add a toggle for dark mode later.

const New: NextPage<HomeProps> = ({ projects }) => {
    const pageRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef<HTMLDetailsElement>(null);
    const [loadingText, setLoadingText] = useState("Loading presence data...");
    const [palette, setPalette] = useState(homePalettes[0]);

    useEffect(() => {
        setLoadingText(Util.getRandomLoadingText());
        let index = Math.floor(Math.random() * homePalettes.length);
        try {
            const key = "lechixy:home-palette";
            if (sessionStorage.getItem(key) === String(index)) {
                index = (index + 1 + Math.floor(Math.random() * (homePalettes.length - 1))) % homePalettes.length;
            }
            sessionStorage.setItem(key, String(index));
        } catch {
            // The random palette still works when session storage is unavailable.
        }
        setPalette(homePalettes[index]);
    }, []);

    useEffect(() => {
        const closeOnOutsidePress = (event: PointerEvent) => {
            const info = infoRef.current;
            if (info?.open && event.target instanceof Node && !info.contains(event.target)) info.open = false;
        };

        document.addEventListener("pointerdown", closeOnOutsidePress);
        return () => document.removeEventListener("pointerdown", closeOnOutsidePress);
    }, []);

    useEffect(() => {
        const page = pageRef.current;
        if (!page) return;

        let trackedHash = "";
        let reachedSection = false;
        const updateSectionHash = () => {
            const { hash, pathname, search } = window.location;
            if (hash !== trackedHash) {
                trackedHash = hash;
                reachedSection = false;
            }
            if (!hash) return;

            const section = document.getElementById(hash.slice(1));
            if (section?.parentElement !== page || section.tagName !== "SECTION") return;

            const center = page.getBoundingClientRect().top + page.clientHeight / 2;
            const { top, bottom } = section.getBoundingClientRect();
            if (top <= center && center < bottom) {
                reachedSection = true;
            } else if (reachedSection) {
                window.history.replaceState(window.history.state, "", pathname + search);
                trackedHash = "";
                reachedSection = false;
            }
        };

        updateSectionHash();
        page.addEventListener("scroll", updateSectionHash, { passive: true });
        window.addEventListener("hashchange", updateSectionHash);
        return () => {
            page.removeEventListener("scroll", updateSectionHash);
            window.removeEventListener("hashchange", updateSectionHash);
        };
    }, []);

    const [data, setData] = useState<ApiRespond | null>(null);
    const albumArtUrl = data?.listening_to_spotify ? data.spotify?.album_art_url : undefined;
    const [albumPalette, setAlbumPalette] = useState<FinalColor[] | null>(null);
    const activeAlbum = albumArtUrl ? albumPalette : null;
    const albumColors = activeAlbum?.map(color => color.hex) ?? null;
    const dynamicColor = albumColors?.join(", ") ?? `var(--${Util.getSeasonName()})`;
    const darkestAlbumColor = activeAlbum?.reduce((darkest, color) => brightness(color) < brightness(darkest) ? color : darkest);
    const backdrop = darkestAlbumColor
        ? `color-mix(in srgb, ${darkestAlbumColor.hex} ${Math.round(34 - brightness(darkestAlbumColor) / 14)}%, #090b13)`
        : `color-mix(in srgb, ${palette.primary} 13%, #090b13)`;
    const [primary, secondary, tertiary] = activeAlbum?.map(albumAccent) ?? [palette.primary, palette.secondary, palette.tertiary];

    useEffect(() => {
        if (!albumArtUrl) {
            setAlbumPalette(null);
            return;
        }

        let current = true;
        extractColors(albumArtUrl, {
            crossOrigin: "anonymous",
            pixels: 100000,
            colorValidator: (_r, _g, _b, a = 255) => a > 200,
            distance: 0.09,
        }).then(colors => {
            if (!current) return;
            const significant = colors.filter(color => color.area >= 0.025);
            const swatches = significant.length ? significant : colors;
            setAlbumPalette(swatches.length ? [0, 1, 2].map(index => swatches[index % swatches.length]) : null);
        }).catch(error => {
            if (current) {
                setAlbumPalette(null);
                console.error(error);
            }
        });

        return () => { current = false; };
    }, [albumArtUrl]);

    useEffect(() => {
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
                        let discordData: ApiRespond = jsConvert.d;
                        //discordData.github = github;
                        setData(discordData);
                        console.log(discordData)
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

    return (
        <ClickSpark
            sparkColor="#ffffff"
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
            scrollContainerRef={pageRef}
        >
            <div ref={pageRef} className={styles.page} style={{
                "--home-primary": primary,
                "--home-secondary": secondary,
                "--home-tertiary": tertiary,
                "--home-backdrop": backdrop,
            } as CSSProperties}>
                <Starfield palette={palette} albumColors={albumColors} />
                <details ref={infoRef} className={styles.siteInfo} onKeyDown={event => {
                    if (event.key === "Escape" && event.currentTarget.open) {
                        event.currentTarget.open = false;
                        event.currentTarget.querySelector("summary")?.focus();
                    }
                }}>
                    <summary aria-label="Website information">
                        <FaInfoCircle aria-hidden="true" />
                    </summary>
                    <div className={styles.siteInfoPanel} role="dialog" aria-label="Website information">
                        <a href="https://github.com/lechixy/lechixynext/commits/main/" target="_blank" rel="noreferrer">
                            <strong>Check project on GitHub</strong>
                            <span>Last updated on March 27th 2026, 10:34 pm</span>
                        </a>
                    </div>
                </details>
                {/* Overview */}
                <section className={`${styles.section} ${styles.overviewSection}`} id="overview">
                    <motion.div
                        layout
                        initial={{ scale: 0 }} animate={{ scale: 1 }}

                        className={styles.overviewContent}>
                        <motion.div className={styles.overviewImage} layout>
                            <img src="https://avatars.githubusercontent.com/u/51778131?v=4" className="rounded-full aspect-square" draggable={false} />
                            <div className={styles.statusIndicator}>
                                <StatusIndicator status={data?.discord_status || "offline"} />
                            </div>
                        </motion.div>
                        <motion.div className={styles.overviewAbout} layout>
                            <h2 className="text-4xl text-gray-500">Hi, I'm</h2>
                            <SplitText
                                text="Melih"
                                className="text-6xl font-semibold text-center"
                                delay={100}
                                duration={1.25}
                                ease="power3.out"
                                splitType="chars"
                                from={{ opacity: 0, y: 40 }}
                                to={{ opacity: 1, y: 0 }}
                                threshold={0.1}
                                textAlign="left"
                            />
                            <div className={styles.developerLabel}>
                                <FaCode aria-hidden="true" />
                                <GradientText colors={developerColors} animationSpeed={4}>
                                    <p className="text-3xl font-semibold">Developer</p>
                                </GradientText>
                            </div>
                            <Spacer height={20} />
                            <PresenceOverview data={data} />
                        </motion.div>
                    </motion.div>

                    <nav aria-label="Page sections" className={styles.sectionNav}>
                        {sectionLinks.map(({ id, label }, index) => (
                            <span key={id}>
                                {index > 0 && <span aria-hidden="true">·</span>}
                                <a href={`#${id}`}>{label}</a>
                            </span>
                        ))}
                    </nav>
                </section>
                {/* Presence */}
                <section className={`${styles.section} ${styles.presenceSection}`} id="presence">
                    <DynamicColorContext.Provider value={dynamicColor}>
                        <h1 className="text-4xl font-bold text-white">Presence</h1>
                        <div className={styles.presenceContent}>
                            {data != null ? (
                                <Presence info={data} />
                            ) : <>
                                <Spinner text={loadingText} />
                            </>}
                        </div>
                    </DynamicColorContext.Provider>
                </section>
                <Projects projects={projects} />
                <Skills />
                {/* Contact */}
                <section className={`${styles.section} ${styles.contactSection}`} id="contact">
                    <h1 className="text-4xl font-bold text-white">Contact</h1>
                    <a className={`${styles.contactLink} ${styles.scrollReveal}`} href="mailto:lechixy@gmail.com">
                        <FaRegEnvelope aria-hidden="true" />
                        <span>lechixy@gmail.com</span>
                    </a>
                </section>
                <div className={styles.layerContainer}>
                    <div className={styles.layers}>
                        {data && (
                            <Tooltips data={data} />
                        )}
                    </div>
                </div>
            </div>
        </ClickSpark>
    )
}

export const getStaticProps: GetStaticProps<HomeProps> = async ({ revalidateReason }) => {
    let projects: Project[] | null = null;
    try {
        projects = await getPinnedProjects();
    } catch (error) {
        // A failed regeneration should leave the last good page in the ISR cache.
        if (revalidateReason !== "build" && process.env.NODE_ENV !== "development") throw error;
        console.warn("Could not load pinned projects:", error);
    }

    return { props: { projects }, revalidate: PROJECTS_REVALIDATE_SECONDS };
};

export default New;
