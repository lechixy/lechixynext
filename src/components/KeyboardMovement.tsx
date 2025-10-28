import React, { useState, useEffect, useRef } from 'react';
import HomeStyles from 'styles/main/Home.module.scss';

/*
 ! This page is created by ChatGPT 5
*/

interface Position {
    x: number;
    y: number;
}

interface KeyboardMovementContainerProps {
    children: React.ReactNode;
    moveDistance?: number;
    returnDelay?: number;
    diagonalFactor?: number;
    transitionDuration?: number;
    className?: string;
    style?: React.CSSProperties;
    onPositionChange?: (position: Position) => void;
    onKeysChange?: (keys: Set<string>) => void;
}

const KeyboardMovementContainer: React.FC<KeyboardMovementContainerProps> = ({
    children,
    moveDistance = 50,
    returnDelay = 100,
    diagonalFactor = 0.7,
    transitionDuration = 140,
    className = "",
    style = {},
    onPositionChange = () => { },
    onKeysChange = () => { }
}) => {
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
    const returnTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent): void => {
            const key = event.key;
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
                event.preventDefault();
                setPressedKeys(prev => new Set([...Array.from(prev), key]));
            }
        };

        const handleKeyUp = (event: KeyboardEvent): void => {
            const key = event.key;
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
                setPressedKeys(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(key);
                    return newSet;
                });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useEffect(() => {
        if (pressedKeys.size === 0) {
            if (returnTimeoutRef.current) {
                clearTimeout(returnTimeoutRef.current);
            }

            returnTimeoutRef.current = setTimeout(() => {
                const newPos: Position = { x: 0, y: 0 };
                setPosition(newPos);
                onPositionChange(newPos);
            }, returnDelay);

            return;
        }

        if (returnTimeoutRef.current) {
            clearTimeout(returnTimeoutRef.current);
            returnTimeoutRef.current = null;
        }

        let deltaX = 0;
        let deltaY = 0;

        if (pressedKeys.has('ArrowUp')) deltaY -= moveDistance;
        if (pressedKeys.has('ArrowDown')) deltaY += moveDistance;
        if (pressedKeys.has('ArrowLeft')) deltaX -= moveDistance;
        if (pressedKeys.has('ArrowRight')) deltaX += moveDistance;

        // Çapraz hareket için normalize et
        if (Math.abs(deltaX) > 0 && Math.abs(deltaY) > 0) {
            deltaX *= diagonalFactor;
            deltaY *= diagonalFactor;
        }

        const newPos: Position = { x: deltaX, y: deltaY };
        setPosition(newPos);
        onPositionChange(newPos);

    }, [pressedKeys, moveDistance, returnDelay, diagonalFactor]);

    useEffect(() => {
        onKeysChange(pressedKeys);
    }, [pressedKeys]);

    // Cleanup
    useEffect(() => {
        return () => {
            if (returnTimeoutRef.current) {
                clearTimeout(returnTimeoutRef.current);
            }
        };
    }, []);

    return (
        <div
            className={`${HomeStyles.container} ${className}`}
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                transitionDuration: `${transitionDuration}ms`,
                ...style
            }}
        >
            {children}
        </div>
    );
};

export default KeyboardMovementContainer;
export type { KeyboardMovementContainerProps, Position };