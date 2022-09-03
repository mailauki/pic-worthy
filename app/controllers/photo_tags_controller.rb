class PhotoTagsController < ApplicationController
  
  def create
    photo_tag = PhotoTag.create!(photo_tag_params)
    render json: photo_tag, status: :created
  end

  def destroy
    photo = find_photo
    photo_tag = photo.photo_tags.all.select do |tag|
      tag.destroy
    end
    photo_tag = PhotoTag.find(params[:id])
    photo_tag.destroy
    head :no_content
  end

  private

  def find_photo
    Photo.find(params[:id])
  end
  
  def find_by_tag
    find_by(tag_id: params[:id])
  end

  def photo_tag_params
    params.permit(:photo_id, :tag_id)
  end
end
