import React, { useState,useEffect } from 'react';
export default function UserProfile()
{
    const [name,setName]=useState('');
    const [username,setUserName]=useState('');
    const [email,setEmail] =useState('');

    const token =localStorage.getItem('timepasstoken');

    console.log('token from Local Storage',token);
    if(!token){
        window.location.href='/';
    }
    useEffect(() => {
        fetch('http://localhost:4000/user/UserProfile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('User profile data:', data);
            setName(data.user.name);
            setUserName(data.user.username);
            setEmail(data.user.email);
        })
        .catch((error) => {
            console.error('Error fetching user profile:', error);
        });
    }, []);

    return(
        <div>
            <h1>User Profile Page</h1>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Username:</strong> {username}</p>
            <p><strong>Email:</strong> {email}</p>
        </div>
    )
}