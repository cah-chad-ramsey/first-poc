"use client";

import { useEffect, useState } from 'react';
import { getAnalysis } from '@/lib/storage';
import styles from './TranscriptViewer.module.css';

export default function TranscriptViewer() {
    const [transcript, setTranscript] = useState<string>('');

    useEffect(() => {
        const data = getAnalysis();
        if (data) {
            setTranscript(data.transcript);
        }
    }, []);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Transcript</h2>
            <div className={styles.scrollArea}>
                <p className={styles.text} style={{ whiteSpace: 'pre-wrap' }}>
                    {transcript || "No transcript available. Upload a file to see the analysis."}
                </p>
            </div>
        </div>
    );
}
