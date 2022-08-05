import { useState } from 'react';
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({username: "", password: ""})
  const [errors, setErrors] = useState([])
  const history = useHistory()

  function handleSubmit(event) {
    event.preventDefault()

    // setErrors([])

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

  return (
    <>
      <h1>Login</h1>
      <form className="form" onSubmit={handleSubmit}>
        {([
          {label: "Username", type: null, value: formData.username, name: "username"}, 
          {label: "Password", type: "password", value: formData.password, name: "password"}
        ]).map( item => (
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
              key={`Login.${item.name}`}
            />
          ) : (
            <TextField
              label={item.label}
              type={item.type}
              margin="normal"
              value={item.value}
              onChange={(event) => setFormData({...formData, [item.name]: event.target.value})}
              className="form-input"
              key={`Login.${item.name}`}
            />
          )
        ))}
        <Button 
          className="form-button" 
          onClick={handleSubmit}
        >
          Login
        </Button>
      </form>
      <Link to="/signup">Don't have an account yet.</Link>
    </>
  )
}

export default Login;
