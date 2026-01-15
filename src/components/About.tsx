"use client";

import { motion } from "framer-motion";
import { FiMapPin, FiCode } from "react-icons/fi";
import styles from "./About.module.css";

export default function About() {
    return (
        <section className={`section ${styles.about}`} id="about">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="section-title">About</span>
                    <h2>Who I am</h2>
                </motion.div>

                <div className={styles.content}>
                    <motion.div
                        className={styles.bio}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <p>
                            Full Stack AI Engineer building production systems from data pipelines to user-facing applications.
                        </p>
                        <p>
                            Contributing to open source projects with focus on testing infrastructure, feature development, and code quality improvements.
                        </p>
                    </motion.div>

                    <motion.div
                        className={styles.meta}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className={styles.metaItem}>
                            <FiMapPin className={styles.metaIcon} />
                            <div>
                                <span className={styles.metaLabel}>
                                    Location
                                </span>
                                <span className={styles.metaValue}>
                                    New Delhi, India
                                </span>
                            </div>
                        </div>

                        <div className={styles.metaItem}>
                            <FiCode className={styles.metaIcon} />
                            <div>
                                <span className={styles.metaLabel}>Focus</span>
                                <span className={styles.metaValue}>
                                    Full Stack AI Engineering • Open Source
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
