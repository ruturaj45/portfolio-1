"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiArrowRight } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import styles from "./Hero.module.css";
import Image from "next/image";

const socialLinks = [
    {
        icon: FiGithub,
        href: "https://github.com/vyagh",
        label: "GitHub",
    },
    {
        icon: FiLinkedin,
        href: "https://www.linkedin.com/in/shubham-vy",
        label: "LinkedIn",
    },
    {
        icon: FaXTwitter,
        href: "https://x.com/vyagh_vy",
        label: "X (Twitter)",
    },
    {
        icon: FiMail,
        href: "mailto:vyagh.vy@gmail.com",
        label: "Email",
    },
];

export default function Hero() {
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
                            alt="Vyagh"
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
                        <h1 className={styles.name}>Vyagh</h1>
                        <p className={styles.tagline}>
                            AI Engineer & Open Source Contributor
                        </p>
                    </motion.div>

                    <motion.p
                        className={styles.bio}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        I build AI-powered tools and contribute to open source.
                        Currently focused on RAG systems, ML pipelines, and developer tooling.
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
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
