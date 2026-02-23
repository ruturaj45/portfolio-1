"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import styles from "./Terminal.module.css";

interface Command {
    input: string;
    output: string;
    delay: number;
}

const commands: Command[] = [
    { input: "whoami", output: "Full Stack Web devloper & Cloud Engineer", delay: 800 },
    { input: "location --current", output: "Jajpur, India", delay: 600 },
    { input: "stack --list", output: "Python • TypeScript • React • Node.js ", delay: 800 },
    { input: "focus --areas", output: "Full Stack AI • AWS & Cloud Systems • Production Systems", delay: 700 },
    { input: "interests --verbose", output: "LLMs • RAG Systems • Data Pipelines • Testing Infrastructure", delay: 900 },
    { input: "status --work", output: "Open to opportunities", delay: 600 },
];

interface MarkdownLine {
    prefix?: string;
    content: string;
    type: "heading" | "subheading" | "bullet" | "text" | "status";
}

const markdownContent: MarkdownLine[] = [
    { content: "# Full Stack AI Engineer", type: "heading" },
    { content: "", type: "text" },
    { content: "Building production systems from data pipelines to user-facing applications.", type: "text" },
    { content: "", type: "text" },
    { content: "## Focus Areas", type: "subheading" },
    { content: "- Full Stack AI Engineering", type: "bullet" },
    { content: "- AWS , Cloud Systems", type: "bullet" },
    { content: "- Production Systems", type: "bullet" },
    { content: "", type: "text" },
    { content: "## Location", type: "subheading" },
    { content: "New Delhi, India", type: "text" },
    { content: "", type: "text" },
    { content: "## Tech Stack", type: "subheading" },
    { content: "Python • TypeScript • React • Node.js ", type: "text" },
    { content: "", type: "text" },
    { content: "## Interests", type: "subheading" },
    { content: "LLMs • RAG Systems • Data Pipelines • Testing Infrastructure", type: "text" },
    { content: "", type: "text" },
    { content: "## Status", type: "subheading" },
    { content: "Open to opportunities", type: "text" },
];

interface TerminalProps {
    mode?: "commands" | "markdown";
    onModeChange?: (mode: "commands" | "markdown") => void;
}

export default function Terminal({ mode = "commands", onModeChange }: TerminalProps) {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    
    const [displayedCommands, setDisplayedCommands] = useState<number>(0);
    const [currentTyping, setCurrentTyping] = useState<string>("");
    const [isTyping, setIsTyping] = useState<boolean>(true);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    
    // Markdown mode state
    const [displayedLines, setDisplayedLines] = useState<number>(0);
    const [currentLineContent, setCurrentLineContent] = useState<string>("");
    const [isTypingLine, setIsTypingLine] = useState<boolean>(true);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    const typeCommand = useCallback((command: string, index: number) => {
        let charIndex = 0;
        setIsTyping(true);
        
        const typeInterval = setInterval(() => {
            if (charIndex <= command.length) {
                setCurrentTyping(command.slice(0, charIndex));
                charIndex++;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => {
                    setDisplayedCommands(index + 1);
                    setCurrentTyping("");
                    setIsTyping(false);
                    
                    if (index < commands.length - 1) {
                        setTimeout(() => {
                            typeCommand(commands[index + 1].input, index + 1);
                        }, commands[index].delay);
                    } else {
                        setIsComplete(true);
                    }
                }, 400);
            }
        }, 8);
    }, []);

    const typeMarkdown = useCallback((lineIndex: number, charIndex: number = 0) => {
        if (lineIndex >= markdownContent.length) {
            setIsComplete(true);
            return;
        }

        const line = markdownContent[lineIndex];
        
        if (charIndex === 0) {
            setIsTypingLine(true);
        }

        if (charIndex <= line.content.length) {
            setCurrentLineContent(line.content.slice(0, charIndex));
            setTimeout(() => {
                typeMarkdown(lineIndex, charIndex + 1);
            }, 8);
        } else {
            setDisplayedLines(lineIndex + 1);
            setCurrentLineContent("");
            setIsTypingLine(false);
            setTimeout(() => {
                typeMarkdown(lineIndex + 1, 0);
            }, 30);
        }
    }, []);

    useEffect(() => {
        if (mode === "commands") {
            setDisplayedCommands(0);
            setIsComplete(false);
            setIsTyping(true);
            const timer = setTimeout(() => {
                typeCommand(commands[0].input, 0);
            }, 500);
            return () => clearTimeout(timer);
        } else {
            setDisplayedLines(0);
            setIsComplete(false);
            setIsTypingLine(true);
            setCurrentLineContent("");
            const timer = setTimeout(() => {
                typeMarkdown(0, 0);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [mode, typeCommand, typeMarkdown]);

    const getLineNumber = (index: number): string => {
        return (index + 1).toString().padStart(2, "0");
    };

    const renderMarkdownLine = (line: MarkdownLine, index: number) => {
        const lineNum = getLineNumber(index);
        
        return (
            <div key={index} className={styles.markdownLine}>
                <span className={styles.lineNumber}>{lineNum}</span>
                <span className={`${styles.lineContent} ${styles[line.type]}`}>
                    {line.prefix && <span className={styles.bullet}>{line.prefix}</span>}
                    {line.content}
                </span>
            </div>
        );
    };

    if (!mounted) return null;
    
    const isLight = theme === 'light';
    
    return (
        <div className={`${styles.terminalContainer} ${isLight ? styles.light : ''}`}>
            <div className={styles.terminal}>
                <div className={styles.terminalHeader}>
                    <div className={styles.terminalControls}>
                        <span className={styles.control} />
                        <span className={styles.control} />
                        <span className={styles.control} />
                    </div>
                    <span className={styles.terminalTitle}>
                        {mode === "commands" ? "about.sh" : "about.md"}
                    </span>
                </div>
                
                <div className={styles.terminalBody}>
                    {mode === "commands" ? (
                        <>
                            {commands.slice(0, displayedCommands).map((cmd, index) => (
                                <div key={index} className={styles.commandBlock}>
                                    <div className={styles.commandLine}>
                                        <span className={styles.prompt}>
                                            <span className={styles.promptUser}>vyagh</span>
                                            <span className={styles.promptAt}>@</span>
                                            <span className={styles.promptHost}>portfolio</span>
                                            <span className={styles.promptSymbol}>:~$</span>
                                        </span>
                                        <span className={styles.command}>{cmd.input}</span>
                                    </div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className={styles.output}
                                    >
                                        {cmd.output}
                                    </motion.div>
                                </div>
                            ))}
                            
                            {isTyping && displayedCommands < commands.length && (
                                <div className={styles.commandBlock}>
                                    <div className={styles.commandLine}>
                                        <span className={styles.prompt}>
                                            <span className={styles.promptUser}>ruturaj</span>
                                            <span className={styles.promptAt}>@</span>
                                            <span className={styles.promptHost}>portfolio</span>
                                            <span className={styles.promptSymbol}>:~$</span>
                                        </span>
                                        <span className={styles.command}>{currentTyping}</span>
                                        <span className={styles.cursor} />
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            {markdownContent.slice(0, displayedLines).map((line, index) => 
                                renderMarkdownLine(line, index)
                            )}
                            
                            {isTypingLine && displayedLines < markdownContent.length && (
                                <div className={styles.markdownLine}>
                                    <span className={styles.lineNumber}>{getLineNumber(displayedLines)}</span>
                                    <span className={`${styles.lineContent} ${styles[markdownContent[displayedLines].type]}`}>
                                        {currentLineContent}
                                        <span className={styles.cursor} />
                                    </span>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
