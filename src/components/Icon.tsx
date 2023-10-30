import { FaGithub, FaInstagram, FaSpotify, FaStar, FaSteam, FaTwitch } from 'react-icons/fa'

export default function getIcon(name: string, styles: any) {
    if (name === 'Instagram') {
        return (
            <FaInstagram className={styles.app_icon} />
        )
    }
    if (name === 'Twitch') {
        return (
            <FaTwitch className={styles.app_icon} />
        )
    }
    if (name === 'Steam') {
        return (
            <FaSteam className={styles.app_icon} />
        )
    }
    if (name === 'Spotify') {
        return (
            <FaSpotify className={styles.app_icon} />
        )
    }
    if (name === 'GitHub') {
        return (
            <FaGithub className={styles.app_icon} />
        )
    }
    if (name === 'lechsbott') {
        return (
            <FaStar className={styles.app_icon} />
        )
    }
}