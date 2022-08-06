import { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { fetchTags, tagAdded } from '../features/tags/tagsSlice';
import Form from '../components/Form';
import { Button, Autocomplete, Chip, TextField } from '@mui/material';

function AddPhoto({ currentUser }) {
  const [formData, setFormData] = useState({image: "", description: ""})
  const [selectedTags, setSelectedTags] = useState([])
  const [errors, setErrors] = useState([])
  const history = useHistory()

  function handleSubmit(event) {
    event.preventDefault()

    console.log(formData)
    console.log({selectedTags})

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
                body: JSON.stringify({photo_id: photo.id, tag_id: tag.id})
              })
              .then((r) => {
                if (r.ok) {
                  r.json().then((photoTag) => {
                    console.log(photoTag)
                  })
                }
              })
            })
          }
          history.push(`/users/${currentUser.id}`)
        })
      } else {
        r.json().then((err) => setErrors(err.errors))
      }
    })
  }

  const formInfo = [
    {label: "Image Url", type: "url", value: formData.image, name: "image"}, 
    {label: "Description", type: null, value: formData.description, name: "description"}
  ]

  const tags = useSelector((state) => state.tags.entities)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTags())
  }, [dispatch])

  console.log({tags})

  return (
    <>
      <h1>Add Photo</h1>
      <div className="form">
        <Form formInfo={formInfo} errors={errors} formData={formData} setFormData={setFormData} />
        <Autocomplete
          multiple
          id="tags"
          className="form-input"
          Tags
          defaultValue={selectedTags}
          options={tags.map((option) => option.name)}
          onChange={(event, newValue) => {
            tags.filter( tag => {
              newValue.length > 0 ? (
                setSelectedTags(newValue.map( value => value === tag.name ? tag : null))
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
                    console.log(tag)
                    dispatch(tagAdded(tag))
                  })
                }
              })
              console.log(event.target.value)
              // add value to tags
              // make sure tags updates
              // iterate thru tags to check if already exists just in case
            }
          }}
          renderTags={(value, getTagProps) => 
            value.map((option, index) => (
              <Chip label={option} {...getTagProps({ index })} />
            ))}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tags"
              placeholder="add tags"
            />
          )}
        />
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

export default AddPhoto;
