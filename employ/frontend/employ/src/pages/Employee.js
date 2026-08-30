import React, { useEffect, useState } from 'react'

function Employee(){
    const [employee,setEmployee]=useState([]);
    useEffect(()=>{
        loadData();
    },[])

    function loadData(){
        fetch('http://localhost:4000/employees/',{
            'method':'GET',
            headers:{
                'Content-Type':'application/json'
            }
        }).then((responce)=>responce.json())
        .then((data)=>{
            console.log(data);
            setEmployee(data);
        }).catch((error)=>{
            console.error(error.message);
        })
    }
    function handelDelete(id){
        fetch('http://localhost:4000/employees/'+id,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then((responce)=>responce.json())
        .then((data)=>{
            console.log(data);
            loadData(data);
        })
        .catch((error)=>{
            console.log(error);
        })

    }
    return(
        <div>
            <div>
                <h1>Employee</h1>
                <table>
                    <thead>
                        <tr>  
                            <th>ID</th>
                            <th>Name</th>
                            <th>EMAIL</th>
                            <th>ROLE</th>
                            <th>DEPARTMENT</th>
                            <th>SALARY</th>
                            <th>EDIT</th>
                            <th>DELETE</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {
                            employee.map((employee)=>{
                                return <tr key={employee._id}>
                                    <td>{employee._id}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.role}</td>
                                    <td>{employee.department}</td>
                                    <td>{employee.salary}</td>
                                    <td><button>EDIT</button></td>
                                    <td><button onClick={()=>{handelDelete(employee._id)}}>DELETE</button></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Employee;