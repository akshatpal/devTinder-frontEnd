import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {

    const [email, setEmail] = useState('anshu@gmail.com')
    const [password, setPassword] = useState('Anshu@123')
    const [error, setError] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(BASE_URL + '/login', { emailId: email, password: password }, { withCredentials: true });

            dispatch(addUser(res.data));
            navigate('/');
        } catch (err) {
            setError(err.response?.data || "Something went wrong. Please try again.");
        }
    }

    return (
        <div className="flex justify-center my-10">
            <div className="card bg-base-200 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title text-center">Login</h2>
                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Email Id</legend>
                            <input type="text" className="input" placeholder="Type here" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Password</legend>
                            <input type="password" className="input" placeholder="Type here" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </fieldset>
                    </div>
                    <p className="text-red-500">{error}</p>
                    <div className="card-actions justify-center mt-6">
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login