'use server';

import { updateTag } from 'next/cache';
import { addDonationToProgram } from '@/lib/data';

export async function processDonation(programId: string, amount: number) {
  if (!Number.isFinite(amount) || amount < 1) {
    throw new Error('Donation amount must be greater than zero');
  }

  const program = addDonationToProgram(programId, amount);
  
  if (!program) {
    throw new Error('Program not found');
  }

  // Expire the relevant cache tags immediately so the next read sees fresh data.
  updateTag('programs');
  updateTag(`program-${programId}`);
  
  return {
    success: true,
    programId,
    newTotal: program.raisedAmount,
  };
}
