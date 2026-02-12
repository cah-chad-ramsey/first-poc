import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>✨</span>
          <span className={styles.logoText}>ReqExtractor</span>
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
        </nav>
      </div>
    </header>
  );
}
