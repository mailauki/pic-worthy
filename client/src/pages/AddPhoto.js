import { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { fetchTags, tagAdded } from '../features/tags/tagsSlice';
import FormInput from '../components/FormInput';
import LoginAlert from '../components/LoginAlert';
import { Button, Autocomplete, Chip, TextField } from '@mui/material';

function AddPhoto({ currentUser }) {
  const [formData, setFormData] = useState({image: "", description: ""})
  const [selectedTags, setSelectedTags] = useState([])
  const [errors, setErrors] = useState([])
  const [alert, setAlert] = useState("")
  const [errorHelper, setErrorHelper] = useState("")
  const history = useHistory()
  const dispatch = useDispatch()
  const tags = useSelector((state) => state.tags.entities)

  useEffect(() => {
    dispatch(fetchTags())
  }, [dispatch])

  function handleSubmit(event) {
    event.preventDefault()

    fetch("/photos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then((r) => {
      if (r.ok) {
        r.json().then((photo) => {
          if(selectedTags.length > 0) {
            selectedTags.map( tag => {
              fetch("/photo_tags", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ photo_id: photo.id, tag_id: tag.id })
              })
              .then((r) => {
                if (r.ok) {
                  r.json().then((photoTag) => {
                    console.log(photoTag)
                  })
                }
                else {
                  r.json().then((err) => setErrors(err.errors))
                }
              })
            })
          }
        }).then(() => {
          history.push(`/users/${currentUser.id}`)
        })
      } else {
        r.json().then((err) => {
          setErrors(err.errors.map((error) => error.toLowerCase()))
          setAlert(err.errors.filter((error) => error.includes("logged in")))
        })
      }
    })
  }

  const formInfo = [
    {label: "Image", type: "url", value: formData.image, name: "image", helper: "copy image address or url"}, 
    {label: "Description (optional)", type: null, value: formData.description, name: "description", helper: " "}
  ]

  return (
    <div className="AddPhoto">
      <img src={formData.image} height="150px" />
      <div className="form">
        {formInfo.map( item => <FormInput errors={errors.filter((err) => err.includes(item.name))} item={item} formData={formData} setFormData={setFormData} /> )}
        <Autocomplete
          multiple
          id="tags"
          className="form-input"
          Tags
          options={tags.map((option) => option.name)}
          onChange={(event, newValue) => {
            tags.filter( tag => {
              newValue.length > 0 ? (
                newValue.filter( value => {
                  if(value === tag.name) {
                    setSelectedTags([...selectedTags, tag])
                  }
                } )
              ) : (
                setSelectedTags([])
              )
            } )
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.defaultMuiPrevented = true

              fetch("/tags", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({name: event.target.value})
              })
              .then((r) => {
                if (r.ok) {
                  r.json().then((tag) => {
                    dispatch(tagAdded(tag))
                  })
                } else {
                  r.json().then((err) => setErrorHelper(err.errors[0].split(" ").slice(1).join(" ")))
                }
              })
            }
          }}
          renderTags={(value, getTagProps) => 
            value.map((option, index) => (
              <Chip label={option} {...getTagProps({ index })} />
            ))}
          renderInput={(params) => (
            errorHelper ? (
              <TextField
                {...params}
                error
                label="Tags (optional)"
                placeholder="add tags"
                helperText={errorHelper}
              />
            ) : (
              <TextField
                {...params}
                label="Tags (optional)"
                placeholder="add tags"
                helperText="press enter to create new tag"
              />
            )
          )}
        />
        <Button 
          className="form-button" 
          variant="contained"
          onClick={handleSubmit}
        >
          Add Photo
        </Button>
      </div>
      
      <LoginAlert errors={alert} />
    </div>
  )
}

export default AddPhoto;
