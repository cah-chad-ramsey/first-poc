import TranscriptViewer from '@/components/ui/TranscriptViewer';
import RequirementsList from '@/components/ui/RequirementsList';
import styles from './page.module.css';

export default function Dashboard() {
    return (
        <div className={`container ${styles.dashboard}`}>
            <div className={`${styles.panel} glass-panel`}>
                <TranscriptViewer />
            </div>
            <div className={`${styles.panel} glass-panel`}>
                <RequirementsList />
            </div>
        </div>
    );
}
