'use server'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

export const addClass = async (newClassData) => {
    const res = await fetch(`${baseURL}/api/class`,{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(newClassData)
    })
    return res.json();
}