class TagsController < ApplicationController
  skip_before_action :authorize, only: [:index, :search, :show]

  def index
    tags = Tag.all.reverse()
    render json: tags
  end

  def search
    keyword = params[:keyword]
    tags = Tag.where("name like ?", "%#{keyword.downcase}%")
    render json: tags
  end

  def show
    tag = find_tag
    render json: tag
  end

  def create
    tag = Tag.create!(tag_params)
    render json: tag, status: :created
  end

  private

  def find_tag
    Tag.find(params[:id])
  end

  def tag_params
    params.permit(:name)
  end
end
