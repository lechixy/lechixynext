import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaWindows } from "react-icons/fa";
import { SiDiscord, SiGooglechrome, SiKotlin, SiReact, SiRust } from "react-icons/si";
import styles from "styles/main/New.module.scss";

const skills = [
    {
        name: "TypeScript · React · Next.js",
        icon: SiReact,
        level: "Proficient",
        description: "Builds web interfaces with React and TypeScript, including a live Discord presence and server-cached GitHub projects.",
        repository: "lechixynext",
    },
    {
        name: "C# · .NET · WinUI 3",
        icon: FaWindows,
        level: "Intermediate",
        description: "Builds Windows desktop apps that wrap command-line tools with presets, progress feedback, and a log viewer.",
        repository: "LechYTDLP",
    },
    {
        name: "Kotlin · Jetpack Compose",
        icon: SiKotlin,
        level: "Intermediate",
        description: "Builds Android interfaces for phones and tablets, including live video, chat, and Material 3 theming.",
        repository: "Kicker",
    },
    {
        name: "Rust · Graphics",
        icon: SiRust,
        level: "Developing",
        description: "Built a CPU renderer that resolves Minecraft model and texture references and exports still and animated WebP images.",
        repository: "MinecraftBlockRenderer",
    },
    {
        name: "Node.js · Discord.js",
        icon: SiDiscord,
        level: "Intermediate",
        description: "Builds Discord bots in JavaScript and TypeScript, with server utilities and music features.",
        repository: "lechsbott",
    },
    {
        name: "Browser Extensions",
        icon: SiGooglechrome,
        level: "Intermediate",
        description: "Builds TypeScript extensions that add tools to existing pages, such as showing Minecraft recipes in Google Search results.",
        repository: "MinecraftRecipeExtension",
    },
];

export default function Skills() {
    return (
        <section className={`${styles.section} ${styles.skillsSection}`} id="skills">
            <h1 className="text-4xl font-bold">Skills</h1>
            <ul className={styles.skillsContent}>
                {skills.map(({ name, icon: Icon, level, description, repository }) => (
                    <li key={name}>
                        <a className={`${styles.skillCard} ${styles.cardSurface} ${styles.scrollReveal}`}
                            href={`https://github.com/lechixy/${repository}`} target="_blank" rel="noreferrer">
                            <div className={styles.skillMeta}>
                                <span className={styles.skillIcon}><Icon aria-hidden="true" /></span>
                                <span className={styles.skillLevel}>{level}</span>
                            </div>
                            <h2 className={styles.skillTitle}>{name}</h2>
                            <p>{description}</p>
                            <span className={styles.skillRepository}>
                                {repository}
                                <FaArrowUpRightFromSquare aria-hidden="true" />
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
}
