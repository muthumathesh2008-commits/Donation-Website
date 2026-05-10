'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CreditCard, Heart, Loader2, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Confetti } from '@/components/ui/Confetti';
import { Program } from '@/lib/data';
import { processDonation } from '@/app/actions';

type Step = 1 | 2 | 3 | 4;

interface DonateFormProps {
  programs: Program[];
  initialProgramId?: string;
}

function formatCurrency(amount: number) {
  return `Rs. ${amount.toLocaleString('en-IN')}`;
}

function getSuggestedAmounts(program?: Program) {
  if (!program) {
    return [500, 1000, 5000];
  }

  const remainingAmount = Math.max(program.goalAmount - program.raisedAmount, 0);
  const baseAmounts = [
    Math.max(100, Math.round((program.goalAmount * 0.01) / 100) * 100),
    Math.max(500, Math.round((program.goalAmount * 0.025) / 100) * 100),
    Math.max(1000, Math.round((program.goalAmount * 0.05) / 100) * 100),
  ];

  const suggestedAmounts = baseAmounts.map((presetAmount) =>
    remainingAmount > 0 ? Math.min(presetAmount, remainingAmount) : presetAmount,
  );

  return Array.from(new Set(suggestedAmounts)).sort((a, b) => a - b);
}

export function DonateForm({ programs, initialProgramId }: DonateFormProps) {
  const [step, setStep] = useState<Step>(1);
  const [amount, setAmount] = useState<number | ''>('');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [currentPrograms, setCurrentPrograms] = useState(programs);
  const [selectedProgramId, setSelectedProgramId] = useState<string>(
    initialProgramId || programs[0]?.id || '',
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [updatedTotal, setUpdatedTotal] = useState<number | null>(null);

  const selectedProgram = currentPrograms.find((program) => program.id === selectedProgramId);
  const predefinedAmounts = getSuggestedAmounts(selectedProgram);

  const handleAmountSelect = (value: number) => {
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setAmount('');
  };

  const handleProgramChange = (programId: string) => {
    setSelectedProgramId(programId);
    setAmount('');
    setCustomAmount('');
  };

  const getActiveAmount = () => amount || parseInt(customAmount, 10) || 0;

  const handlePayment = async () => {
    setIsProcessing(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      const result = await processDonation(selectedProgramId, getActiveAmount());

      setCurrentPrograms((existingPrograms) =>
        existingPrograms.map((program) =>
          program.id === result.programId
            ? { ...program, raisedAmount: result.newTotal }
            : program,
        ),
      );
      setUpdatedTotal(result.newTotal);
      setStep(4);
    } catch (error) {
      console.error('Donation failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-xl w-full">
      {step < 4 && (
        <div className="mb-8 flex justify-center space-x-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 w-16 rounded-full transition-colors duration-300 ${
                s <= step ? 'bg-emerald-500' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
      )}

      <Card className="shadow-xl border-emerald-50 relative overflow-hidden">
        <div className="h-2 w-full bg-emerald-500" />

        <CardContent className="p-8">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 mb-4">
                  <Heart className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Make a Donation</h2>
                <p className="text-slate-500">Select a program and choose an amount to contribute.</p>
              </div>

              <div className="space-y-4">
                <label htmlFor="program-select" className="block text-sm font-medium text-slate-700">
                  I want my donation to support:
                </label>
                <select
                  id="program-select"
                  value={selectedProgramId}
                  onChange={(e) => handleProgramChange(e.target.value)}
                  className="block w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors outline-none text-slate-900 font-medium cursor-pointer"
                >
                  <option value="" disabled>
                    Select a program...
                  </option>
                  {currentPrograms.map((program) => (
                    <option key={program.id} value={program.id}>
                      {program.title}
                    </option>
                  ))}
                </select>
                {selectedProgram ? (
                  <p className="text-sm text-slate-500">
                    Raised {formatCurrency(selectedProgram.raisedAmount)} of{' '}
                    {formatCurrency(selectedProgram.goalAmount)}
                  </p>
                ) : null}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {predefinedAmounts.map((presetAmount) => (
                  <button
                    key={presetAmount}
                    onClick={() => handleAmountSelect(presetAmount)}
                    className={`py-3 rounded-2xl border-2 font-bold text-lg transition-all ${
                      amount === presetAmount
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:bg-slate-50'
                    }`}
                  >
                    {formatCurrency(presetAmount)}
                  </button>
                ))}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-slate-500 font-medium">Rs.</span>
                </div>
                <input
                  type="number"
                  min="1"
                  placeholder="Custom Amount"
                  value={customAmount}
                  onChange={handleCustomAmount}
                  className={`block w-full pl-12 pr-4 py-4 rounded-2xl border-2 text-lg transition-colors focus:outline-none ${
                    customAmount
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                      : 'border-slate-200 bg-white focus:border-emerald-500'
                  }`}
                />
              </div>

              <Button
                size="lg"
                fullWidth
                onClick={() => setStep(2)}
                disabled={getActiveAmount() < 1 || !selectedProgramId}
              >
                Continue
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center mb-6">
                <button onClick={() => setStep(1)} className="text-slate-400 hover:text-slate-600">
                  <ArrowLeft className="h-6 w-6" />
                </button>
                <h2 className="text-2xl font-bold text-slate-900 ml-4">Your Details</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="John Doe"
                    className="block w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="john@example.com"
                    className="block w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors outline-none"
                  />
                </div>
              </div>

              <Button size="lg" fullWidth onClick={() => setStep(3)}>
                Proceed to Payment
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <button
                    onClick={() => setStep(2)}
                    className="text-slate-400 hover:text-slate-600"
                    disabled={isProcessing}
                  >
                    <ArrowLeft className="h-6 w-6" />
                  </button>
                  <h2 className="text-2xl font-bold text-slate-900 ml-4">Payment</h2>
                </div>
                <div className="text-xl font-bold text-emerald-600">
                  {formatCurrency(getActiveAmount())}
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full flex items-center justify-between px-6 py-4 rounded-xl border-2 border-slate-200 hover:border-emerald-500 bg-white hover:bg-slate-50 transition-colors group disabled:opacity-50 disabled:pointer-events-none"
                >
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded bg-slate-100 flex items-center justify-center mr-4 group-hover:bg-emerald-100 transition-colors">
                      <CreditCard className="h-4 w-4 text-slate-600 group-hover:text-emerald-600" />
                    </div>
                    <span className="font-semibold text-slate-700 group-hover:text-slate-900">
                      Pay with UPI
                    </span>
                  </div>
                </button>

                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full flex items-center justify-between px-6 py-4 rounded-xl border-2 border-slate-200 hover:border-emerald-500 bg-white hover:bg-slate-50 transition-colors group disabled:opacity-50 disabled:pointer-events-none"
                >
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded bg-slate-100 flex items-center justify-center mr-4 group-hover:bg-emerald-100 transition-colors">
                      <CreditCard className="h-4 w-4 text-slate-600 group-hover:text-emerald-600" />
                    </div>
                    <span className="font-semibold text-slate-700 group-hover:text-slate-900">
                      Credit / Debit Card
                    </span>
                  </div>
                </button>
              </div>

              {isProcessing && (
                <div className="flex flex-col items-center justify-center py-4 space-y-4 animate-in fade-in">
                  <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
                  <p className="text-slate-500 text-sm font-medium">Processing your donation securely...</p>
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-8 space-y-6 animate-in zoom-in duration-500">
              <Confetti />
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-emerald-100 text-emerald-500 mb-2">
                <CheckCircle className="h-10 w-10" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Thank You!</h2>
              <p className="text-slate-600 text-lg max-w-sm mx-auto">
                Your generous donation of{' '}
                <span className="font-bold text-emerald-600">{formatCurrency(getActiveAmount())}</span>{' '}
                has been processed successfully. You are changing lives!
              </p>
              {selectedProgram && updatedTotal !== null ? (
                <p className="text-sm text-slate-500 max-w-sm mx-auto">
                  {selectedProgram.title} has now raised{' '}
                  <span className="font-semibold text-slate-700">{formatCurrency(updatedTotal)}</span>{' '}
                  of {formatCurrency(selectedProgram.goalAmount)}.
                </p>
              ) : null}

              <div className="pt-8">
                <Link href="/">
                  <Button variant="outline" size="lg" className="px-8">
                    Return to Home
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {step < 4 && (
        <p className="text-center text-slate-400 text-sm mt-8 flex items-center justify-center gap-2">
          Securely processed. 100% encrypted.
        </p>
      )}
    </div>
  );
}
