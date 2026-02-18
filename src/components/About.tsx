"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Terminal from "./Terminal";
import styles from "./About.module.css";

export default function About() {
    const [mode, setMode] = useState<"commands" | "markdown">("commands");

    return (
        <section className={`section ${styles.about}`} id="about">
            <div className="container">
                <motion.div
                    className={`section-header ${styles.header}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className={styles.headerRow}>
                        <span className="section-title">About</span>
                        <h2>Who I am</h2>
                        <button
                            className={styles.viewToggle}
                            onClick={() => setMode(mode === "commands" ? "markdown" : "commands")}
                            title={mode === "commands" ? "Switch to text view" : "Switch to terminal view"}
                        >
                            {mode === "commands" ? "Text view" : "Terminal view"}
                        </button>
                    </div>
                </motion.div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={mode}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Terminal mode={mode} onModeChange={setMode} />
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
