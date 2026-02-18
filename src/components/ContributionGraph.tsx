"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./ContributionGraph.module.css";

interface ContributionDay {
    date: string;
    contributionCount: number;
    color: string;
}

interface ContributionWeek {
    contributionDays: ContributionDay[];
}

interface ContributionData {
    weeks: ContributionWeek[];
    totalContributions: number;
}

export default function ContributionGraph() {
    const [data, setData] = useState<ContributionData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContributions = async () => {
            const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
            if (!token) {
                setLoading(false);
                return;
            }

            const query = `
                query {
                    user(login: "vyagh") {
                        contributionsCollection {
                            contributionCalendar {
                                totalContributions
                                weeks {
                                    contributionDays {
                                        date
                                        contributionCount
                                        color
                                    }
                                }
                            }
                        }
                    }
                }
            `;

            try {
                const response = await fetch("https://api.github.com/graphql", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ query }),
                });

                const result = await response.json();
                
                if (result.data?.user?.contributionsCollection?.contributionCalendar) {
                    const calendar = result.data.user.contributionsCollection.contributionCalendar;
                    // Get last 26 weeks (6 months)
                    const recentWeeks = calendar.weeks.slice(-26);
                    setData({
                        weeks: recentWeeks,
                        totalContributions: calendar.totalContributions,
                    });
                }
            } catch (error) {
                console.error("Failed to fetch contributions:", error);
                console.error("GitHub API Error - Token may be invalid or expired. Check NEXT_PUBLIC_GITHUB_TOKEN environment variable.");
            } finally {
                setLoading(false);
            }
        };

        fetchContributions();
    }, []);

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className={styles.loadingBar} />
            </div>
        );
    }

    if (!data) {
        return null;
    }

    const getIntensity = (count: number): number => {
        if (count === 0) return 0;
        if (count <= 3) return 1;
        if (count <= 6) return 2;
        if (count <= 9) return 3;
        return 4;
    };

    const intensityColors = [
        "var(--heatmap-0)",
        "var(--heatmap-1)",
        "var(--heatmap-2)",
        "var(--heatmap-3)",
        "var(--heatmap-4)",
    ];

    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className={styles.header}>
                <span className={styles.label}>Contribution activity</span>
                <span className={styles.total}>
                    {data.totalContributions.toLocaleString()} contributions in the last year
                </span>
            </div>

            <div className={styles.graph}>
                <div className={styles.weeks}>
                    {data.weeks.map((week, weekIndex) => (
                        <div key={weekIndex} className={styles.week}>
                            {week.contributionDays.map((day, dayIndex) => {
                                const intensity = getIntensity(day.contributionCount);
                                return (
                                    <motion.div
                                        key={`${weekIndex}-${dayIndex}`}
                                        className={styles.day}
                                        style={{
                                            backgroundColor: intensityColors[intensity],
                                        }}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: weekIndex * 0.02 + dayIndex * 0.005,
                                        }}
                                        title={`${day.date}: ${day.contributionCount} contributions`}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>

                <div className={styles.legend}>
                    <span className={styles.legendLabel}>Less</span>
                    {intensityColors.map((color, i) => (
                        <div
                            key={i}
                            className={styles.legendDay}
                            style={{ backgroundColor: color }}
                        />
                    ))}
                    <span className={styles.legendLabel}>More</span>
                </div>
            </div>
        </motion.div>
    );
}
