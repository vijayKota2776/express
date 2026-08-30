import Swal from "sweetalert2";
import { useState } from "react";
export default function Login(){
    const [username,setUserName]=useState('');
    const [password,setPassword]=useState('');

    const handelRegister = () => {
            fetch('http://localhost:4000/user/login',{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify({
                   
                    username,
                    password

                    
                })
            }).then((response)=>response.json())
            .then((data)=>{
                console.log('Success',data)
                if(data.message==='Login successful'){
                    const token=data.token;
                    localStorage.setItem('timepasstoken',token)
                    Swal.fire({
                        title: data.message,
                        icon: "success",
                        draggable: true
                    });
                    setTimeout(() => {
                         window.location.href='/User';
                    }, 2000);
                }
                else{
                    Swal.fire({
                        title:data.message,
                        icon:'error',
                        draggable:true
                    });
                }
                
    
            })
            .catch((error)=>{
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
            <h1>Log In</h1>
                Enter Username:- <input type='text' name='userName' value={username} onChange={(e)=>{setUserName(e.target.value)}}/><br/><br/>
                Enter password:- <input type='password' name='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/><br/><br/>
                <button onClick={handelRegister}>LogIn</button>
        </div>
    )

 }