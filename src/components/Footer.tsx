"use client";

import { socialLinks } from "@/lib/config";
import styles from "./Footer.module.css";

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
