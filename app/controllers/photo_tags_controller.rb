class PhotoTagsController < ApplicationController
  
  def create
    # photo_tag = PhotoTag.create!(photo_tag_params)
    photo = find_photo
    photo_tag = photo.tags.create!(photo_tag_params)
    render json: photo_tag, status: :created
  end

  private

  def find_photo
    Photo.find_by(photo_id: params[:id])
  end

  def photo_tag_params
    params.permit(:photo_id, :tag_id)
  end
end
