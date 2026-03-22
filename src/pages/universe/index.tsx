/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import styles from './Universe.module.scss';
import Galaxy from './Galaxy';
import { motion, Transition } from 'motion/react';

type BlurTextProps = {
    text?: string;
    delay?: number;
    holdAfterEnterMs?: number;
    className?: string;
    animateBy?: 'words' | 'letters';
    direction?: 'top' | 'bottom';
    threshold?: number;
    rootMargin?: string;
    animationFrom?: Record<string, string | number>;
    animationTo?: Array<Record<string, string | number>>;
    easing?: (t: number) => number;
    onAnimationComplete?: () => void;
    onAnimationStart?: () => void;
    stepDuration?: number;
};

const BlurText: React.FC<BlurTextProps> = ({
    text = '',
    delay = 200,
    holdAfterEnterMs = 1000,
    className = '',
    animateBy = 'words',
    direction = 'top',
    threshold = 0.1,
    rootMargin = '0px',
    animationFrom,
    animationTo,
    easing = (t: number) => t,
    onAnimationComplete,
    onAnimationStart,
    stepDuration = 0.35
}) => {
    const elements = animateBy === 'words' ? text.split(' ') : text.split('');
    const [inView, setInView] = useState(false);
    const [phase, setPhase] = useState<'enter' | 'exit'>('enter');
    const ref = useRef<HTMLParagraphElement>(null);
    const exitStartTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(ref.current as Element);
                }
            },
            { threshold, rootMargin }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    const defaultFrom = useMemo(
        () =>
            direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -50 } : { filter: 'blur(10px)', opacity: 0, y: 50 },
        [direction]
    );

    const defaultTo = useMemo(
        () => [
            {
                filter: 'blur(5px)',
                opacity: 0.5,
                y: direction === 'top' ? 5 : -5
            },
            { filter: 'blur(0px)', opacity: 1, y: 0 }
        ],
        [direction]
    );

    const fromSnapshot = animationFrom ?? defaultFrom;
    const toSnapshots = animationTo ?? defaultTo;
    const visibleSnapshot = toSnapshots[toSnapshots.length - 1] ?? { filter: 'blur(0px)', opacity: 1, y: 0 };

    const exitSnapshot = useMemo(
        () =>
            direction === 'top'
                ? { filter: 'blur(10px)', opacity: 0, y: -20 }
                : { filter: 'blur(10px)', opacity: 0, y: 20 },
        [direction]
    );

    useEffect(() => {
        setPhase('enter');

        if (exitStartTimeoutRef.current) {
            clearTimeout(exitStartTimeoutRef.current);
            exitStartTimeoutRef.current = null;
        }
    }, [text]);

    useEffect(() => {
        return () => {
            if (exitStartTimeoutRef.current) {
                clearTimeout(exitStartTimeoutRef.current);
            }
        };
    }, []);

    return (
        <p ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap', textAlign: 'center', justifyContent: 'center' }}>
            {elements.map((segment, index) => {
                const isEntering = phase === 'enter';
                const targetSnapshot = isEntering ? visibleSnapshot : exitSnapshot;
                const staggerDelaySeconds = isEntering ? (index * delay) / 1000 : 0;

                const spanTransition: Transition = {
                    duration: stepDuration,
                    delay: staggerDelaySeconds,
                    ease: easing
                };

                return (
                    <motion.span
                        key={index}
                        initial={fromSnapshot}
                        animate={inView ? targetSnapshot : fromSnapshot}
                        transition={spanTransition}
                        onAnimationComplete={
                            index === elements.length - 1
                                ? () => {
                                    if (phase === 'enter') {
                                        exitStartTimeoutRef.current = setTimeout(() => {
                                            setPhase('exit');
                                            exitStartTimeoutRef.current = null;
                                        }, holdAfterEnterMs);
                                        return;
                                    }
                                    onAnimationComplete?.();
                                }
                                : undefined
                        }
                        onAnimationStart={index === 0 && phase === 'enter' ? onAnimationStart : undefined}
                        style={{
                            display: 'inline-block',
                            willChange: 'transform, filter, opacity'
                        }}
                    >
                        {segment === ' ' ? '\u00A0' : segment}
                        {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
                    </motion.span>
                );
            })}
        </p>
    );
};

const texts = [
    `“İstikbal göklerdedir.”— Mustafa Kemal Atatürk`,
    `“Two possibilities exist: either we are alone in the Universe or we are not. Both are equally terrifying.”— Arthur C. Clarke`,
    `“There's as many atoms in a single molecule of your DNA as there are stars in the typical galaxy. We are, each of us, a little universe.”— Neil deGrasse Tyson`,
    `“The universe is under no obligation to make sense to you.”― Neil deGrasse Tyson`,
    `“Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.”― Albert Einstein`,
    `“The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself.”― Carl Sagan`,
]

const WORD_DELAY_MS = 400;
const STEP_DURATION_S = 1;
const HOLD_AFTER_ENTER_MS = 1000;
const REMOUNT_DELAY_MS = 300;

/**
 * Universe Page Component
 */
const Universe: NextPage = () => {

    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isTextMounted, setIsTextMounted] = useState(true);
    const [textRenderKey, setTextRenderKey] = useState(0);
    const remountTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        window.navigator.mediaSession.metadata = new window.MediaMetadata({
            title: 'Old Doll - Soft',
            artist: 'Old Doll',
            album: 'Soft',
            artwork: [
                { src: '/images/old_doll_soft.jpg', sizes: '720x720', type: 'image/jpeg' }
            ]
        });

        const audio = document.querySelector('audio') as HTMLAudioElement | null;
        if (audio) {
            audio.volume = 0.1;
            // lay() failed because the user didn't interact with the document first. To fix this, add a user interaction event listener and play the audio in response to a user gesture.
            const handleUserInteraction = () => {
                audio.play().catch((err) => {
                    console.warn('Autoplay failed:', err);
                });
                window.removeEventListener('click', handleUserInteraction);
                window.removeEventListener('touchstart', handleUserInteraction);
            };
            window.addEventListener('click', handleUserInteraction);
            window.addEventListener('touchstart', handleUserInteraction);

            audio.addEventListener('play', () => {
                window.navigator.mediaSession.playbackState = 'playing';
            });

            audio.addEventListener('pause', () => {
                window.navigator.mediaSession.playbackState = 'paused';
            });
        }

        return () => {
            if (remountTimeoutRef.current) {
                clearTimeout(remountTimeoutRef.current);
            }

            if (audio) {
                audio.pause();
                audio.currentTime = 0;

                audio.removeEventListener('play', () => {
                    window.navigator.mediaSession.playbackState = 'playing';
                });

                audio.removeEventListener('pause', () => {
                    window.navigator.mediaSession.playbackState = 'paused';
                });
            }
        };
    }, []);

    const handleAnimationComplete = () => {
        if (remountTimeoutRef.current) {
            return;
        }

        setIsTextMounted(false);

        remountTimeoutRef.current = setTimeout(() => {
            setCurrentTextIndex(prev => (prev + 1) % texts.length);
            setTextRenderKey(prev => prev + 1);
            setIsTextMounted(true);
            remountTimeoutRef.current = null;
        }, REMOUNT_DELAY_MS);
    };

    return (
        <>
            <Head>
                <title>lechixy's website | universe</title>
            </Head>
            <div className={styles.main}>
                <Galaxy
                    mouseRepulsion
                    mouseInteraction
                    density={1}
                    glowIntensity={0.3}
                    saturation={0}
                    hueShift={140}
                    twinkleIntensity={0.3}
                    rotationSpeed={0.1}
                    repulsionStrength={2}
                    autoCenterRepulsion={0}
                    starSpeed={0.5}
                    speed={1}
                />
                <div className={styles.quoteContainer}>
                    <div className={styles.quote}>
                        {isTextMounted && (
                            <BlurText
                                key={`${textRenderKey}-${currentTextIndex}`}
                                text={texts[currentTextIndex]}
                                delay={WORD_DELAY_MS}
                                holdAfterEnterMs={HOLD_AFTER_ENTER_MS}
                                animateBy="words"
                                direction="bottom"
                                animationFrom={{ filter: 'blur(10px)', opacity: 0, y: 40 }}
                                stepDuration={STEP_DURATION_S}
                                onAnimationComplete={handleAnimationComplete}
                                className={styles.blurText}
                            />
                        )}
                    </div>
                </div>
                <div className={styles.musicContainer}>
                    <audio controls loop>
                        <source src="/sounds/old_doll_soft.webm" type="audio/webm" />
                        Your browser does not support the audio element.
                    </audio>
                    {/* <div className={styles.musicInfo}>
                        <p>Old Doll - Soft</p>
                    </div>
                    <div className={styles.play}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                    <div className={styles.volume}>
                        <input type="range" min="0" max="1" step="0.01" onChange={(e) => {
                            const audio = document.querySelector('audio') as HTMLAudioElement | null;
                            if (audio) {
                                audio.volume = parseFloat(e.target.value);
                            }
                        }} />
                    </div> */}
                </div>
            </div>
        </>
    );
}

export default Universe;