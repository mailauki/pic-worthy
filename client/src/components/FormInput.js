import { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function FormInput({ errors, item, formData, setFormData }) {
  const [showPassword, setShowPassword] = useState(false)

  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  return (
    errors && errors.length > 0 ? (
      <TextField
        error
        label={item.label}
        type={!showPassword ? item.type : "text"} 
        margin="normal"
        value={item.value}
        onChange={(event) => setFormData({...formData, [item.name]: event.target.value})}
        helperText={errors.filter((err) => err.includes(item.name.split("_").join(" ")))}
        InputProps={{
          endAdornment: item.type === "password" ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleShowPassword}
                  edge="end"
                >
                  {!showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ) : (
              <></>
            )
        }}
        className="form-input"
        key={item.name}
      />
    ) : (
      <TextField
        label={item.label}
        type={!showPassword ? item.type : "text"}
        margin="normal"
        value={item.value}
        onChange={(event) => setFormData({...formData, [item.name]: event.target.value})}
        helperText={item.helper}
        InputProps={{
          endAdornment: item.type === "password" ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleShowPassword}
                  edge="end"
                >
                  {!showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ) : (
              <></>
            )
        }}
        className="form-input"
        key={item.name}
      />
    )
  )
}

export default FormInput;
