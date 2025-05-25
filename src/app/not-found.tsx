'use client';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <>
      <motion.h1
        className="text-6xl font-bold text-red-500"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        404
      </motion.h1>
      <motion.p
        className="mt-4 text-xl text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Lo sentimos, la página que buscas no existe.
      </motion.p>
    </>
  );
}
