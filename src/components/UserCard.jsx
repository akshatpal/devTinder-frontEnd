import React from 'react'
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const UserCard = ({user, action, req}) => {

    const reviewConnection = async (type,status) => {
        try {
            console.log(req._id || user._id)
            const res = await axios.post(BASE_URL + '/request/'+type +'/'+status +'/'+ (req._id ? req._id : user._id), {
            }, {
                withCredentials: true
            });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <div className="card bg-base-200 w-96 shadow-sm">
                <figure>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{user?.firstName + " " + user?.lastName}</h2>
                    <p>{user?.age}</p>
                    {action === 'requests' ? (
                        <div className="card-actions justify-between">
                            <button className="btn btn-error" onClick={() => reviewConnection('review','rejected')} >Reject</button>
                            <button className="btn btn-success" onClick={() => reviewConnection('review','accepted')}>Accept</button>
                        </div>
                    ) : (
                        <div className="card-actions justify-between">
                            <button className="btn btn-primary" onClick={() => reviewConnection('send','ignored')}>Ignore</button>
                            <button className="btn btn-secondary" onClick={() => reviewConnection('send','interested')}>Interested</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UserCard 