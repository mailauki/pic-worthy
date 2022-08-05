class TagsController < ApplicationController
  skip_before_action :authorize, only: [:index, :create]

  def index
    tags = Tag.all
    render json: tags
  end

  def create
    tag = Tag.create(tag_params)
    render json: tag, status: :created
  end

  private

  def tag_params
    params.permit(:name)
  end
end
