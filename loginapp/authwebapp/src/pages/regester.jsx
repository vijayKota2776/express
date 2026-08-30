import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function Register (){
    const [name,setName]=useState('');
    const [username,setUserName]=useState('');
    const [email,setEmail] =useState('');
    const [password,setPassword]=useState('');

    const handelRegister = () => {
        fetch('http://localhost:4000/user/register',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                name,
                username,
                email,
                password

                
            })
        }).then((response)=>response.json())
        .then((data)=>{
            console.log('Success',data)
            if(data.message==='User created successfully'){
                Swal.fire({
                    title: data.message,
                    icon: "success",
                    draggable: true
                });
            }
            else{
                Swal.fire({
                    title:data.message,
                    icon:'error',
                    draggable:true
                });
            }
            

        }).catch((error)=>{
            console.log('Error',error);
            Swal.fire({
                title:error.message,
                icon:'error',
                draggable:true
            })
        })
    };

    return(
        <div>
            <h1>Register</h1>
            
                Enter Name:-<input type='text' name='name' value={name} onChange={(e)=>{setName(e.target.value)}}/><br/><br/>
                Enter Username:- <input type='text' name='userName' value={username} onChange={(e)=>{setUserName(e.target.value)}}/><br/><br/>
                Enter Email:- <input type='email' name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/><br/><br/>
                Enter password:- <input type='password' name='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/><br/><br/>
                <button onClick={handelRegister}>Register</button>

            
        </div>
    )
}