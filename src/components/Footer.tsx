"use client";

import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import styles from "./Footer.module.css";

const socialLinks = [
    { icon: FiGithub, href: "https://github.com/vyagh", label: "GitHub" },
    { icon: FiLinkedin, href: "https://www.linkedin.com/in/shubham-vy", label: "LinkedIn" },
    { icon: FaXTwitter, href: "https://x.com/vyagh_vy", label: "X" },
    { icon: FiMail, href: "mailto:vyagh.vy@gmail.com", label: "Email" },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <div className={styles.socials}>
                    {socialLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialIcon}
                            aria-label={link.label}
                        >
                            <link.icon />
                        </a>
                    ))}
                </div>
                <p className={styles.copyright}>
                    © {currentYear} Vyagh
                </p>
            </div>
        </footer>
    );
}
