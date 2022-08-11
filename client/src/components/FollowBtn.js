import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { followAdded, followDeleted } from '../features/users/usersSlice';
import { Button } from '@mui/material';

function FollowBtn() {
  const user = useSelector((state) => state.users.entities)
  const currentUser = useSelector((state) => state.currentUser.entities)
  const dispatch = useDispatch()

  const [foundFollow, setFoundFollow] = useState(null)
  const [followData, setFollowData] = useState({})
  const [followed, setFollowed] = useState(false)

  useEffect(() => {
    currentUser.followees ? setFoundFollow(currentUser.followees.find(followee => followee.id === user.id)) : setFoundFollow(null)

    foundFollow ? setFollowed(true) : setFollowed(false)

    currentUser ? setFollowData({followee_id: user.id, follower_id: currentUser.id}) : setFollowData({})
  }, [currentUser, foundFollow])

  function handleFollow() {
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
            console.log(err.errors)
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
    <Button variant="contained" onClick={handleFollow}>{followed ? "Unfollow" : "Follow"}</Button>
  )
}

export default FollowBtn;
