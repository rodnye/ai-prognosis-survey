import styles from './TextField.module.css';

interface TextFieldProps {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextField = ({ value, onChange, placeholder }: TextFieldProps) => {
  return (
    <div className={styles.formField}>
      <form>
        <input
          required
          type="text"
          value={value}
          onChange={onChange}
          className={styles.input}
        />
        <span className={styles.placeholder}>{placeholder}</span>
      </form>
    </div>
  );
};
