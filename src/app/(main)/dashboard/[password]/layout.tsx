import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ password: string; survey: string }>;
}>) {
  const { password } = await params;

  if (password !== process.env.PASS) {
    return redirect('/dashboard');
  }

  return children;
}
