"use client";

import { useState, useEffect } from "react";
import { FiUsers } from "react-icons/fi";
import styles from "./VisitorCounter.module.css";

const STORAGE_KEY = "portfolio_visitors";
const OWNER_KEY = "portfolio_owner";
const VISITOR_ID_KEY = "portfolio_visitor_id";
const COUNT_ADJUSTED_KEY = "portfolio_count_adjusted";

interface VisitorData {
    count: number;
    ips: Record<string, number>;
}

interface VisitorCounterProps {
    className?: string;
}

export default function VisitorCounter({ className }: VisitorCounterProps) {
    const [count, setCount] = useState<number | null>(null);
    const [isOwner, setIsOwner] = useState(false);
    
    // Click tracking for owner toggle
    const [clickCount, setClickCount] = useState(0);
    const [lastClickTime, setLastClickTime] = useState(0);

    // Check if user is owner
    useEffect(() => {
        const ownerFlag = localStorage.getItem(OWNER_KEY);
        if (ownerFlag === "true") {
            setIsOwner(true);
        }
    }, []);

    // Client-side visitor counting
    useEffect(() => {
        if (isOwner) {
            // Show current count without incrementing
            const data = getStoredData();
            setCount(data.count);
            return;
        }

        // Get or create stable visitor ID
        let visitorId = localStorage.getItem(VISITOR_ID_KEY);
        if (!visitorId) {
            visitorId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem(VISITOR_ID_KEY, visitorId);
        }
        
        const data = getStoredData();
        
        // Check if this is a new visit (24 hour TTL)
        const lastVisit = data.ips[visitorId];
        const now = Date.now();
        const TTL = 24 * 60 * 60 * 1000; // 24 hours
        
        if (!lastVisit || now - lastVisit > TTL) {
            // New visit
            data.count++;
            data.ips[visitorId] = now;
            
            // Cleanup old entries (older than 30 days)
            const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
            Object.keys(data.ips).forEach((key) => {
                if (data.ips[key] < thirtyDaysAgo) {
                    delete data.ips[key];
                }
            });
            
            saveStoredData(data);
        }
        
        setCount(data.count);
    }, [isOwner]);

    // Handle counter clicks for owner toggle
    const handleCounterClick = () => {
        const now = Date.now();
        
        // Reset if more than 2 seconds passed
        if (now - lastClickTime > 2000) {
            setClickCount(1);
        } else {
            const newClickCount = clickCount + 1;
            
            if (newClickCount >= 5) {
                // Toggle owner mode
                const newIsOwner = !isOwner;
                localStorage.setItem(OWNER_KEY, newIsOwner.toString());
                setIsOwner(newIsOwner);
                
                // Adjust count for accurate display
                const currentData = getStoredData();
                const currentCount = currentData.count;
                
                if (newIsOwner) {
                    // Entering owner mode - decrease count by 1
                    const alreadyAdjusted = localStorage.getItem(COUNT_ADJUSTED_KEY);
                    if (!alreadyAdjusted && currentCount > 0) {
                        // Decrement the actual stored count
                        currentData.count = currentCount - 1;
                        saveStoredData(currentData);
                        setCount(currentCount - 1);
                        localStorage.setItem(COUNT_ADJUSTED_KEY, "true");
                    }
                } else {
                    // Exiting owner mode - restore count
                    const wasAdjusted = localStorage.getItem(COUNT_ADJUSTED_KEY);
                    if (wasAdjusted) {
                        // Increment the actual stored count
                        currentData.count = currentCount + 1;
                        saveStoredData(currentData);
                        setCount(currentCount + 1);
                        localStorage.removeItem(COUNT_ADJUSTED_KEY);
                    }
                }
                
                // Dispatch custom event for Navbar to detect change
                window.dispatchEvent(new CustomEvent("ownerModeChange"));
                
                setClickCount(0);
            } else {
                setClickCount(newClickCount);
            }
        }
        
        setLastClickTime(now);
    };

    const getStoredData = (): VisitorData => {
        if (typeof window === "undefined") return { count: 0, ips: {} };
        
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
        
        // Initialize with 0
        return { count: 0, ips: {} };
    };

    const saveStoredData = (data: VisitorData) => {
        if (typeof window === "undefined") return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    };

    if (count === null) {
        return null;
    }

    return (
        <div className={styles.counterWrapper}>
            <div 
                className={`${styles.counter} ${className || ""}`}
                onClick={handleCounterClick}
            >
                <FiUsers size={14} />
                <span className={styles.count}>{count.toLocaleString()}</span>
                <span className={styles.label}>views</span>
            </div>
        </div>
    );
}
