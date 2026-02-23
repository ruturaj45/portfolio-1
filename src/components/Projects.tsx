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
    SiDjango,
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
        title: "Ai Trip Planner",
        summary: "Ai travel assistant for personalized trip planning",
        points: [
            "Python + Streamlit frontend",
            "GeminiAPI for LLM + multimodal reasoning",
            "FastAPI + terminal UI",
        ],
        tech: [
            { name: "Python", icon: SiPython },
            { name: "GeminiAPI", icon: SiFastapi },
            { name: "Streamlit", icon: SiStreamlit },
        ],
        github: "https://github.com/ruturaj45/Ai_Trip_Planner",
        live: null,
        status: "dev",
    },
    {
        title: "Smart Fitness Buddy",
        summary: "Your AI-powered fitness companion for personalized workout plans",
        points: [
            "Build with ai agents",
            "Integrates with fitness APIs for real-time data",
            "Granite model , LLM , RAG",
            "~91% test accuracy",
        ],
        tech: [
            { name: "Python", icon: SiPython },
            { name: "IBM Cloud", icon: SiScikitlearn },
        ],
        github: "https://github.com/ruturaj45/Smart_Fitness_Buddy",
        live: null,
        status: null,
    },
    {
        title: "E-Shopify",
        summary: "Web app for managing e-commerce operations",
        points: [
            "fully worked on backend APIs and database design",
            "Generates Deployments + Services",
        
        ],
        tech: [
            { name: "Python", icon: SiPython },
            { name: "Django", icon: SiDjango },
    
        ],
        github: "https://github.com/ruturaj45/Ecommerce-Website",
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
