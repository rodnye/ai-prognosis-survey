'use client';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  withRow?: boolean;
  to?: string;
}

export const Button = ({
  children,
  onClick,
  disabled,
  withRow,
  to: to,
}: ButtonProps) => {
  const handleClick = () => {
    if (to) {
      window.location.href = to;
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button className={styles.cta} onClick={handleClick} disabled={disabled}>
      <div className="flex items-center">
        <span>{children}</span>
        {withRow && (
          <svg
            width="15px"
            className={`animate-bounce ${disabled && 'opacity-0'}`}
            height="10px"
            viewBox="0 0 13 10"
          >
            <path d="M1,5 L11,5"></path>
            <polyline points="8 1 12 5 8 9"></polyline>
          </svg>
        )}
      </div>
    </button>
  );
};
