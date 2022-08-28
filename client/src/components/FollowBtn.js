import { useState, useEffect } from 'react';
import LoginAlert from './LoginAlert';
import { useSelector, useDispatch } from 'react-redux';
import { followAdded, followDeleted } from '../features/users/usersSlice';
import { Button } from '@mui/material';

function FollowBtn({ currentUser }) {
  const user = useSelector((state) => state.users.entities)
  const dispatch = useDispatch()

  const foundFollow = currentUser && user.followers ? user.followers.find((follow) => follow.id === currentUser.id) : null
  const followData = currentUser ? {followee_id: user.id, follower_id: currentUser.id} : {}
  
  const [followed, setFollowed] = useState(false)
  const [errors, setErrors] = useState([])

  useEffect(() => {
    setFollowed(foundFollow ? true : false)
  }, [foundFollow])

  function handleFollow() {
    setErrors([])

    !followed ? (
      fetch("/friendships", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(followData)
      })
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            dispatch(followAdded(currentUser))
            setFollowed(true)
          })
        } else {
          r.json().then((err) => {
            setErrors(err.errors)
          })
        }
      })
    ) : (
      fetch(`/friendships/${user.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then(() => {
        dispatch(followDeleted(currentUser.id))
        setFollowed(false)
      })
    )
  }

  return (
    <>
      <Button 
        variant={followed ? "outlined" : "contained"} 
        onClick={handleFollow} 
        color={followed ? "neutral" : "primary"}
        size="large"
      >
        {followed ? "Unfollow" : "Follow"}
      </Button>
      
      <LoginAlert errors={errors} />
    </>
  )
}

export default FollowBtn;
