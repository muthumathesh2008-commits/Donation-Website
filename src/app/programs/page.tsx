import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { getPrograms } from '@/lib/data';

export const metadata = {
  title: 'Our Programs | Hope Foundation',
  description: 'Explore the various programs we support worldwide to provide relief, education, and sustainable development.',
};

export default function ProgramsPage() {
  const programs = getPrograms();

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Our Programs</h1>
          <p className="text-lg text-slate-600">
            From emergency disaster relief to long-term sustainable agriculture, discover the initiatives where your contributions make a tangible difference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <Card key={program.id} className="flex flex-col group hover:shadow-lg transition-all duration-300">
              <div className="relative h-64 w-full overflow-hidden">
                <Image 
                  src={program.imagePlaceholder} 
                  alt={program.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold text-slate-700 shadow-sm">
                  {program.category}
                </div>
              </div>
              <CardContent className="flex flex-col flex-grow">
                <h2 className="text-2xl font-bold text-slate-900 mb-3">{program.title}</h2>
                <p className="text-slate-600 text-base mb-8 flex-grow">{program.description}</p>
                
                <div className="space-y-5 mt-auto">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="flex justify-between text-sm font-medium mb-3">
                      <div>
                        <span className="text-slate-500 block text-xs uppercase tracking-wider mb-1">Raised</span>
                        <span className="text-emerald-600 text-lg font-bold">${program.raisedAmount.toLocaleString()}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-500 block text-xs uppercase tracking-wider mb-1">Goal</span>
                        <span className="text-slate-900 text-lg font-bold">${program.goalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                    <Progress value={program.raisedAmount} max={program.goalAmount} />
                  </div>
                  
                  <Link href={`/programs/${program.id}`}>
                    <Button fullWidth className="group-hover:bg-emerald-700 transition-colors">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
