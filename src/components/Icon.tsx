import { FaDiscord, FaGithub, FaHeart, FaInstagram, FaMoon, FaRegHeart, FaSpotify, FaStar, FaSteam, FaTwitch } from 'react-icons/fa'
import { SocialValues } from 'utils/socials'

export default function getIcon(name: SocialValues, styles: any) {
    if (name === 'ig') {
        return (
            <FaInstagram className={styles.app_icon} />
        )
    }
    if (name === 'tw') {
        return (
            <FaTwitch className={styles.app_icon} />
        )
    }
    if (name === 'steam') {
        return (
            <FaSteam className={styles.app_icon} />
        )
    }
    if (name === 'sp') {
        return (
            <FaSpotify className={styles.app_icon} />
        )
    }
    if (name === 'github') {
        return (
            <FaGithub className={styles.app_icon} />
        )
    }
    if (name === 'lechsbott') {
        return (
            <FaStar className={styles.app_icon} />
        )
    }
    if (name == "dc"){
        return (
            <FaDiscord className={styles.app_icon} />
        )
    }
    if (name == "gallery"){
        return (
            <FaHeart className={styles.app_icon} />
        )
    }
}