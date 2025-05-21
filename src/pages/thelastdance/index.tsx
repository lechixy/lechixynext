import { NextPage } from "next"
import Head from "next/head";
import { useEffect } from "react";
import styles from "./TheLastDance.module.scss"

const TheLastDance: NextPage = () => {

    return (
        <>
            <Head>
                <title>lechixy | the last dance...</title>
            </Head>
            <div className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.nav}>
                        <div className={styles.navItems}>
                            <div className={styles.menus}>
                                <div className={styles.netflixLogo}>
                                    <img src="/images/netflixLogo.png" alt="Netflix Logo" />
                                </div>
                                <span>Ana Sayfa</span>
                                <span>Diziler</span>
                                <span>Filmler</span>
                                <span>Oyunlar</span>
                                <span>Yeni ve Popüler</span>
                                <span>Listem</span>
                                <span>Dile Göre Göz At</span>
                            </div>
                            <div></div>
                            <div className={styles.buttons}>
                                <div className={styles.search}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" role="img" viewBox="0 0 24 24" width="24" height="24" data-icon="MagnifyingGlassStandard" aria-hidden="true">
                                        <path fill="currentColor" d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10ZM15.6177 17.0319C14.078 18.2635 12.125 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 12.125 18.2635 14.078 17.0319 15.6177L22.7071 21.2929L21.2929 22.7071L15.6177 17.0319Z" clip-rule="evenodd" fill-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <div className={styles.kids}>
                                    Çocuk
                                </div>
                                <div className={styles.bell}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" role="img" viewBox="0 0 24 24" width="24" height="24" data-icon="BellStandard" aria-hidden="true">
                                        <path fill="currentColor" d="M13.0002 4.07092C16.3924 4.55624 19 7.4736 19 11V15.2538C20.0489 15.3307 21.0851 15.4245 22.1072 15.5347L21.8928 17.5232C18.7222 17.1813 15.4092 17 12 17C8.59081 17 5.27788 17.1813 2.10723 17.5232L1.89282 15.5347C2.91498 15.4245 3.95119 15.3307 5.00003 15.2538V11C5.00003 7.47345 7.60784 4.55599 11.0002 4.07086V2H13.0002V4.07092ZM17 15.1287V11C17 8.23858 14.7614 6 12 6C9.2386 6 7.00003 8.23858 7.00003 11V15.1287C8.64066 15.0437 10.3091 15 12 15C13.691 15 15.3594 15.0437 17 15.1287ZM8.62593 19.3712C8.66235 20.5173 10.1512 22 11.9996 22C13.848 22 15.3368 20.5173 15.3732 19.3712C15.3803 19.1489 15.1758 19 14.9533 19H9.0458C8.82333 19 8.61886 19.1489 8.62593 19.3712Z" clip-rule="evenodd" fill-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <div className={styles.profile}>
                                    <img src="/images/teknokent.png" alt="Profile" />
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.page}>
                        <div className={styles.enterance}>
                            <div className={styles.background}>
                            </div>
                            <div className={styles.overlay}></div>
                            <div className={styles.content}>
                                <img className={styles.logo} src="/images/nDizi.png" alt="The Last Dance Logo" />
                                <div className={styles.title}>12/A:<br></br>The Last Dance</div>
                                <div className={styles.ratings}>2021 | 13+ | 4 Sezon</div>
                                <div className={styles.description}>
                                    Tahtada konu anlatılırken arkada kahkaha tufanı kopardı. Kimsenin tam anlamıyla ne yaptığını bilmediği ama herkesin çok eğlendiği bir sınıftık. Şimdi bu çılgın sınıf final sezonuyla ekranlarda!
                                </div>
                                <div className={styles.buttons}>
                                    <div className={styles.play}>
                                        <svg className={styles.playIcon} xmlns="http://www.w3.org/2000/svg" fill="none" role="img" viewBox="0 0 24 24" width="24" height="24" data-icon="PlayStandard" aria-hidden="true">
                                            <path fill="currentColor" d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z"></path>
                                        </svg>
                                        <div>Oynat</div>
                                    </div>
                                    <div className={styles.info}>
                                        <svg className={styles.infoIcon} xmlns="http://www.w3.org/2000/svg" fill="none" role="img" viewBox="0 0 24 24" width="24" height="24" data-icon="CircleIStandard" aria-hidden="true">
                                            <path fill="currentColor" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" clip-rule="evenodd" fill-rule="evenodd"></path>
                                        </svg>
                                        <div>Daha Fazla Bilgi</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.vignette}></div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default TheLastDance;