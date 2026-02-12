"use client";

import { loadDemoData } from '@/lib/storage';
import styles from './FileUploader.module.css';

export default function DemoBox() {
    const handleDemoClick = () => {
        loadDemoData();
    };

    return (
        <div
            className={`${styles.uploader} ${styles.demoBox}`}
            onClick={handleDemoClick}
            style={{ cursor: 'pointer', borderStyle: 'solid' }}
        >
            <div className={styles.content}>
                <div className={styles.icon}>
                    🚀
                </div>
                <h3 className={styles.title}>
                    See the Demo without upload
                </h3>
                <p className={styles.subtitle}>
                    Click here to view a pre-analyzed meeting transcript
                </p>
            </div>
        </div>
    );
}
