import { useState } from 'react';
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';
import FormInput from '../components/FormInput';
import Anchor from '../components/Anchor';
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
        r.json().then((user) => {
          onLogin(user)
          history.push("/")
        })
      } else {
        r.json().then((err) => setErrors(err.errors))
      }
    })
  }

  const formInfo = [
    {label: "Username", type: null, value: formData.username, name: "username", helper: " "}, 
    {label: "Password", type: "password", value: formData.password, name: "password", helper: " "}
  ]

  return (
    <div className="Login">
      <h1>Login</h1>
      <div className="form">
        {formInfo.map( item => <FormInput errors={errors.filter((err) => err.includes(item.label))} item={item} formData={formData} setFormData={setFormData} /> )}
        <Button 
          className="form-button" 
          variant="contained"
          onClick={handleSubmit}
        >
          Login
        </Button>
      </div>
      <Anchor name="Don't have an account yet?" to="/signup" />
    </div>
  )
}

export default Login;
