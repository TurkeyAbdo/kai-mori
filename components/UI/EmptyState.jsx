'use client';
import styles from './EmptyState.module.css';

export default function EmptyState({ title, desc, action, onAction }) {
  return (
    <div className={styles.empty}>
      <div className={styles.inkMark} aria-hidden="true">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="38" stroke="var(--kin)" strokeWidth="0.5" strokeDasharray="4 6" />
          <circle cx="40" cy="40" r="20" stroke="var(--kin-light)" strokeWidth="0.5" opacity="0.5" />
          <path d="M40 20 Q52 30 50 40 Q48 55 40 60 Q32 55 30 40 Q28 30 40 20Z"
            fill="none" stroke="var(--kin)" strokeWidth="0.5" opacity="0.7" />
          <circle cx="40" cy="40" r="3" fill="var(--kin)" opacity="0.4" />
        </svg>
      </div>
      <p className={styles.title}>{title}</p>
      <p className={styles.desc}>{desc}</p>
      {action && (
        <button className={styles.action} onClick={onAction}>
          {action}
          <span className={styles.arrow}>→</span>
        </button>
      )}
    </div>
  );
}
