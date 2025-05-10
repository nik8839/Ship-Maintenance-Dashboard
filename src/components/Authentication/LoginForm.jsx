import React from 'react'
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import {useNavigate} from 'react-router-dom'
const LoginForm = () => {
const [name, setName] = useState('')
 const [role, setRole] = useState('')
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
  const { login } = useAuth();
  const navigate = useNavigate();

 const SubmitHandler = (e) => {

     e.preventDefault();
    if (login(email, password)) {
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };
  return (
    <>
    <div className='text-center font-bold text-3xl p-2.5 m-2.5'>LoginForm</div>
    <div className='w-1/2 mx-auto mt-5   rounded-lg p-5'>
        <form onSubmit={SubmitHandler} className="max-w-sm mx-auto p-4 border">
        <div className=" text-xl mb-3">
            <label htmlFor="name" className="form-label">Name: </label>
            <input type="text" className="form-control text-black border-2 border-blue-900" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className='text-xl mb-3'>
            <label className="form-label">Role</label>
            <div>
                <input type='radio' id="admin" name="role" value="admin" onChange={(e) => setRole(e.target.value)} />
                <label htmlFor="admin" className="form-check-label">Admin</label>
            </div>
            <div>
                <input type='radio' id="inspector" name="role" value="inspector" onChange={(e) => setRole(e.target.value)}/>
                <label htmlFor="inspector" className="form-check-label">Inspector</label>
            </div>
            <div>
                <input type='radio' id="engineer" name="role" value="engineer" onChange={(e) => setRole(e.target.value)}/>
                <label htmlFor="engineer" className="form-check-label">Engineer</label>
            </div>
        </div>
            <div className="text-xl mb-3">
            <label htmlFor="email" className="form-label">Email address: </label>
            <input type="email" className="form-control text-black border-2 border-blue-900" id="email" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="text-xl mb-3">
            <label htmlFor="password" className="form-label">Password: </label>
            <input type="password" className="form-control text-black border-2 border-blue-900" id="password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-primary cursor-pointer " >Submit</button>
        </form>
    </div>
    </>
    
  )
}

export default LoginForm