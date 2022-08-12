class FriendshipsController < ApplicationController
  skip_before_action :authorize, only: :index

  def followers
    if params[:user_id]
      user = User.find(params[:user_id])
      followers = user.followers
    else
      followers = Friendship.all
    end
    render json: followers
  end

  def followees
    if params[:user_id]
      user = User.find(params[:user_id])
      followees = user.followees
    else
      followees = Friendship.all
    end
    render json: followees
  end

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
