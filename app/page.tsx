'use client';
import { useRouter } from 'next/navigation';
import { Routes } from './enums/spacex.enum';

export default function Home() {
  // redirect to launches page
  const router = useRouter();
  return router.replace(Routes.Launches);
}
