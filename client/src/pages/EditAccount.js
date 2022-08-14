import { useState } from 'react';
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';
import FormInput from '../components/FormInput';
import { Button, TextField } from '@mui/material';

function EditAccount({ currentUser }) {
  const [formData, setFormData] = useState({username: currentUser.username, first_name: currentUser.first_name, avatar: currentUser.avatar})
  const [errors, setErrors] = useState([])
  const history = useHistory()

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
          r.json().then((err) => setErrors(err.errors))
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
      <h1>Edit Account</h1>
      <div className="form">
        {formInfo.map( item => <FormInput errors={errors.filter((err) => err.includes(item.label))} item={item} formData={formData} setFormData={setFormData} /> )}
        <Button 
          className="form-button" 
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  )
}

export default EditAccount;
