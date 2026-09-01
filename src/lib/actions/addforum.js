'use server'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

export const addForum = async (newForumData) =>{
    const res = await fetch(`${baseURL}/api/forum`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newForumData)
    })
    return res.json();
}