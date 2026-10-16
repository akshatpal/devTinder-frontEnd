import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants';
import UserCard from './UserCard';

const Requests = () => {
    const [request,setRequests] = useState([]);

    const fetchRequests = async () => {
        try{
            const res = await axios.get(BASE_URL + '/user/requests/recieved', {
                withCredentials: true
            });
            setRequests(res.data.requests);
        } catch(err){
            console.log(err);
        }
    }
    useEffect(() => {
        fetchRequests();
    }, [])

    if(!request) return <div>No requests</div>;
  return (
    <div className="flex justify-center flex-col items-center">
        {request.map((req) => {
            return <UserCard key={req._id} user={req.fromUserId} req={req} action='requests' />
        })}
    </div>
  )
}

export default Requests