import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Target, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import { mockPrograms } from '@/lib/data';

export default async function ProgramDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const program = mockPrograms.find((p) => p.id === resolvedParams.id);

  if (!program) {
    notFound();
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Image Section */}
      <div className="relative h-[40vh] min-h-[400px] w-full">
        <Image
          src={program.imagePlaceholder}
          alt={program.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <Link 
              href="/programs" 
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Programs
            </Link>
            <div className="inline-block px-3 py-1 bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4">
              {program.category}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl">
              {program.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Main Content Area */}
          <div className="w-full lg:w-2/3 space-y-12">
            <section>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                {program.longDescription}
              </p>
            </section>
            
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Clear Goals</h3>
                <p className="text-sm text-slate-600">Every dollar is tracked and allocated to specific project milestones.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Local Teams</h3>
                <p className="text-sm text-slate-600">We partner with local leaders to ensure sustainable, long-term impact.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Measurable ROI</h3>
                <p className="text-sm text-slate-600">We measure success by lives changed, not just dollars spent.</p>
              </div>
            </section>
          </div>

          {/* Sticky Donation Sidebar */}
          <div className="w-full lg:w-1/3 sticky top-28">
            <Card className="border-emerald-100 shadow-lg relative overflow-visible">
              {/* Top Accent */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-emerald-500 rounded-t-3xl" />
              
              <CardContent className="p-8 pt-10">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Support This Cause</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <div>
                        <span className="text-3xl font-bold text-emerald-600">${program.raisedAmount.toLocaleString()}</span>
                        <span className="text-slate-500 ml-2">raised</span>
                      </div>
                      <div className="text-right text-sm text-slate-500 font-medium">
                        of ${program.goalAmount.toLocaleString()}
                      </div>
                    </div>
                    <Progress value={program.raisedAmount} max={program.goalAmount} className="h-4" />
                  </div>
                  
                  <div className="pt-4 space-y-4">
                    <Link href="/donate" className="block">
                      <Button size="lg" fullWidth className="text-lg shadow-md hover:shadow-lg">
                        Donate Now
                      </Button>
                    </Link>
                    <p className="text-xs text-center text-slate-500 mt-4">
                      100% of your donation goes directly to the field. Secure and encrypted payment.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
