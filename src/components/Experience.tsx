"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import styles from "./Experience.module.css";

interface Experience {
    company: string;
    role: string;
    period: string;
    points: string[];
}

const experiences: Experience[] = [
    {
        company: "Sugarlabs",
        role: "Open Source Contributor",
        period: "Jul 2025 – Present",
        points: [
            "Contributing to GTK3 → GTK4 port of Sugar Toolkit",
            "Refactoring core UI modules",
            "Fixed dependency vulnerabilities",
            "Cleaned up legacy JavaScript in Music Blocks",
        ],
    },
    {
        company: "Ksolves",
        role: "SDE Intern",
        period: "Feb 2025 – Jul 2025",
        points: [
            "RAG pipeline (Langchain + embeddings) ~95% accuracy",
            "Text-to-SQL tool using Transformers",
            "ML pipeline improved forecast accuracy 25%",
            "Apache NiFi + Kafka data flows",
            "Prometheus + Grafana monitoring",
        ],
    },
];

const education = {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "ABES Engineering College, Ghaziabad",
    period: "Jul 2021 — Jul 2025",
};

export default function Experience() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="section" id="experience">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="section-title">Journey</span>
                    <h2>Experience</h2>
                </motion.div>

                <div className={styles.timeline}>
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.company}
                            className={styles.item}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {/* Timeline Node */}
                            <div className={styles.nodeWrapper}>
                                <div className={styles.node} />
                                {index < experiences.length - 1 && (
                                    <div className={styles.connector} />
                                )}
                            </div>
                            
                            {/* Content */}
                            <div className={styles.content}>
                                <div className={styles.header}>
                                    <div className={styles.left}>
                                        <h3 className={styles.company}>{exp.company}</h3>
                                        <p className={styles.role}>{exp.role}</p>
                                    </div>
                                    <div className={styles.right}>
                                        <span className={styles.period}>{exp.period}</span>
                                        <FiChevronDown 
                                            className={`${styles.chevron} ${hoveredIndex === index ? styles.chevronOpen : ''}`} 
                                        />
                                    </div>
                                </div>
                                
                                <AnimatePresence>
                                    {hoveredIndex === index && (
                                        <motion.ul
                                            className={styles.points}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            {exp.points.map((point, i) => (
                                                <li key={i} className={styles.point}>
                                                    {point}
                                                </li>
                                            ))}
                                        </motion.ul>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className={styles.education}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className={styles.eduHeader}>
                        <span className="section-title">Education</span>
                    </div>
                    <div className={styles.eduContent}>
                        <div className={styles.eduMain}>
                            <h3 className={styles.degree}>{education.degree}</h3>
                            <p className={styles.institution}>{education.institution}</p>
                        </div>
                        <span className={styles.period}>{education.period}</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
