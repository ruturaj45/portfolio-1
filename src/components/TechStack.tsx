"use client";

import { useMemo } from "react";
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
  SiTailwindcss,
  SiLangchain,
  SiExpress,
  SiScikitlearn,
  SiApachekafka,
  SiPrometheus,
  SiGrafana,
  SiJavascript,
  SiGo,
  SiApache,
  SiAmazonwebservices,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";
import { IconType } from "react-icons";
import styles from "./TechStack.module.css";

interface TechItem {
  id: string;
  name: string;
  icon: IconType;
  category: string;
}

const row1Techs: TechItem[] = [
  { id: "python", name: "Python", icon: SiPython, category: "languages" },
  { id: "nextjs", name: "Next.js", icon: SiNextdotjs, category: "frontend" },
  { id: "AWS", name: "AWS", icon: SiAmazonwebservices, category: "devops" },
  { id: "typescript", name: "TypeScript", icon: SiTypescript, category: "languages" },
  { id: "mongodb", name: "MongoDB", icon: SiMongodb, category: "databases" },
  { id: "react", name: "React", icon: SiReact, category: "frontend" },
  { id: "nodejs", name: "Node.js", icon: SiNodedotjs, category: "backend" },
  { id: "langchain", name: "LangChain", icon: SiLangchain, category: "aiml" },
  { id: "azure", name: "Azure", icon: VscAzure, category: "devops" },
  { id: "javascript", name: "JavaScript", icon: SiJavascript, category: "languages" },
  { id: "postgresql", name: "PostgreSQL", icon: SiPostgresql, category: "databases" },
];

const row2Techs: TechItem[] = [
  { id: "fastapi", name: "FastAPI", icon: SiFastapi, category: "backend" },
  { id: "tailwind", name: "Tailwind", icon: SiTailwindcss, category: "frontend" },
  { id: "kafka", name: "Kafka", icon: SiApachekafka, category: "devops" },
  { id: "golang", name: "Golang", icon: SiGo, category: "languages" },
  { id: "express", name: "Express", icon: SiExpress, category: "backend" },
  { id: "scikitlearn", name: "Scikit-learn", icon: SiScikitlearn, category: "aiml" },
  { id: "prometheus", name: "Prometheus", icon: SiPrometheus, category: "devops" },
  { id: "java", name: "Java", icon: FaJava, category: "languages" },
  { id: "nifi", name: "NiFi", icon: SiApache, category: "devops" },
  { id: "grafana", name: "Grafana", icon: SiGrafana, category: "devops" },
];

interface TechCardProps {
  tech: TechItem;
}

function TechCard({ tech }: TechCardProps) {
  const Icon = tech.icon;
  return (
    <div className={styles.techCard}>
      <div className={styles.iconWrapper}>
        <Icon className={styles.techIcon} />
      </div>
      <span className={styles.techName}>{tech.name}</span>
    </div>
  );
}

export default function TechStack() {
  const row1Duplicated = useMemo(() => [...row1Techs, ...row1Techs, ...row1Techs], []);
  const row2Duplicated = useMemo(() => [...row2Techs, ...row2Techs, ...row2Techs], []);

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

        <div className={styles.scrollWrapper}>
          {/* Row 1 - Scroll Left */}
          <div className={styles.scrollRow}>
            <div className={styles.fadeLeft} />
            <div className={styles.fadeRight} />
            <div className={styles.scrollTrack}>
              {row1Duplicated.map((tech, index) => (
                <TechCard key={`row1-${tech.id}-${index}`} tech={tech} />
              ))}
            </div>
          </div>

          {/* Row 2 - Scroll Right */}
          <div className={styles.scrollRow}>
            <div className={styles.fadeLeft} />
            <div className={styles.fadeRight} />
            <div className={`${styles.scrollTrack} ${styles.reverse}`}>
              {row2Duplicated.map((tech, index) => (
                <TechCard key={`row2-${tech.id}-${index}`} tech={tech} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
