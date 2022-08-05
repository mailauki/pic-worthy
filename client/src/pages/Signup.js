import { useState } from 'react';
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';
import Form from '../components/Form';
import { Button } from '@mui/material';

function Signup({ onLogin }) {
  const [formData, setFormData] = useState({username: "", password: "", password_confirmation: ""})
  const [errors, setErrors] = useState([])
  const history = useHistory()

  console.log(formData)

  function handleSubmit(event) {
    event.preventDefault()

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => onLogin(user))
          history.push("/")
        } else {
          r.json().then((err) => setErrors(err.errors))
        }
      })
  }
  
  const formInfo = [
    {label: "Username", type: null, value: formData.username, name: "username"}, 
    {label: "Password", type: "password", value: formData.password, name: "password"}, 
    {label: "Password Confirmation", type: "password", value: formData.password_confirmation, name: "password_confirmation"}
  ]

  return (
    <>
      <h1>Signup</h1>
      <div className="form">
        <Form formInfo={formInfo} errors={errors} formData={formData} setFormData={setFormData} />
        <Button 
          className="form-button" 
          variant="contained"
          onClick={handleSubmit}
        >
          Signup
        </Button>
      </div>
      <Link to="/login">Already have an account.</Link>
    </>
  )
}

export default Signup;
