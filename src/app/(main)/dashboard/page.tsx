import { cookies } from 'next/headers';

export default async function DashboardPage() {
  const cookiesStore = await cookies();

  if (cookiesStore.get('admin-session')?.value !== process.env.PASS) {
    return;
  }

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex max-w-xl flex-col">
        <h1 className="text-xl font-bold"> Estadísticas de votaciones </h1>
      </div>
    </div>
  );
}
