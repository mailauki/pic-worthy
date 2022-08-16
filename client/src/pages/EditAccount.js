import { useEffect, useState } from 'react';
import { useHistory } from "react-router";
import FormInput from '../components/FormInput';
import { Button, Avatar } from '@mui/material';

function EditAccount({ currentUser }) {
  const [formData, setFormData] = useState({username: "", first_name: "", avatar: ""})
  const [errors, setErrors] = useState([])
  const history = useHistory()

  useEffect(() => {
    setFormData(currentUser ? {username: currentUser.username, first_name: currentUser.first_name, avatar: currentUser.avatar} : {username: "", first_name: "", avatar: ""})
  }, [currentUser])

  function handleSubmit(event) {
    event.preventDefault()

    fetch(`/users/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => history.push(`/users/${currentUser.id}`))
        } else {
          r.json().then((err) => setErrors(err.errors.map((error) => error.toLowerCase())))
        }
      })
  }

  const formInfo = [
    {label: "Username", type: null, value: formData.username, name: "username"}, 
    {label: "First Name", type: null, value: formData.first_name, name: "first_name"}, 
    {label: "Avatar", type: "url", value: formData.avatar, name: "avatar"}
  ]

  return (
    <div className="EditAccount">
      {formData ? (
        <Avatar 
          alt={formData.username} 
          src={formData.avatar} 
          sx={{ 
            width: 80, 
            height: 80
          }}
        >
          {formData.username ? formData.username[0].toUpperCase() : ""}
        </Avatar>
      ) : (
        <Avatar sx={{ width: 80, height: 80 }} />
      )}
      <div className="form">
        {formInfo.map( item => <FormInput errors={errors.filter((err) => err.includes(item.name.split("_").join(" ")))} item={item} formData={formData} setFormData={setFormData} /> )}
        <Button 
          className="form-button" 
          variant="contained"
          onClick={handleSubmit}
        >
          Edit Account
        </Button>
      </div>
    </div>
  )
}

export default EditAccount;
