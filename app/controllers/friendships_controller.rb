class FriendshipsController < ApplicationController

  def create
    friendship = Friendship.create!(friendship_params)
    render json: friendship, status: :created
  end

  def destroy
    friendship = find_friendship
    friendship.destroy
    head :no_content
  end

  private

  def find_friendship
    Friendship.find_by!({follower_id: session[:user_id], followee_id: params[:id]})
  end

  def friendship_params
    params.permit(:id, :followee_id, :follower_id)
  end
end
