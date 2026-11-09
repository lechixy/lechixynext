import { useEffect, useRef } from "react";
import styles from "styles/main/New.module.scss";

const starLayers = [
    { count: 190, size: 1, speed: 7, parallax: 0.12, color: [174, 191, 221], opacity: 0.48 },
    { count: 64, size: 1.6, speed: 14, parallax: 0.27, color: [209, 223, 255], opacity: 0.64 },
    { count: 23, size: 2.4, speed: 23, parallax: 0.48, color: [244, 247, 255], opacity: 0.84 },
];

function starTint(color: string, whiteMix = 0) {
    return [1, 3, 5].map(start => {
        const channel = Number.parseInt(color.slice(start, start + 2), 16);
        return channel + (255 - channel) * whiteMix;
    });
}

export default function Starfield({ palette, albumColors }: {
    palette: { primary: string; secondary: string; tertiary: string };
    albumColors: string[] | null;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const homeTint = useRef<number[][] | null>(null);
    const albumTint = useRef<number[][] | null>(null);
    const redrawStatic = useRef<(() => void) | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const scrollContainer = canvas?.parentElement;
        const context = canvas?.getContext("2d");
        if (!canvas || !context || !scrollContainer) return;

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        const presence = scrollContainer.querySelector("#presence");
        const layers = starLayers.map(layer => ({
            ...layer,
            tint: [...layer.color],
            stars: Array.from({ length: layer.count }, () => ({ x: Math.random(), y: Math.random() })),
        }));

        let width = 0;
        let height = 0;
        let elapsed = 0;
        let scroll = scrollContainer.scrollTop;
        let previousFrame: number | undefined;
        let frame = 0;
        let inPresence = false;
        let presenceObserver: IntersectionObserver | undefined;

        const blendColors = (amount: number) => {
            const targets = (inPresence ? albumTint.current : null) ?? homeTint.current;
            layers.forEach((layer, index) => {
                const target = targets?.[index] ?? layer.color;
                for (let channel = 0; channel < 3; channel++) {
                    layer.tint[channel] += (target[channel] - layer.tint[channel]) * amount;
                }
            });
        };

        const draw = () => {
            if (!width || !height) return;

            context.clearRect(0, 0, width, height);
            const density = Math.min(1, Math.max(0.3, width * height / 800_000));

            for (const { stars, count, size, speed, parallax, tint, opacity } of layers) {
                const offset = (elapsed * speed + scroll * parallax) % height;
                const visibleCount = Math.round(count * density);
                context.fillStyle = `rgb(${tint.map(Math.round).join(", ")})`;
                context.globalAlpha = opacity;

                for (let index = 0; index < visibleCount; index++) {
                    const star = stars[index];
                    const y = (star.y * height - offset + height) % height;
                    context.fillRect(star.x * width, y, size, size);
                }
            }
        };

        const updateStaticColors = () => {
            if (!reducedMotion.matches) return;
            blendColors(1);
            draw();
        };
        redrawStatic.current = updateStaticColors;

        const resize = () => {
            ({ width, height } = canvas.getBoundingClientRect());
            const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.round(width * pixelRatio);
            canvas.height = Math.round(height * pixelRatio);
            context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            draw();

            if (presence && typeof IntersectionObserver !== "undefined") {
                presenceObserver?.disconnect();
                const margin = Math.round(scrollContainer.clientHeight * 0.42);
                presenceObserver = new IntersectionObserver(([entry]) => {
                    inPresence = entry.isIntersecting;
                    updateStaticColors();
                }, { root: scrollContainer, rootMargin: `-${margin}px 0px` });
                presenceObserver.observe(presence);
            }
        };

        const animate = (now: number) => {
            const delta = Math.min((now - (previousFrame ?? now)) / 1000, 0.05);
            previousFrame = now;
            elapsed += delta;
            scroll += (scrollContainer.scrollTop - scroll) * (1 - Math.exp(-delta * 14));
            blendColors(1 - Math.exp(-delta * 3.2));
            draw();
            frame = requestAnimationFrame(animate);
        };

        function syncMotion() {
            cancelAnimationFrame(frame);
            previousFrame = undefined;
            if (reducedMotion.matches) updateStaticColors();
            else frame = requestAnimationFrame(animate);
        }

        resize();
        syncMotion();
        window.addEventListener("resize", resize);
        reducedMotion.addEventListener("change", syncMotion);

        return () => {
            cancelAnimationFrame(frame);
            presenceObserver?.disconnect();
            redrawStatic.current = null;
            window.removeEventListener("resize", resize);
            reducedMotion.removeEventListener("change", syncMotion);
        };
    }, []);

    useEffect(() => {
        homeTint.current = [palette.primary, palette.secondary, palette.tertiary].map(color => starTint(color));
        redrawStatic.current?.();
    }, [palette]);

    useEffect(() => {
        albumTint.current = albumColors?.map(color => starTint(color, 0.31)) ?? null;
        redrawStatic.current?.();
    }, [albumColors]);

    return <canvas aria-hidden="true" ref={canvasRef} className={styles.starfield} />;
}
