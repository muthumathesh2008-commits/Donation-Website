import { Suspense } from 'react';
import { DonateForm } from './DonateForm';
import { getPrograms } from '@/lib/data';

type DonatePageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function DonateFormFallback() {
  return (
    <div className="max-w-xl w-full">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="h-2 w-full rounded-full bg-emerald-500" />
        <div className="mt-8 space-y-4">
          <div className="h-8 w-48 rounded bg-slate-200" />
          <div className="h-5 w-full rounded bg-slate-100" />
          <div className="h-14 w-full rounded-2xl bg-slate-100" />
          <div className="grid grid-cols-3 gap-4">
            <div className="h-14 rounded-2xl bg-slate-100" />
            <div className="h-14 rounded-2xl bg-slate-100" />
            <div className="h-14 rounded-2xl bg-slate-100" />
          </div>
          <div className="h-14 w-full rounded-2xl bg-slate-100" />
          <div className="h-14 w-full rounded-2xl bg-emerald-100" />
        </div>
      </div>
    </div>
  );
}

async function DonatePageContent({ searchParams }: DonatePageProps) {
  const resolvedSearchParams = await searchParams;
  const programId =
    typeof resolvedSearchParams.program === 'string'
      ? resolvedSearchParams.program
      : undefined;
  const programs = await getPrograms();

  return <DonateForm programs={programs} initialProgramId={programId} />;
}

export default function DonatePage({
  searchParams,
}: DonatePageProps) {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <Suspense fallback={<DonateFormFallback />}>
        <DonatePageContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
