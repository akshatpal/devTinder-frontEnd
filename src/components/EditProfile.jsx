import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { BASE_URL } from '../utils/constants'
import { addUser } from '../utils/userSlice';
import axios from 'axios';


const EditProfile = ({user}) => {
    const [firstName, setFirstName] = useState(user?.firstName)
    const [lastName, setLastName] = useState(user?.lastName)
    const [age, setAge] = useState(user?.age)

    const dispatch = useDispatch();

    const handleUpdate = async () => {
        try {
            const res = await axios.patch(BASE_URL + '/profile/edit', {
                firstName,
                lastName,
                age
            }, {
                withCredentials: true
            });
            dispatch(addUser(res.data.data));
        } catch (error) {
            console.log(error);
        }
    }
    
  return (
    <div>
        <div className="flex justify-center my-10">
            <div className="card bg-base-200 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title text-center">Edit Profile</h2>
                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">First Name</legend>
                            <input type="text" className="input" placeholder="Type here" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Last Name</legend>
                            <input type="text" className="input" placeholder="Type here" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Age</legend>
                            <input type="number" className="input" placeholder="Type here" value={age} onChange={(e) => setAge(e.target.value)} />
                        </fieldset>
                    </div>
                    <div className="card-actions justify-center mt-6">
                        <button className="btn btn-primary" onClick={handleUpdate} >Update</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditProfile