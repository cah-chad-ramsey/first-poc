import FileUploader from '@/components/ui/FileUploader';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.title}>
          Transform Meetings into <span className={styles.highlight}>IT Requirements</span>
        </h1>
        <p className={styles.description}>
          Upload your meeting transcripts and let AI extract structured requirements instantly.
        </p>
      </section>

      <div className={styles.uploadContainer}>
        <FileUploader />
      </div>
    </div>
  );
}
