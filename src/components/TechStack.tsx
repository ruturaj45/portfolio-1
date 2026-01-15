"use client";

import { motion } from "framer-motion";
import {
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiNodedotjs,
    SiMongodb,
    SiPostgresql,
    SiPython,
    SiFastapi,
    SiDocker,
    SiGit,
    SiVercel,
    SiTailwindcss,
    SiOpenai,
    SiLangchain,
    SiExpress,
    SiRedis,
    SiFirebase,
    SiKubernetes,
    SiJavascript,
    SiHtml5,
    SiCss3,
    SiPytorch,
    SiNumpy,
    SiPandas,
    SiFlask,
    SiGithubactions,
    SiLinux,
    SiGo,
    SiApachekafka,
    SiApache,
    SiPrometheus,
    SiGrafana,
    SiStreamlit,
    SiScikitlearn,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";
import { IconType } from "react-icons";
import styles from "./TechStack.module.css";

interface Tech {
    name: string;
    icon: IconType;
    color: string;
}

interface Domain {
    name: string;
    techs: Tech[];
}

const techDomains: Domain[] = [
    {
        name: "Languages",
        techs: [
            { name: "Python", icon: SiPython, color: "#3776AB" },
            { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
            { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
            { name: "Golang", icon: SiGo, color: "#00ADD8" },
            { name: "Java", icon: FaJava, color: "#007396" },
        ],
    },
    {
        name: "Frontend",
        techs: [
            { name: "React", icon: SiReact, color: "#61DAFB" },
            { name: "Next.js", icon: SiNextdotjs, color: "var(--text-primary)" },
            { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
            { name: "CSS3", icon: SiCss3, color: "#1572B6" },
            { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
        ],
    },
    {
        name: "Backend",
        techs: [
            { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
            { name: "Express", icon: SiExpress, color: "var(--text-primary)" },
            { name: "FastAPI", icon: SiFastapi, color: "#009688" },
            { name: "Flask", icon: SiFlask, color: "var(--text-primary)" },
        ],
    },
    {
        name: "Databases",
        techs: [
            { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
            { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
            { name: "Redis", icon: SiRedis, color: "#DC382D" },
            { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
        ],
    },
    {
        name: "AI/ML",
        techs: [
            { name: "LangChain", icon: SiLangchain, color: "#1C3C3C" },
            { name: "OpenAI", icon: SiOpenai, color: "var(--text-primary)" },
            { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
            { name: "Scikit-learn", icon: SiScikitlearn, color: "#F7931E" },
            { name: "Streamlit", icon: SiStreamlit, color: "#FF4B4B" },
            { name: "NumPy", icon: SiNumpy, color: "#013243" },
            { name: "Pandas", icon: SiPandas, color: "#150458" },
        ],
    },
    {
        name: "DevOps & Tools",
        techs: [
            { name: "Docker", icon: SiDocker, color: "#2496ED" },
            { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
            { name: "Azure", icon: VscAzure, color: "#0078D4" },
            { name: "Git", icon: SiGit, color: "#F05032" },
            { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
            { name: "Kafka", icon: SiApachekafka, color: "#231F20" },
            { name: "NiFi", icon: SiApache, color: "#728E9B" },
            { name: "Prometheus", icon: SiPrometheus, color: "#E6522C" },
            { name: "Grafana", icon: SiGrafana, color: "#F46800" },
            { name: "Vercel", icon: SiVercel, color: "var(--text-primary)" },
            { name: "Linux", icon: SiLinux, color: "var(--text-primary)" },
        ],
    },
];

export default function TechStack() {
    return (
        <section className="section" id="skills">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="section-title">Tools & Technologies</span>
                    <h2>
                        <span className={styles.serifWord}>Stack</span> I work with
                    </h2>
                </motion.div>

                <div className={styles.domainGrid}>
                    {techDomains.map((domain, domainIndex) => (
                        <motion.div
                            key={domain.name}
                            className={styles.domainCard}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: domainIndex * 0.1 }}
                        >
                            <div className={styles.domainHeader}>
                                <span className={styles.domainName}>{domain.name}</span>
                                <span className={styles.domainCount}>{domain.techs.length}</span>
                            </div>
                            <div className={styles.techGrid}>
                                {domain.techs.map((tech) => (
                                    <div key={tech.name} className={styles.techItem}>
                                        <tech.icon 
                                            className={styles.techIcon} 
                                            style={{ color: tech.color }} 
                                        />
                                        <span className={styles.techName}>{tech.name}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
