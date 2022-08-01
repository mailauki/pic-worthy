class PhotosController < ApplicationController

  def index
    photos = Photo.all
    render json: photos
  end

  def show
    photo = find_photo
    render json: photo
  end

  def create
    photo = @current_user.photos.create!(photo_params)
    # photo.tags.create!(tag_params)
    render json: photo, status: :created
  end

  private

  def photo_params
    params.permit(:image, :description, :user_id, :tags => [])
  end
end
