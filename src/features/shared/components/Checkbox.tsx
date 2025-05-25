import { useRef } from 'react';
import styles from './Checkbox.module.css';
import { id } from 'zod/v4/locales';

type Props = {
  checked?: boolean;
  onChange?: () => void;
  id?: string;
};

export const Checkbox = ({ checked, onChange = () => {}, id }: Props) => {
  const idRef = useRef(
    id || `checkbox-${Math.random().toString(36).substr(2, 9)}`,
  );

  return (
    <div className={styles.checkboxWrapper}>
      <div className={styles.cbx}>
        <input
          type="checkbox"
          id={idRef.current}
          checked={checked}
          onChange={onChange}
        />
        <label htmlFor={idRef.current} />
        <svg fill="none" viewBox="0 0 15 14" height={14} width={15}>
          <path d="M2 8.36364L6.23077 12L13 2" />
        </svg>
      </div>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo-12">
            <feGaussianBlur result="blur" stdDeviation={4} in="SourceGraphic" />
            <feColorMatrix
              result="goo-12"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
              mode="matrix"
              in="blur"
            />
            <feBlend in2="goo-12" in="SourceGraphic" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};
