"use client";

import { motion } from "framer-motion";
import { FiMail } from "react-icons/fi";
import styles from "./Contact.module.css";

export default function Contact() {
    return (
        <section className="section" id="contact">
            <div className="container">
                <motion.div
                    className={styles.content}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="section-title">Contact</span>
                    <h2>Get in Touch</h2>

                    <a
                        href="mailto:ruturajxbarik@gmail.com"
                        className={styles.emailLink}
                    >
                        <FiMail />
                        ruturajxbarik@gmail.com
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
