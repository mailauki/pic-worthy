class CommentsController < ApplicationController

  def create
    comment = @current_user.comments.create!(comment_params)
    render json: comment, status: :created
  end

  private

  def comment_params
    params.permit(:text, :photo_id)
  end
end
