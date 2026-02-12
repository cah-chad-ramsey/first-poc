"use client";

import { useEffect, useState } from 'react';
import { getAnalysis, Requirement } from '@/lib/storage';
import RequirementCard from './RequirementCard';
import styles from './RequirementsList.module.css';

export default function RequirementsList() {
    const [requirements, setRequirements] = useState<Requirement[]>([]);

    useEffect(() => {
        const data = getAnalysis();
        if (data) {
            setRequirements(data.requirements);
        }
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Extracted Requirements</h2>
                <div className={styles.actions}>
                    <button className={`btn ${styles.exportBtn}`}>Export CSV</button>
                    <button className="btn btn-primary">Save to Jira</button>
                </div>
            </div>

            <div className={styles.grid}>
                {requirements.map((req) => (
                    // @ts-ignore
                    <RequirementCard key={req.id} req={req} />
                ))}
                {requirements.length === 0 && (
                    <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '2rem' }}>
                        No requirements found. Upload a transcript to begin.
                    </p>
                )}
            </div>
        </div>
    );
}
