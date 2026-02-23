"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import { socialLinks } from "@/lib/config";
import styles from "./Hero.module.css";
import Image from "next/image";

const OWNER_KEY = "portfolio_owner";

export default function Hero() {
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        const checkOwnerMode = () => {
            const ownerFlag = localStorage.getItem(OWNER_KEY);
            setIsOwner(ownerFlag === "true");
        };

        checkOwnerMode();
        window.addEventListener("ownerModeChange", checkOwnerMode);
        
        return () => window.removeEventListener("ownerModeChange", checkOwnerMode);
    }, []);

    return (
        <section className={styles.hero} id="hero">
            <div className={`container ${styles.container}`}>
                {/* Profile Image */}
                <motion.div
                    className={styles.imageWrapper}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className={styles.imageContainer}>
                        <Image
                            src="/pfp.png"
                            alt="Ruturaj"
                            fill
                            sizes="(max-width: 480px) 100px, (max-width: 900px) 150px, 280px"
                            className={styles.profileImage}
                            priority
                        />
                        <div className={styles.imageGlow} />
                    </div>
                </motion.div>

                {/* Text Content */}
                <div className={styles.mainContent}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className={styles.headerGroup}
                    >
                        <div className={styles.eyebrow}>
                            <div className={styles.statusBeat}></div>
                            <span className="mono">Available for opportunities</span>
                        </div>
                        <h1 className={`${styles.name} ${isOwner ? styles.ownerMode : ""}`}>
                            Ruturaj Barik
                        </h1>
                        <p className={styles.tagline}>
                            Web devloper & Cloud Engineer
                        </p>
                    </motion.div>

                    <motion.p
                        className={styles.bio}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        I building things that actually work, mostly around Linux, frontend systems, cloud stuff, and scaling ideas without overengineering them. I care about code that's clean, fast, and useful in the real world.
                    </motion.p>

                    <motion.div
                        className={styles.actions}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <a href="#projects" className={styles.primaryBtn}>
                            See my work <FiArrowRight />
                        </a>
                        <div className={styles.socialRow}>
                            {socialLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.iconBtn}
                                    aria-label={link.label}
                                >
                                    <link.icon />
                                </a>
                            ))}
                            <a
                                href="/c:\Users\rutur\Downloads\Ruturaj Resume-1.pdf"
                                download
                                className={styles.iconBtn}
                                aria-label="Download Resume"
                                title="Download Resume"
                            >
                                <FiDownload />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
