"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiArrowUpRight } from "react-icons/fi";
import {
    SiPython,
    SiScikitlearn,
    SiGo,
    SiKubernetes,
    SiDocker,
    SiFastapi,
    SiJavascript,
    SiStreamlit,
} from "react-icons/si";
import styles from "./Projects.module.css";
import SpotlightCard from "./ui/SpotlightCard";

interface Project {
    title: string;
    summary: string;
    points: string[];
    tech: { name: string; icon: React.ComponentType<{ className?: string }> }[];
    github: string;
    live: string | null;
    status: string | null;
}

const projects: Project[] = [
    {
        title: "Recall",
        summary: "Offline RAG notes search app",
        points: [
            "FAISS + MiniLM embeddings",
            "Ollama via LangChain",
            "FastAPI + terminal UI",
        ],
        tech: [
            { name: "Python", icon: SiPython },
            { name: "FastAPI", icon: SiFastapi },
            { name: "JavaScript", icon: SiJavascript },
        ],
        github: "https://github.com/vyagh/Recall",
        live: null,
        status: "dev",
    },
    {
        title: "TrackType",
        summary: "Music genre classifier",
        points: [
            "10 genres on GTZAN dataset",
            "57 Librosa features",
            "XGBoost + majority voting",
            "~91% test accuracy",
        ],
        tech: [
            { name: "Python", icon: SiPython },
            { name: "Scikit-learn", icon: SiScikitlearn },
            { name: "Streamlit", icon: SiStreamlit },
        ],
        github: "https://github.com/vyagh/TrackType",
        live: null,
        status: null,
    },
    {
        title: "Kubefy",
        summary: "Dockerfile → K8s manifests CLI",
        points: [
            "Custom AST parser",
            "Generates Deployments + Services",
            "Single binary, no deps",
        ],
        tech: [
            { name: "Go", icon: SiGo },
            { name: "Kubernetes", icon: SiKubernetes },
            { name: "Docker", icon: SiDocker },
        ],
        github: "https://github.com/vyagh/Kubefy",
        live: null,
        status: null,
    },
];

export default function Projects() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="section" id="projects">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="section-title">Projects</span>
                    <h2>Selected Work</h2>
                </motion.div>

                <div className={styles.horizontalScroll}>
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={styles.cardWrapper}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <SpotlightCard className={styles.projectCard}>
                                <div className={styles.cardContent}>
                                    <div className={styles.cardTop}>
                                        <div className={styles.titleRow}>
                                            <h3 className={styles.title}>
                                                {project.title}
                                            </h3>
                                            {project.status && (
                                                <span className={`${styles.statusBadge} ${styles.statusDev}`}>
                                                    <span className={styles.statusDot}></span>
                                                    Dev
                                                </span>
                                            )}
                                        </div>
                                        <div className={styles.links}>
                                            {project.github && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={styles.iconLink}
                                                    aria-label="GitHub"
                                                >
                                                    <FiGithub />
                                                </a>
                                            )}
                                            {project.live && (
                                                <a
                                                    href={project.live}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={styles.iconLink}
                                                    aria-label="Live Demo"
                                                >
                                                    <FiArrowUpRight />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <div className={styles.summary}>
                                        {hoveredIndex === index ? (
                                            <ul className={styles.points}>
                                                {project.points.map((point, i) => (
                                                    <li key={i}>{point}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <span>{project.summary}</span>
                                        )}
                                    </div>

                                    <div className={styles.techWrapper}>
                                        {project.tech.map((t) => (
                                            <div key={t.name} className={styles.techItem}>
                                                <t.icon className={styles.techIcon} />
                                                <span className="mono">{t.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
