import { Requirement } from '@/lib/storage';
import styles from './RequirementCard.module.css';

export default function RequirementCard({ req, level = 0 }: { req: Requirement, level?: number }) {
    const getPriorityColor = (p: string) => {
        switch (p) {
            case 'High': return styles.priorityHigh;
            case 'Medium': return styles.priorityMedium;
            case 'Low': return styles.priorityLow;
            default: return styles.priorityLow;
        }
    };

    const getCategoryStyle = (cat: string) => {
        switch (cat) {
            case 'Epic': return styles.categoryEpic;
            case 'Story': return styles.categoryStory;
            case 'Feature': return styles.categoryFeature;
            default: return '';
        }
    };

    return (
        <div className={`${styles.card} ${level > 0 ? styles.subCard : ''}`} style={{ marginLeft: level * 20 }}>
            <div className={styles.header}>
                <span className={`${styles.category} ${getCategoryStyle(req.category)}`}>{req.category}</span>
                {req.priority !== 'N/A' && (
                    <span className={`${styles.priority} ${getPriorityColor(req.priority)}`}>
                        {req.priority}
                    </span>
                )}
            </div>
            <h3 className={level === 0 ? styles.titleLarge : styles.title}>{req.title}</h3>
            <p className={styles.description}>{req.description}</p>
            <div className={styles.footer}>
                <span className={styles.id}>#{req.id}</span>
                <div className={styles.actions}>
                    <button className={styles.actionBtn}>Edit</button>
                </div>
            </div>

            {req.subItems && req.subItems.length > 0 && (
                <div className={styles.subItems}>
                    {req.subItems.map((subReq) => (
                        <RequirementCard key={subReq.id} req={subReq} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    );
}
