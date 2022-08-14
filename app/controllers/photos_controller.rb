class PhotosController < ApplicationController
  skip_before_action :authorize, only: [:index, :search, :random_five, :show]

  def index
    photos = Photo.all.reverse()
    render json: photos
  end

  def search
    keyword = params[:keyword]
    photos = Photo.where("description like ?", "%#{keyword}%")
    render json: photos
  end

  def random_five
    photos = Photo.all.shuffle.take(5)
    render json: photos
  end

  def show
    photo = find_photo
    render json: photo
  end

  def create
    photo = @current_user.photos.create!(photo_params)
    render json: photo, status: :created
  end

  def update
    photo = find_photo
    photo.update!(photo_params)
    render json: photo
  end

  def destroy
    photo = find_photo
    photo.destroy
    head :no_content
  end

  private

  def find_photo
    Photo.find(params[:id])
  end

  def photo_params
    params.permit(:image, :description, :user_id)
  end
end
