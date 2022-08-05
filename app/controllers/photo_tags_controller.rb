class PhotoTagsController < ApplicationController
  skip_before_action :authorize, only: [:index, :create]
  
  def create
    # photo_tag = PhotoTag.create!(photo_tag_params)
    # photo = find_photo
    # photo_tag = photo.tags.create!(photo_tag_params)
    photo_tag = PhotoTag.create!(photo_tag_params)
    render json: photo_tag, status: :created
  end

  def destroy
    photo = find_photo
    photo_tag = photo.tags.find_by_tag
    render json: photo_tag, status: :created
  end

  private

  def find_photo
    Photo.find_by(photo_id: params[:id])
  end
  
  def find_by_tag
    find_by(tag_id: params[:id])
  end

  def photo_tag_params
    params.permit(:photo_id, :tag_id)
  end
end
