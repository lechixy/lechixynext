import { NextPage } from "next"
import Head from "next/head";
import { useEffect } from "react";
import styles from "./Cilek.module.scss"

const Cilek: NextPage = () => {

    useEffect(() => {
        const c = setTimeout(() => {
            const body = document.querySelector(`div.${styles.main}`)
            body?.classList.remove(styles.not_loaded)
            clearTimeout(c);
        }, 1000);

        return () => {
            clearTimeout(c);
        }
    }, []);

    return (

        /**
         *  CSS Blossoming Flowers at Magical Night.
         *  I've taken some inspiration by Yup Nguyen's Artwork: https://dribbble.com/shots/11096994-Virtual-Garden.
         *  Made with Pure CSS & ♥
        */

        <>
            <Head>
                <title>🍓🩵</title>
            </Head>
            <div className={`${styles.not_loaded} ${styles.main}`}>
                <div className={styles.night}></div>
                <div className={styles.flowers}>
                    <div className={`${styles.flower} ${styles.flower_1}`}>
                        <div className={`${styles.flower__leafs} ${styles.flower__leafs_1}`}>
                            <div className={`${styles.flower__leaf} ${styles.flower__leaf_1}`}></div>
                            <div className={`${styles.flower__leaf} ${styles.flower__leaf_2}`}></div>
                            <div className={`${styles.flower__leaf} ${styles.flower__leaf_3}`}></div>
                            <div className={`${styles.flower__leaf} ${styles.flower__leaf_4}`}></div>
                            <div className={styles.flower__white_circle}></div>

                            <div className={`${styles.flower__light} ${styles.flower__light_1}`}></div>
                            <div className={`${styles.flower__light} ${styles.flower__light_2}`}></div>
                            <div className={`${styles.flower__light} ${styles.flower__light_3}`}></div>
                            <div className={`${styles.flower__light} ${styles.flower__light_4}`}></div>
                            <div className={`${styles.flower__light} ${styles.flower__light_5}`}></div>
                            <div className={`${styles.flower__light} ${styles.flower__light_6}`}></div>
                            <div className={`${styles.flower__light} ${styles.flower__light_7}`}></div>
                            <div className={`${styles.flower__light} ${styles.flower__light_8}`}></div>

                        </div>
                        <div className={styles.flower__line}>
                            <div className={`${styles.flower__line__leaf} ${styles.flower__line__leaf_1}`}></div>
                            <div className={`${styles.flower__line__leaf} ${styles.flower__line__leaf_2}`}></div>
                            <div className={`${styles.flower__line__leaf} ${styles.flower__line__leaf_3}`}></div>
                            <div className={`${styles.flower__line__leaf} ${styles.flower__line__leaf_4}`}></div>
                            <div className={`${styles.flower__line__leaf} ${styles.flower__line__leaf_5}`}></div>
                            <div className={`${styles.flower__line__leaf} ${styles.flower__line__leaf_6}`}></div>
                        </div>
                    </div>

                    <div className={`${styles.flower} ${styles.flower_2}`}>
                        <div className={`${styles.flower__leafs} ${styles.flower__leafs_2}`}>
                            <div className={`${styles.flower__leaf} ${styles.flower__leaf_1}`}></div>
                            <div className={`${styles.flower__leaf} ${styles.flower__leaf_2}`}></div>
                            <div className={`${styles.flower__leaf} ${styles.flower__leaf_3}`}></div>
                            <div className={`${styles.flower__leaf} ${styles.flower__leaf_4}`}></div>
                            <div className={styles.flower__white_circle}></div>

                            <div className={`${styles.flower__light} ${styles.flower__light_1}`}></div>
                            <div className={`${styles.flower__light} ${styles.flower__light_2}`}></div>
                            <div className={`${styles.flower__light} ${styles.flower__light_3}`}></div>
                            <div className={`${styles.flower__light} ${styles.flower__light_4}`}></div>
                            <div className={`${styles.flower__light} ${styles.flower__light_5}`}></div>
                            <div className={`${styles.flower__light} ${styles.flower__light_6}`}></div>
                            <div className={`${styles.flower__light} ${styles.flower__light_7}`}></div>
                            <div className={`${styles.flower__light} ${styles.flower__light_8}`}></div>

                        </div>
                        <div className={styles.flower__line}>
                            <div className={`${styles.flower__line__leaf} ${styles.flower__line__leaf_1}`}></div>
                            <div className={`${styles.flower__line__leaf} ${styles.flower__line__leaf_2}`}></div>
                            <div className={`${styles.flower__line__leaf} ${styles.flower__line__leaf_3}`}></div>
                            <div className={`${styles.flower__line__leaf} ${styles.flower__line__leaf_4}`}></div>
                        </div>
                    </div>

                    <div className={`${styles.flower} ${styles.flower_3}`}>
                        <div className={`${styles.flower__leafs} ${styles.flower__leafs_3}`}>
                            <div className={`${styles.flower__leaf} ${styles.flower__leaf_1}`}></div>
                            <div className={`${styles.flower__leaf} ${styles.flower__leaf_2}`}></div>
                            <div className={`${styles.flower__leaf} ${styles.flower__leaf_3}`}></div>
                            <div className={`${styles.flower__leaf} ${styles.flower__leaf_4}`}></div>
                            <div className={styles.flower__white_circle}></div>

                            <div className={`${styles.flower__light} ${styles.flower__light_1}`}></div>
                            <div className={`${styles.flower__light} ${styles.flower__light_2}`}></div>
                            <div className={`${styles.flower__light} ${styles.flower__light_3}`}></div>
                            <div className={`${styles.flower__light} ${styles.flower__light_4}`}></div>
                            <div className={`${styles.flower__light} ${styles.flower__light_5}`}></div>
                            <div className={`${styles.flower__light} ${styles.flower__light_6}`}></div>
                            <div className={`${styles.flower__light} ${styles.flower__light_7}`}></div>
                            <div className={`${styles.flower__light} ${styles.flower__light_8}`}></div>

                        </div>
                        <div className={styles.flower__line}>
                            <div className={`${styles.flower__line__leaf} ${styles.flower__line__leaf_1}`}></div>
                            <div className={`${styles.flower__line__leaf} ${styles.flower__line__leaf_2}`}></div>
                            <div className={`${styles.flower__line__leaf} ${styles.flower__line__leaf_3}`}></div>
                            <div className={`${styles.flower__line__leaf} ${styles.flower__line__leaf_4}`}></div>
                        </div>
                    </div>

                    <div className={styles.grow_ans__1_2s} data-time="1.2s">
                        <div className={styles.flower__g_long}>
                            <div className={styles.flower__g_long__top}></div>
                            <div className={styles.flower__g_long__bottom}></div>
                        </div>
                    </div>

                    <div className={styles.growing_grass}>
                        <div className={`${styles.flower__grass} ${styles.flower__grass_1}`}>
                            <div className={styles.flower__grass_top}></div>
                            <div className={styles.flower__grass_bottom}></div>
                            <div className={`${styles.flower__grass__leaf} ${styles.flower__grass__leaf_1}`}></div>
                            <div className={`${styles.flower__grass__leaf} ${styles.flower__grass__leaf_2}`}></div>
                            <div className={`${styles.flower__grass__leaf} ${styles.flower__grass__leaf_3}`}></div>
                            <div className={`${styles.flower__grass__leaf} ${styles.flower__grass__leaf_4}`}></div>
                            <div className={`${styles.flower__grass__leaf} ${styles.flower__grass__leaf_5}`}></div>
                            <div className={`${styles.flower__grass__leaf} ${styles.flower__grass__leaf_6}`}></div>
                            <div className={`${styles.flower__grass__leaf} ${styles.flower__grass__leaf_7}`}></div>
                            <div className={`${styles.flower__grass__leaf} ${styles.flower__grass__leaf_8}`}></div>
                            <div className={styles.flower__grass__overlay}></div>
                        </div>
                    </div>

                    <div className={styles.growing_grass}>
                        <div className={`${styles.flower__grass} ${styles.flower__grass_2}`}>
                            <div className={styles.flower__grass_top}></div>
                            <div className={styles.flower__grass_bottom}></div>
                            <div className={`${styles.flower__grass__leaf} ${styles.flower__grass__leaf_1}`}></div>
                            <div className={`${styles.flower__grass__leaf} ${styles.flower__grass__leaf_2}`}></div>
                            <div className={`${styles.flower__grass__leaf} ${styles.flower__grass__leaf_3}`}></div>
                            <div className={`${styles.flower__grass__leaf} ${styles.flower__grass__leaf_4}`}></div>
                            <div className={`${styles.flower__grass__leaf} ${styles.flower__grass__leaf_5}`}></div>
                            <div className={`${styles.flower__grass__leaf} ${styles.flower__grass__leaf_6}`}></div>
                            <div className={`${styles.flower__grass__leaf} ${styles.flower__grass__leaf_7}`}></div>
                            <div className={`${styles.flower__grass__leaf} ${styles.flower__grass__leaf_8}`}></div>
                            <div className={styles.flower__grass__overlay}></div>
                        </div>
                    </div>

                    <div className={styles.grow_ans__2_4s} data-time="2.4s">
                        <div className={`${styles.flower__g_right} ${styles.flower__g_right_1}`}>
                            <div className={styles.leaf}></div>
                        </div>
                    </div>

                    <div className={styles.grow_ans__2_8s} data-time="2.8s">
                        <div className={`${styles.flower__g_right} ${styles.flower__g_right_2}`}>
                            <div className={styles.leaf}></div>
                        </div>
                    </div>

                    <div className={styles.grow_ans__2_8s} data-time="2.8s">
                        <div className={styles.flower__g_front}>
                            <div className={`${styles.flower__g_front__leaf_wrapper} ${styles.flower__g_front__leaf_wrapper_1}`}>
                                <div className={styles.flower__g_front__leaf}></div>
                            </div>
                            <div className={`${styles.flower__g_front__leaf_wrapper} ${styles.flower__g_front__leaf_wrapper_2}`}>
                                <div className={styles.flower__g_front__leaf}></div>
                            </div>
                            <div className={`${styles.flower__g_front__leaf_wrapper} ${styles.flower__g_front__leaf_wrapper_3}`}>
                                <div className={styles.flower__g_front__leaf}></div>
                            </div>
                            <div className={`${styles.flower__g_front__leaf_wrapper} ${styles.flower__g_front__leaf_wrapper_4}`}>
                                <div className={styles.flower__g_front__leaf}></div>
                            </div>
                            <div className={`${styles.flower__g_front__leaf_wrapper} ${styles.flower__g_front__leaf_wrapper_5}`}>
                                <div className={styles.flower__g_front__leaf}></div>
                            </div>
                            <div className={`${styles.flower__g_front__leaf_wrapper} ${styles.flower__g_front__leaf_wrapper_6}`}>
                                <div className={styles.flower__g_front__leaf}></div>
                            </div>
                            <div className={`${styles.flower__g_front__leaf_wrapper} ${styles.flower__g_front__leaf_wrapper_7}`}>
                                <div className={styles.flower__g_front__leaf}></div>
                            </div>
                            <div className={`${styles.flower__g_front__leaf_wrapper} ${styles.flower__g_front__leaf_wrapper_8}`}>
                                <div className={styles.flower__g_front__leaf}></div>
                            </div>
                            <div className={styles.flower__g_front__line}></div>
                        </div>
                    </div>

                    <div className={styles.grow_ans__3_2s} data-time="3.2s">
                        <div className={styles.flower__g_fr}>
                            <div className={styles.leaf}></div>
                            <div className={`${styles.flower__g_fr__leaf} ${styles.flower__g_fr__leaf_1}`}></div>
                            <div className={`${styles.flower__g_fr__leaf} ${styles.flower__g_fr__leaf_2}`}></div>
                            <div className={`${styles.flower__g_fr__leaf} ${styles.flower__g_fr__leaf_3}`}></div>
                            <div className={`${styles.flower__g_fr__leaf} ${styles.flower__g_fr__leaf_4}`}></div>
                            <div className={`${styles.flower__g_fr__leaf} ${styles.flower__g_fr__leaf_5}`}></div>
                            <div className={`${styles.flower__g_fr__leaf} ${styles.flower__g_fr__leaf_6}`}></div>
                            <div className={`${styles.flower__g_fr__leaf} ${styles.flower__g_fr__leaf_7}`}></div>
                            <div className={`${styles.flower__g_fr__leaf} ${styles.flower__g_fr__leaf_8}`}></div>
                        </div>
                    </div>

                    <div className={`${styles.long_g} ${styles.long_g_0}`}>
                        <div className={styles.grow_ans__3s} data-time="3s">
                            <div className={`${styles.leaf} ${styles.leaf_0}`}></div>
                        </div>
                        <div className={styles.grow_ans__2_2s} data-time="2.2s">
                            <div className={`${styles.leaf} ${styles.leaf_1}`}></div>
                        </div>
                        <div className={styles.grow_ans__3_4s} data-time="3.4s">
                            <div className={`${styles.leaf} ${styles.leaf_2}`}></div>
                        </div>
                        <div className={styles.grow_ans__3_6s} data-time="3.6s">
                            <div className={`${styles.leaf} ${styles.leaf_3}`}></div>
                        </div>
                    </div>

                    <div className={`${styles.long_g} ${styles.long_g_1}`}>
                        <div className={styles.grow_ans__3_6s} data-time="3.6s">
                            <div className={`${styles.leaf} ${styles.leaf_0}`}></div>
                        </div>
                        <div className={styles.grow_ans__3_8s} data-time="3.8s">
                            <div className={`${styles.leaf} ${styles.leaf_1}`}></div>
                        </div>
                        <div className={styles.grow_ans__4s} data-time="4s">
                            <div className={`${styles.leaf} ${styles.leaf_2}`}></div>
                        </div>
                        <div className={styles.grow_ans__4_2s} data-time="4.2s">
                            <div className={`${styles.leaf} ${styles.leaf_3}`}></div>
                        </div>
                    </div>

                    <div className={`${styles.long_g} ${styles.long_g_2}`}>
                        <div className={styles.grow_ans__4s} data-time="4s">
                            <div className={`${styles.leaf} ${styles.leaf_0}`}></div>
                        </div>
                        <div className={styles.grow_ans__4_2s} data-time="4.2s">
                            <div className={`${styles.leaf} ${styles.leaf_1}`}></div>
                        </div>
                        <div className={styles.grow_ans__4_4s} data-time="4.4s">
                            <div className={`${styles.leaf} ${styles.leaf_2}`}></div>
                        </div>
                        <div className={styles.grow_ans__4_6s} data-time="4.6s">
                            <div className={`${styles.leaf} ${styles.leaf_3}`}></div>
                        </div>
                    </div>

                    <div className={`${styles.long_g} ${styles.long_g_3}`}>
                        <div className={styles.grow_ans__4s} data-time="4s">
                            <div className={`${styles.leaf} ${styles.leaf_0}`}></div>
                        </div>
                        <div className={styles.grow_ans__4_2s} data-time="4.2s">
                            <div className={`${styles.leaf} ${styles.leaf_1}`}></div>
                        </div>
                        <div className={styles.grow_ans__3s} data-time="3s">
                            <div className={`${styles.leaf} ${styles.leaf_2}`}></div>
                        </div>
                        <div className={styles.grow_ans__3_6s} data-time="3.6s">
                            <div className={`${styles.leaf} ${styles.leaf_3}`}></div>
                        </div>
                    </div>

                    <div className={`${styles.long_g} ${styles.long_g_4}`}>
                        <div className={styles.grow_ans__4s} data-time="4s">
                            <div className={`${styles.leaf} ${styles.leaf_0}`}></div>
                        </div>
                        <div className={styles.grow_ans__4_2s} data-time="4.2s">
                            <div className={`${styles.leaf} ${styles.leaf_1}`}></div>
                        </div>
                        <div className={styles.grow_ans__3s} data-time="3s">
                            <div className={`${styles.leaf} ${styles.leaf_2}`}></div>
                        </div>
                        <div className={styles.grow_ans__3_6s} data-time="3.6s">
                            <div className={`${styles.leaf} ${styles.leaf_3}`}></div>
                        </div>
                    </div>

                    <div className={`${styles.long_g} ${styles.long_g_5}`}>
                        <div className={styles.grow_ans__4s} data-time="4s">
                            <div className={`${styles.leaf} ${styles.leaf_0}`}></div>
                        </div>
                        <div className={styles.grow_ans__4_2s} data-time="4.2s">
                            <div className={`${styles.leaf} ${styles.leaf_1}`}></div>
                        </div>
                        <div className={styles.grow_ans__3s} data-time="3s">
                            <div className={`${styles.leaf} ${styles.leaf_2}`}></div>
                        </div>
                        <div className={styles.grow_ans__3_6s} data-time="3.6s">
                            <div className={`${styles.leaf} ${styles.leaf_3}`}></div>
                        </div>
                    </div>

                    <div className={`${styles.long_g} ${styles.long_g_6}`}>
                        <div className={styles.grow_ans__4_2s} data-time="4.2s">
                            <div className={`${styles.leaf} ${styles.leaf_0}`}></div>
                        </div>
                        <div className={styles.grow_ans__4_4s} data-time="4.4s">
                            <div className={`${styles.leaf} ${styles.leaf_1}`}></div>
                        </div>
                        <div className={styles.grow_ans__4_6s} data-time="4.6s">
                            <div className={`${styles.leaf} ${styles.leaf_2}`}></div>
                        </div>
                        <div className={styles.grow_ans__4_8s} data-time="4.8s">
                            <div className={`${styles.leaf} ${styles.leaf_3}`}></div>
                        </div>
                    </div>

                    <div className={`${styles.long_g} ${styles.long_g_7}`}>
                        <div className={styles.grow_ans__3s} data-time="3s">
                            <div className={`${styles.leaf} ${styles.leaf_0}`}></div>
                        </div>
                        <div className={styles.grow_ans__3_2s} data-time="3.2s">
                            <div className={`${styles.leaf} ${styles.leaf_1}`}></div>
                        </div>
                        <div className={styles.grow_ans__3_5s} data-time="3.5s">
                            <div className={`${styles.leaf} ${styles.leaf_2}`}></div>
                        </div>
                        <div className={styles.grow_ans__3_6s} data-time="3.6s">
                            <div className={`${styles.leaf} ${styles.leaf_3}`}></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cilek;