import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Globe2, Heart, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import { getPrograms } from '@/lib/data';

export default async function Home() {
  const programs = await getPrograms();
  const featuredPrograms = programs.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 py-24 sm:px-6 lg:px-8 bg-slate-50 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=2000&q=80" 
            alt="Hero background" 
            fill 
            className="object-cover opacity-10"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold tracking-wide">
            Together We Can Change The World
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight">
            Empower Communities.<br />
            <span className="text-emerald-600">Transform Lives.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-600">
            Join our global mission to provide clean water, education, and disaster relief to those who need it most. Every contribution creates a ripple of hope.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link href="/donate">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                Donate Now
              </Button>
            </Link>
            <Link href="/programs">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8">
                Explore Programs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Banner */}
      <section className="bg-emerald-600 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-emerald-500/50">
            <div className="flex flex-col items-center justify-center pt-8 md:pt-0">
              <Heart className="h-10 w-10 mb-4 opacity-80" />
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-emerald-100 font-medium">Lives Impacted</div>
            </div>
            <div className="flex flex-col items-center justify-center pt-8 md:pt-0">
              <Globe2 className="h-10 w-10 mb-4 opacity-80" />
              <div className="text-4xl font-bold mb-2">15</div>
              <div className="text-emerald-100 font-medium">Countries Reached</div>
            </div>
            <div className="flex flex-col items-center justify-center pt-8 md:pt-0">
              <Users className="h-10 w-10 mb-4 opacity-80" />
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-emerald-100 font-medium">Active Volunteers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Causes */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Urgent Causes</h2>
              <p className="text-slate-600 text-lg">
                Discover the programs that need your immediate support. Your donation directly funds these critical initiatives.
              </p>
            </div>
            <Link href="/programs" className="inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-700 transition-colors group">
              View All Causes
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPrograms.map((program) => (
              <Card key={program.id} className="flex flex-col group hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-56 w-full overflow-hidden">
                  <Image 
                    src={program.imagePlaceholder} 
                    alt={program.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-slate-700 shadow-sm">
                    {program.category}
                  </div>
                </div>
                <CardContent className="flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{program.title}</h3>
                  <p className="text-slate-600 text-sm mb-6 flex-grow">{program.description}</p>
                  
                  <div className="space-y-4 mt-auto">
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-2">
                        <span className="text-emerald-600">${program.raisedAmount.toLocaleString()}</span>
                        <span className="text-slate-500">Goal: ${program.goalAmount.toLocaleString()}</span>
                      </div>
                      <Progress value={program.raisedAmount} max={program.goalAmount} />
                    </div>
                    
                    <Link href={`/programs/${program.id}`}>
                      <Button fullWidth variant="outline" className="mt-4">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
