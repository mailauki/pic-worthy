# README

## PicWorthy
This is a website for posting, liking, and commenting on photos.

## Functionality
* The user can either Signup or Login.

* The user can post, edit, and delete their own photos.

* The user can like and comment on other users' photos.

* The user can follow and unfollow other users.

* The user can search for users by the user's username, for tags by name, or for photos by description.

## Run
To run this project locally, clone and install dependencies. 
Use `bundle install` for Ruby, and `npm install` within the client directory for React.
Run the local server with `rails s` for Ruby, and `npm start --prefix client` for React.

## Dependencies
### Created using: 
Database:
* ruby: 2.7.4
* adapter: PostgreSQL

Gems:
* rails: ~> 7.0.3
* bcrypt: ~> 3.1.7
* active_model_serializers: ~> 0.10.13

Client:
* react: ^18.2.0
* react-dom: ^18.2.0
* react-router-dom: ^5.3.3
* react-redux: ^8.0.2
* @reduxjs/toolkit: ^1.8.3

Material UI - https://mui.com: 
* @mui/material: ^5.9.2
* @mui/icons-material: ^5.8.4

Swiper - https://swiperjs.com: 
* swiper: ^8.3.2

## Deployment
Deployed on https://pic-worthy-project.herokuapp.com with Heroku.

## Inspiration
Based from [Instagram](https://www.instagram.com).
Design inspired by [Insthetic Social Media Mobile App](https://dribbble.com/shots/17122481-Insthetic-Social-Media-Mobile-App?utm_source=Clipboard_Shot&utm_campaign=DhimasRasyad&utm_content=Insthetic%20Social%20Media%20Mobile%20App&utm_medium=Social_Share&utm_source=Clipboard_Shot&utm_campaign=DhimasRasyad&utm_content=Insthetic%20Social%20Media%20Mobile%20App&utm_medium=Social_Share).

## Photos
Photos gathered from but not limited to https://unsplash.com.

## Roadmap
* Add a Comments tab on Search page. 

* Add a way to delete unused tags.

* Add ascending/descending or shuffle sort option to photos on the user's profile.

* Make comment's delete button show only on hover.
