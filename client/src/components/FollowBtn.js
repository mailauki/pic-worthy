import { useState, useEffect } from 'react';
import Alert from './Alert';
import { useSelector, useDispatch } from 'react-redux';
import { followAdded, followDeleted } from '../features/users/usersSlice';
import { Button } from '@mui/material';

function FollowBtn({ currentUser }) {
  const user = useSelector((state) => state.users.entities)
  const dispatch = useDispatch()

  const [foundFollow, setFoundFollow] = useState(null)
  const [followData, setFollowData] = useState({})
  const [followed, setFollowed] = useState(false)
  const [errors, setErrors] = useState([])

  useEffect(() => {
    currentUser && currentUser.followees ? setFoundFollow(currentUser.followees.find(followee => followee.id === user.id)) : setFoundFollow(null)

    foundFollow ? setFollowed(true) : setFollowed(false)

    currentUser ? setFollowData({followee_id: user.id, follower_id: currentUser.id}) : setFollowData({})
  }, [currentUser, foundFollow])

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
            dispatch(followAdded())
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
      .then((r) => {
        dispatch(followDeleted())
        setFollowed(false)
      })
    )
  }

  return (
    <>
      <Button 
        variant="contained" 
        onClick={handleFollow} 
        color={followed ? "neutral" : "primary"}
        size="large"
      >
        {followed ? "Unfollow" : "Follow"}
      </Button>
      <Alert errors={errors} />
    </>
  )
}

export default FollowBtn;
