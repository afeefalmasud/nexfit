'use server'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const getForumByTrainer = async(trainerId) => {
    try{
        const res = await fetch(`${baseURL}/api/forum?trainerId=${trainerId}`,{
            cache: 'no-store',
        })

        if(!res.ok){
            throw new Error('Failed to fetch forum posts');
        }
        return await res.json();
    }
    catch(error){
        console.error('Error fetching classes:', error);
        return [];
    }
}