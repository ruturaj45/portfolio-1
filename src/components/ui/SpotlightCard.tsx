"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import styles from "./SpotlightCard.module.css";

export default function SpotlightCard({
    children,
    className = "",
    spotlightColor = "rgba(139, 92, 246, 0.25)",
}: {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
}) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    function handleMouseMove({
        currentTarget,
        clientX,
        clientY,
    }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={`${styles.card} ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            ref={cardRef}
        >
            <motion.div
                className={styles.spotlight}
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 80%
            )
          `,
                    opacity: isHovered ? 1 : 0,
                }}
            />
            <div className={styles.content}>{children}</div>
        </div>
    );
}
