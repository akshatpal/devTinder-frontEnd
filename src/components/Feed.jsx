import axios from 'axios';
import { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addFeed, removeFeed } from '../utils/feedSlice';
import { useSelector } from 'react-redux';
import UserCard from './UserCard';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try{
      const res = await axios.get(BASE_URL + '/user/feed', {
        withCredentials: true
      });
      dispatch(addFeed(res?.data?.data));
    } catch(err){
      console.log(err);
    }
  }

  const handleRefresh = () => {
    dispatch(removeFeed());
    getFeed();
  }

  useEffect(() => {
    if (!feed) getFeed();
  }, [])

  return (feed &&
    <div className="flex flex-col gap-4 justify-center items-center">
      {
        feed?.map((user) => {
          return <UserCard key={user?._id} user={user} action="send" req={{}} onRefresh={handleRefresh}/>
        })
      }
    </div>
  )
}

export default Feed