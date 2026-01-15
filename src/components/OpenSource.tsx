"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink, FiGitMerge, FiGitPullRequest, FiX } from "react-icons/fi";
import styles from "./OpenSource.module.css";

interface PullRequest {
    title: string;
    repo: string;
    status: "merged" | "open" | "closed";
    url: string;
}

interface PRStats {
    merged: number;
    open: number;
    closed: number;
}

type Category = "merged" | "open" | "closed";

export default function OpenSource() {
    const [prStats, setPrStats] = useState<PRStats>({ merged: 0, open: 0, closed: 0 });
    const [allPRs, setAllPRs] = useState<{ merged: PullRequest[], open: PullRequest[], closed: PullRequest[] }>({
        merged: [],
        open: [],
        closed: []
    });
    const [organizations, setOrganizations] = useState<string[]>([]);
    const [selectedOrg, setSelectedOrg] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState<Category>("merged");
    const [displayCount, setDisplayCount] = useState<{ merged: number, open: number, closed: number }>({
        merged: 5,
        open: 5,
        closed: 5
    });

    useEffect(() => {
        fetchGitHubPRs();
    }, []);

    const fetchGitHubPRs = async () => {
        try {
            // Query to get accurate all-time counts and recent PRs
            const query = `
                query {
                    user(login: "vyagh") {
                        merged: pullRequests(states: MERGED) {
                            totalCount
                        }
                        open: pullRequests(states: OPEN) {
                            totalCount
                        }
                        closed: pullRequests(states: CLOSED) {
                            totalCount
                        }
                        allPRs: pullRequests(first: 100, orderBy: {field: UPDATED_AT, direction: DESC}) {
                            nodes {
                                title
                                state
                                merged
                                repository {
                                    nameWithOwner
                                }
                                url
                            }
                        }
                    }
                }
            `;

            const response = await fetch('https://api.github.com/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
                },
                body: JSON.stringify({ query }),
            });

            const data = await response.json();
            
            if (data.data?.user) {
                const userData = data.data.user;
                
                // Set accurate all-time counts from totalCount
                setPrStats({
                    merged: userData.merged.totalCount,
                    open: userData.open.totalCount,
                    closed: userData.closed.totalCount,
                });

                // Categorize the fetched PRs for display
                const categorized = {
                    merged: [] as PullRequest[],
                    open: [] as PullRequest[],
                    closed: [] as PullRequest[]
                };

                const orgsSet = new Set<string>();
                const orgStats: { [org: string]: { merged: number, open: number, closed: number } } = {};

                if (userData.allPRs?.nodes) {
                    userData.allPRs.nodes.forEach((pr: any) => {
                        const pullRequest: PullRequest = {
                            title: pr.title,
                            repo: pr.repository.nameWithOwner,
                            status: pr.merged ? 'merged' : pr.state === 'OPEN' ? 'open' : 'closed',
                            url: pr.url,
                        };

                        // Extract organization name
                        const org = pr.repository.nameWithOwner.split('/')[0];
                        
                        // Track PR counts per org
                        if (!orgStats[org]) {
                            orgStats[org] = { merged: 0, open: 0, closed: 0 };
                        }
                        orgStats[org][pullRequest.status]++;

                        if (pr.merged) {
                            categorized.merged.push(pullRequest);
                        } else if (pr.state === 'OPEN') {
                            categorized.open.push(pullRequest);
                        } else {
                            categorized.closed.push(pullRequest);
                        }
                    });

                    // Only include orgs that have:
                    // - At least 1 merged PR, OR
                    // - More than 1 open PR, OR
                    // - More than 1 closed PR
                    Object.entries(orgStats).forEach(([org, stats]) => {
                        if (stats.merged >= 1 || stats.open > 1 || stats.closed > 1) {
                            orgsSet.add(org);
                        }
                    });
                }

                setAllPRs(categorized);
                setOrganizations(Array.from(orgsSet).sort());
            }
        } catch (error) {
            console.error('Error fetching GitHub PRs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = (category: Category) => {
        setDisplayCount(prev => ({
            ...prev,
            [category]: prev[category] + 5
        }));
    };

    const statColors: { label: string, count: number, color: string, category: Category }[] = [
        { label: "Merged", count: prStats.merged, color: "#a855f7", category: "merged" },
        { label: "Open", count: prStats.open, color: "#22c55e", category: "open" },
        { label: "Closed", count: prStats.closed, color: "#ef4444", category: "closed" },
    ];

    // Filter PRs by selected org and active category
    const filteredPRs = selectedOrg 
        ? allPRs[activeCategory].filter(pr => pr.repo.startsWith(selectedOrg + '/'))
        : allPRs[activeCategory];
    
    const displayedPRs = filteredPRs.slice(0, displayCount[activeCategory]);
    const hasMore = displayCount[activeCategory] < filteredPRs.length;

    return (
        <section className={`section ${styles.openSource}`} id="opensource">
            <div className="container">
                <motion.div
                    className={styles.centered}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="section-title">Open Source</span>
                    <h2>Proof of Work</h2>
                </motion.div>

                {/* PR Stats - Clickable */}
                <motion.div
                    className={styles.stats}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {loading ? (
                        <div className={styles.loading}>Loading PR stats...</div>
                    ) : (
                        statColors.map((stat) => (
                            <button
                                key={stat.label}
                                className={`${styles.statItem} ${activeCategory === stat.category ? styles.active : ''}`}
                                onClick={() => setActiveCategory(stat.category)}
                            >
                                <span className={styles.statCount} style={{ color: stat.color }}>
                                    {stat.count}
                                </span>
                                <span className={styles.statLabel}>{stat.label} PRs</span>
                            </button>
                        ))
                    )}
                </motion.div>

                {/* Organization Tags */}
                {!loading && organizations.length > 0 && (
                    <motion.div
                        className={styles.orgTags}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                    >
                        <button
                            className={`${styles.orgTag} ${!selectedOrg ? styles.activeOrg : ''}`}
                            onClick={() => setSelectedOrg(null)}
                        >
                            All
                        </button>
                        {organizations.map((org) => (
                            <button
                                key={org}
                                className={`${styles.orgTag} ${selectedOrg === org ? styles.activeOrg : ''}`}
                                onClick={() => setSelectedOrg(org)}
                            >
                                {org}
                            </button>
                        ))}
                    </motion.div>
                )}

                {/* Recent PRs - Filtered by Category and Org */}
                {!loading && displayedPRs.length > 0 && (
                    <motion.div
                        className={styles.prList}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${activeCategory}-${selectedOrg}`}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {displayedPRs.map((pr, index) => (
                                    <a
                                        key={index}
                                        href={pr.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.prItem}
                                    >
                                        <div className={styles.prIcon}>
                                            {pr.status === "merged" ? <FiGitMerge /> : 
                                             pr.status === "open" ? <FiGitPullRequest /> : <FiX />}
                                        </div>
                                        <div className={styles.prContent}>
                                            <span className={styles.prTitle}>{pr.title}</span>
                                            <span className={styles.prRepo}>{pr.repo}</span>
                                        </div>
                                        <span className={`${styles.prStatus} ${styles[pr.status]}`}>
                                            {pr.status}
                                        </span>
                                    </a>
                                ))}
                            </motion.div>
                        </AnimatePresence>

                        {/* Load More Button */}
                        {hasMore && (
                            <button
                                className={styles.loadMore}
                                onClick={() => handleLoadMore(activeCategory)}
                            >
                                Load More
                            </button>
                        )}
                    </motion.div>
                )}

                {/* GitHub Link */}
                <motion.div
                    className={styles.actions}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <a
                        href="https://github.com/vyagh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.profileBtn}
                    >
                        <FiGithub />
                        View GitHub Profile
                        <FiExternalLink className={styles.externalIcon} />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
