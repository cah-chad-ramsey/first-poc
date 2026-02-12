import styles from './RequirementCard.module.css';

interface RequirementProps {
    id: string;
    title: string;
    description: string;
    category: 'Functional' | 'Non-Functional' | 'Constraint' | 'Action Item';
    priority: 'High' | 'Medium' | 'Low';
}

export default function RequirementCard({ req }: { req: RequirementProps }) {
    const getPriorityColor = (p: string) => {
        switch (p) {
            case 'High': return styles.priorityHigh;
            case 'Medium': return styles.priorityMedium;
            case 'Low': return styles.priorityLow;
            default: return styles.priorityLow;
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span className={styles.category}>{req.category}</span>
                <span className={`${styles.priority} ${getPriorityColor(req.priority)}`}>
                    {req.priority}
                </span>
            </div>
            <h3 className={styles.title}>{req.title}</h3>
            <p className={styles.description}>{req.description}</p>
            <div className={styles.footer}>
                <span className={styles.id}>#{req.id}</span>
                <button className={styles.actionBtn}>Edit</button>
            </div>
        </div>
    );
}
