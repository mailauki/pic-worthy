import { useState } from 'react';
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';
import Form from '../components/Form';
import { Button, TextField } from '@mui/material';

function EditAccount({ currentUser }) {
  const [formData, setFormData] = useState({username: currentUser.username, first_name: currentUser.first_name, avatar: currentUser.avatar})
  const [errors, setErrors] = useState([])
  const history = useHistory()

  function handleSubmit(event) {
    event.preventDefault()

    // console.log(formData)

    // setErrors([])

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
    <>
      <h1>Edit Account</h1>
      <div className="form">
        {/* {(formInfo).map( item => (
          errors && errors.length > 0 ? (
            <TextField
              error
              label={item.label}
              type={item.type} 
              margin="normal"
              value={item.value}
              onChange={(event) => setFormData({...formData, [item.name]: event.target.value})}
              helperText={errors.filter(err => err.includes(item.label))}
              className="form-input"
              key={`EditAccount.${item.name}`}
            />
          ) : (
            <TextField
              label={item.label}
              type={item.type}
              margin="normal"
              value={item.value}
              onChange={(event) => setFormData({...formData, [item.name]: event.target.value})}
              className="form-input"
              key={`EditAccount.${item.name}`}
            />
          )
        ))} */}
        <Form formInfo={formInfo} errors={errors} formData={formData} setFormData={setFormData} />
        <Button 
          className="form-button" 
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </>
  )
}

export default EditAccount;
