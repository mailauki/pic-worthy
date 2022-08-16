class CommentsController < ApplicationController

  def create
    comment = @current_user.comments.create!(comment_params)
    render json: comment, status: :created
  end

  def destroy
    comment = Comment.find(params[:id])
    comment.destroy
    head :no_content
  end

  private

  def comment_params
    params.permit(:text, :photo_id, :user_id)
  end
end
