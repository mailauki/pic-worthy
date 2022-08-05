import { useState } from 'react';
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';
import Form from '../components/Form';
import { Button } from '@mui/material';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({username: "", password: ""})
  const [errors, setErrors] = useState([])
  const history = useHistory()

  function handleSubmit(event) {
    event.preventDefault()

    fetch("/login", {
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
    {label: "Password", type: "password", value: formData.password, name: "password"}
  ]

  return (
    <>
      <h1>Login</h1>
      <div className="form">
        <Form formInfo={formInfo} errors={errors} formData={formData} setFormData={setFormData} />
        <Button 
          className="form-button" 
          variant="contained"
          onClick={handleSubmit}
        >
          Login
        </Button>
      </div>
      <Link to="/signup">Don't have an account yet.</Link>
    </>
  )
}

export default Login;
