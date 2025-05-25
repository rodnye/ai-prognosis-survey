import { motion } from 'framer-motion';
import notebookWallpaper from '@/assets/images/notebook_wallpaper.webp';

type Props = {
  direction?: number;
  children?: React.ReactNode;
  key?: any;
};

export const NotebookCard = ({ direction = 1, children }: Props) => {
  return (
    <motion.div
      initial={{ x: direction === 1 ? 300 : -300, opacity: 0, scale: 0.8 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      exit={{ x: direction === 1 ? -300 : 300, opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      style={{ backgroundImage: `url(${notebookWallpaper.src})` }}
      className="w-full rounded-2xl bg-cover py-6 pl-20 pr-12"
    >
      {children}
    </motion.div>
  );
};
