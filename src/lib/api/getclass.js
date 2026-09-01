'use server'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

export const getClassesByTrainer = async (trainerId) => {
  try {
    const res = await fetch(`${baseURL}/api/class?trainerId=${trainerId}`, {
      cache: 'no-store', 
    });

    if (!res.ok) {
      throw new Error('Failed to fetch classes');
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching classes:', error);
    return [];
  }
};