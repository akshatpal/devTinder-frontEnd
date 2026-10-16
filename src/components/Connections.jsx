import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BASE_URL } from '../utils/constants';
import { addConnection } from '../utils/connectionSlice';
import axios from 'axios';
import { useEffect } from 'react';
import UserCard from './UserCard';

const Connections = () => {
    const connections = useSelector((store) => store.connection);
    const dispatch = useDispatch();
    const getConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + '/user/connections', {
                withCredentials: true
            });

            dispatch(addConnection(res?.data?.data));
            console.log(res);
            
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getConnections();
    }, [])
    if(!connections) return <div>No connections</div>;
    return (
        <div className="flex flex-wrap gap-2 justify-center">
            {connections.map((connection) => {
                return <UserCard key={connection._id} user={connection} />
            })}
        </div>
    )
}

export default Connections