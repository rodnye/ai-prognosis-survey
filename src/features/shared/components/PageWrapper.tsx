import wallpaper from '@/assets/images/wallpaper.jpg';
import { CookiesProvider } from 'next-client-cookies/server';

type Props = {
  children?: React.ReactNode;
};

export function PageWrapper({ children }: Props) {
  return (
    <CookiesProvider>
      <div
        className="relative flex min-h-screen flex-col items-center justify-center overflow-x-hidden text-gray-800"
        style={{
          backgroundColor: '#000a36',
          backgroundImage: 'url(' + wallpaper.src + ')',
        }}
      >
        {/* Contenido principal */}
        <div className="relative z-20 flex flex-col items-center p-12">
          {children}
        </div>
      </div>
    </CookiesProvider>
  );
}
