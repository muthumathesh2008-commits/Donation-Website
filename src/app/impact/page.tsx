import React from 'react';
import { Award, BookOpen, Droplets, HeartPulse, Home } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

export const metadata = {
  title: 'Our Impact | Hope Foundation',
  description: 'See the timeline of our achievements and the lives we have impacted over the years.',
};

const timelineData = [
  {
    year: '2025',
    title: 'Global Healthcare Expansion',
    description: 'Launched 50 new mobile clinics reaching over 200 remote villages across Sub-Saharan Africa and Southeast Asia.',
    icon: <HeartPulse className="h-6 w-6 text-rose-500" />,
    stats: '150,000+ patients treated'
  },
  {
    year: '2024',
    title: 'Clean Water Initiative Milestone',
    description: 'Successfully installed our 1,000th sustainable water purification system, providing clean drinking water to previously marginalized communities.',
    icon: <Droplets className="h-6 w-6 text-blue-500" />,
    stats: '500,000+ liters daily'
  },
  {
    year: '2022',
    title: 'Emergency Relief Operations',
    description: 'Deployed immediate disaster relief response during major regional earthquakes, providing shelter, food, and medical aid within 24 hours.',
    icon: <Home className="h-6 w-6 text-amber-500" />,
    stats: '10,000+ families sheltered'
  },
  {
    year: '2020',
    title: 'Education for All Launch',
    description: 'Started our flagship education program, building 20 new schools and providing scholarships for thousands of children.',
    icon: <BookOpen className="h-6 w-6 text-indigo-500" />,
    stats: '5,000+ students enrolled'
  },
  {
    year: '2018',
    title: 'Foundation Established',
    description: 'Hope Foundation was born with a single mission: to bring sustainable change to communities in need, starting with our first local agriculture project.',
    icon: <Award className="h-6 w-6 text-emerald-500" />,
    stats: 'The beginning of hope'
  }
];

export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Our Impact Journey</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Transparency and tangible results are at the core of what we do. Here is a timeline of how your contributions have changed the world.
          </p>
        </div>

        <div className="relative border-l-4 border-slate-200 ml-4 md:ml-12 space-y-16 pb-12">
          {timelineData.map((item, index) => (
            <div key={index} className="relative pl-10 md:pl-16">
              {/* Timeline Marker */}
              <div className="absolute -left-3 md:-left-[22px] top-1 h-10 w-10 rounded-full bg-white border-4 border-emerald-500 flex items-center justify-center shadow-sm">
                <div className="h-3 w-3 bg-emerald-500 rounded-full" />
              </div>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start">
                  <div className="flex-shrink-0 h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                      <span className="text-emerald-600 font-bold text-xl">{item.year}</span>
                      <h3 className="text-2xl font-bold text-slate-900">{item.title}</h3>
                    </div>
                    <p className="text-slate-600 text-lg leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <div className="inline-flex items-center px-4 py-2 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="font-semibold text-slate-800 text-sm">{item.stats}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
