import { TextField } from '@mui/material';

function Form({ formInfo, errors, formData, setFormData }) {
  return (
    <>
      {(formInfo).map( item => (
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
            key={item.name}
          />
        ) : (
          <TextField
            label={item.label}
            type={item.type}
            margin="normal"
            value={item.value}
            onChange={(event) => setFormData({...formData, [item.name]: event.target.value})}
            className="form-input"
            key={item.name}
          />
        )
      ))}
    </>
  )
}

export default Form;
