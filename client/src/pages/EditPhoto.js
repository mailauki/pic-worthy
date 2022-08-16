import { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTags, tagAdded } from '../features/tags/tagsSlice';
import { fetchPhoto } from '../features/photos/photosSlice';
import FormInput from '../components/FormInput';
import { Button, Autocomplete, TextField, Tooltip } from '@mui/material';

function EditPhoto({ currentUser }) {
  const { id } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const tags = useSelector((state) => state.tags.entities)
  const photo = useSelector((state) => state.photos.entities)
  const [formData, setFormData] = useState({image: photo.image, description: photo.description})
  const [selectedTags, setSelectedTags] = useState(photo.tags)
  const [errors, setErrors] = useState([])
  const [errorHelper, setErrorHelper] = useState("")

  useEffect(() => {
    dispatch(fetchTags())
    dispatch(fetchPhoto(id))
  }, [dispatch])

  useEffect(() => {
    if(photo.image) {
      setFormData({image: photo.image, description: photo.description})
    }
  }, [photo.image])

  useEffect(() => {
    if(photo.tags) {
      setSelectedTags(photo.tags)
    }
  }, [photo.tags])

  function handleSubmit(event) {
    event.preventDefault()

    fetch(`/photos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then((r) => {
      if (r.ok) {
        r.json().then((photo) => {
          if(photo.tags.length > 0) {
            photo.tags.map((tag) => {
              fetch(`/photo_tags/${photo.id}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json"
                }
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

          if(selectedTags.length > 0) {
            selectedTags.map((tag) => {
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
        }).then(() => {
          history.push(`/users/${currentUser.id}`)
        })
      } else {
        r.json().then((err) => setErrors(err.errors.map((error) => error.toLowerCase())))
      }
    })
  }

  const formInfo = [
    {label: "Image", type: "url", value: formData.image, name: "image", helper: "Copy image address"}, 
    {label: "Description", type: null, value: formData.description, name: "description", helper: " "}
  ]

  return (
    <div className="EditPhoto">
      <img src={formData.image} height="150px" />
      {formData.image !== "" && selectedTags ? (
        <div className="form">
          {formInfo.map( item => <FormInput errors={errors.filter((err) => err.includes(item.name))} item={item} formData={formData} setFormData={setFormData} /> )}
          <Autocomplete
            multiple
            id="tags"
            className="form-input"
            options={tags}
            getOptionLabel={(option) => option.name}
            value={selectedTags}
            onChange={(event, newValue) => {
              setSelectedTags(newValue)
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
            renderInput={(params) => (
              errorHelper ? (
                <TextField
                  {...params}
                  error
                  label="Tags"
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
            Edit Photo
          </Button>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  )
}

export default EditPhoto;
