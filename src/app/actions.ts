'use server';

import { revalidatePath } from 'next/cache';
import { getProgram } from '@/lib/data';

export async function processDonation(programId: string, amount: number) {
  const program = getProgram(programId);
  
  if (!program) {
    throw new Error('Program not found');
  }

  // Mutate the global state directly
  program.raisedAmount += amount;

  // Revalidate the cache so the UI reflects the new raised amount
  revalidatePath('/', 'layout');
  
  return { success: true, newTotal: program.raisedAmount };
}
