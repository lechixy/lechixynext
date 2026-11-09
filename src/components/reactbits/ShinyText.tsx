import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'motion/react';

interface ShinyTextProps {
    text: string;
    disabled?: boolean;
    speed?: number;
    className?: string;
    color?: string;
    shineColor?: string;
    spread?: number;
    yoyo?: boolean;
    pauseOnHover?: boolean;
    direction?: 'left' | 'right';
    delay?: number;
    // --- yeni props ---
    glow?: boolean;
    glowIntensity?: string;
    underline?: boolean;
}

const ShinyText: React.FC<ShinyTextProps> = ({
    text,
    disabled = false,
    speed = 2,
    className = '',
    color = '#b5b5b5',
    shineColor = '#ffffff',
    spread = 120,
    yoyo = false,
    pauseOnHover = false,
    direction = 'left',
    delay = 0,
    glow = false,
    glowIntensity = 'var(--glow-intensity, 0.6)',
    underline = false,
}) => {
    const [isPaused, setIsPaused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const progress = useMotionValue(0);
    const elapsedRef = useRef(0);
    const lastTimeRef = useRef<number | null>(null);
    const directionRef = useRef(direction === 'left' ? 1 : -1);

    const animationDuration = speed * 1000;
    const delayDuration = delay * 1000;

    useAnimationFrame(time => {
        if (disabled || isPaused) {
            lastTimeRef.current = null;
            return;
        }
        if (lastTimeRef.current === null) {
            lastTimeRef.current = time;
            return;
        }
        const deltaTime = time - lastTimeRef.current;
        lastTimeRef.current = time;
        elapsedRef.current += deltaTime;

        if (yoyo) {
            const cycleDuration = animationDuration + delayDuration;
            const fullCycle = cycleDuration * 2;
            const cycleTime = elapsedRef.current % fullCycle;
            if (cycleTime < animationDuration) {
                const p = (cycleTime / animationDuration) * 100;
                progress.set(directionRef.current === 1 ? p : 100 - p);
            } else if (cycleTime < cycleDuration) {
                progress.set(directionRef.current === 1 ? 100 : 0);
            } else if (cycleTime < cycleDuration + animationDuration) {
                const reverseTime = cycleTime - cycleDuration;
                const p = 100 - (reverseTime / animationDuration) * 100;
                progress.set(directionRef.current === 1 ? p : 100 - p);
            } else {
                progress.set(directionRef.current === 1 ? 0 : 100);
            }
        } else {
            const cycleDuration = animationDuration + delayDuration;
            const cycleTime = elapsedRef.current % cycleDuration;
            if (cycleTime < animationDuration) {
                const p = (cycleTime / animationDuration) * 100;
                progress.set(directionRef.current === 1 ? p : 100 - p);
            } else {
                progress.set(directionRef.current === 1 ? 100 : 0);
            }
        }
    });

    useEffect(() => {
        directionRef.current = direction === 'left' ? 1 : -1;
        elapsedRef.current = 0;
        progress.set(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [direction]);

    const backgroundPosition = useTransform(progress, p => `${150 - p * 2}% center`);

    const handleMouseEnter = useCallback(() => {
        if (pauseOnHover) setIsPaused(true);
        if (underline) setIsHovered(true);
    }, [pauseOnHover, underline]);

    const handleMouseLeave = useCallback(() => {
        if (pauseOnHover) setIsPaused(false);
        if (underline) setIsHovered(false);
    }, [pauseOnHover, underline]);

    const gradientStyle: React.CSSProperties = {
        backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    };

    const underlineStyle: React.CSSProperties = {
        position: 'absolute',
        bottom: '1px',
        left: 0,
        width: '100%',
        height: '1px',
        backgroundImage: `linear-gradient(to right, ${color} 30%, ${shineColor} 50%, ${color} 70%)`,
        backgroundSize: '200% 100%',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.2s',
        pointerEvents: 'none',
    };

    return (
        <span
            style={{ position: 'relative', display: 'inline-block' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Ana text */}
            <motion.span
                className={`inline-block ${className}`}
                style={{ ...gradientStyle, backgroundPosition }}
            >
                {text}
            </motion.span>

            {/* Glow katmanı — aynı gradient, blur ile arkaya alınmış */}
            {glow && (
                <motion.span
                    aria-hidden="true"
                    className={`inline-block ${className}`}
                    style={{
                        ...gradientStyle,
                        backgroundPosition,
                        position: 'absolute',
                        inset: 0,
                        filter: `blur(6px)`,
                        opacity: glowIntensity as unknown as number,
                        pointerEvents: 'none',
                    }}
                >
                    {text}
                </motion.span>
            )}

            {/* Underline katmanı — aynı backgroundPosition senkronize */}
            {underline && (
                <motion.span
                    aria-hidden="true"
                    style={{
                        ...underlineStyle,
                        backgroundPosition,
                    }}
                />
            )}
        </span>
    );
};

export default ShinyText;