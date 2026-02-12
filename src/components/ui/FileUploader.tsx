"use client";

import { useState, useRef } from 'react';
import styles from './FileUploader.module.css';

export default function FileUploader() {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const uploadFile = async (fileToUpload: File) => {
        try {
            setFile(fileToUpload);
            setIsDragging(false);

            const formData = new FormData();
            formData.append('file', fileToUpload);

            // In a real app, show loading state here
            console.log("Uploading...", fileToUpload.name);

            // Dynamic URL based on current hostname
            const backendUrl = `http://${window.location.hostname}:8080/api/analyze`;

            const response = await fetch(backendUrl, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Analysis complete:", data);

                // Store result for dashboard
                const { storeAnalysis } = await import('@/lib/storage');
                storeAnalysis(data);

                window.location.href = '/dashboard';
            } else {
                console.error("Upload failed");
                alert("Upload failed. Please try again.");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Error uploading file.");
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const droppedFile = e.dataTransfer.files[0];
            uploadFile(droppedFile);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            uploadFile(e.target.files[0]);
        }
    };

    return (
        <div
            className={`${styles.uploader} ${isDragging ? styles.dragging : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
        >
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className={styles.hiddenInput}
                accept=".txt,.md,.pdf,audio/*"
            />

            <div className={styles.content}>
                <div className={styles.icon}>
                    {file ? '📄' : '☁️'}
                </div>
                <h3 className={styles.title}>
                    {file ? file.name : 'Upload Meeting Transcript'}
                </h3>
                <p className={styles.subtitle}>
                    {file
                        ? 'Analyzing...'
                        : 'Drag & drop or click to browse'}
                </p>
            </div>
        </div>
    );
}
