import React from 'react';
import {useState} from 'react';
import Swal from 'sweetalert2';

function AddEmployee(){

    const [employee, setEmployee] =useState({
        name: '',
        email: '',
        role: '',
        department: '',
        salary: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: send `employee` to your backend or state manager
        fetch('http://localhost:4000/employees/',{
            'method':'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:employee.name,
                email:employee.email,
                role:employee.role,
                department:employee.department,
                salary:employee.salary
                })
        }).then((responce)=>responce.json())
        .then((data)=>{
            console.log(data);
            setEmployee.name('');
             setEmployee.email('');
             setEmployee.role('');
             setEmployee.department('');
             setEmployee.salary('');

             Swal.fire({
                title:'Employee Added Successfull',
                icon:'success',
                draggable:true
             });
             setTimeout(()=>{
                window.location.href='/';
             },2000)

        }).catch((error)=>{
            console.log(error);
            Swal.fire({
                title:'SomeThing Went Wrong',
                icon:'Error',
                draggable:true
             })
        })
        console.log('Adding employee:', employee);
        setEmployee({ name: '', email: '', role: '', department: '', salary: '' });
    };

    return(
        <div>
            <h1>Add Employee</h1>
                <div>
                    <label>
                        Name:
                        <input
                            name="name"
                            type="text"
                            placeholder="Enter name"
                            value={employee.name}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <br/>
                <div>
                    <label>
                        Email:
                        <input
                            name="email"
                            type="email"
                            placeholder="Enter email"
                            value={employee.email}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <br/>
                <div>
                    <label>
                        Role:
                        <input
                            name="role"
                            type="text"
                            placeholder="Enter role"
                            value={employee.role}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <br/>
                <div>
                    <label>
                        Department:
                        <input
                            name="department"
                            type="text"
                            placeholder="Enter department"
                            value={employee.department}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <br/>
                <div>
                    <label>
                        Salary:
                        <input
                            name="salary"
                            type="number"
                            placeholder="Enter salary"
                            value={employee.salary}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <br/>
                <div>
                    <button type="submit" onClick={handleSubmit}>Add Employee</button>
                </div>
            
        </div>
    )
}

export default AddEmployee;