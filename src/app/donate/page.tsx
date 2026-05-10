import { DonateForm } from './DonateForm';
import { getPrograms } from '@/lib/data';

export default async function DonatePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const programId = typeof resolvedSearchParams.program === 'string' ? resolvedSearchParams.program : undefined;
  const programs = getPrograms();

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <DonateForm programs={programs} initialProgramId={programId} />
    </div>
  );
}
