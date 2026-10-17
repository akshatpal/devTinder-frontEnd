import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { BASE_URL } from '../utils/constants'
import { addUser } from '../utils/userSlice'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignup = async () => {
        setError("");
        try {
            const res = await axios.post(BASE_URL + '/signup', {
                firstName,
                lastName,
                emailId,
                password
            }, {withCredentials:true});
            dispatch(addUser(res.data.user));
            navigate('/profile');
        } catch (err) { 
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
        }
    }
  return (
    <div>
         <div className="flex justify-center my-10">
            <div className="card bg-base-200 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title text-center">Signup</h2>
                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">First Name</legend>
                            <input type="text" className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Type here" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Last Name</legend>
                            <input type="text" className="input" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Type here" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Email Id</legend>
                            <input type="text" className="input" value={emailId} onChange={(e) => setEmailId(e.target.value)} placeholder="Type here" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Password</legend>
                            <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Type here" />
                        </fieldset>
                    </div>
                    <p className="text-red-500">{error}</p>
                    <div className="card-actions justify-center mt-6">
                        <button className="btn btn-primary" onClick={handleSignup}>Sign Up</button>
                    </div>
                </div>
                <div className="card-actions justify-center mt-6">
                    <Link className="btn btn-primary" to='/login'>Already have an account? Login</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup