class UsersController < ApplicationController
  skip_before_action :authorize, only: [:index, :show, :create]
  
  def index
    users = User.all
    render json: users
  end

  def show
    user = find_user
    render json: user
  end

  def me
    # user = User.find_by!(id: session[:user_id])
    user = @current_user
    render json: user
  end

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  def update
    user = @current_user
    user.update!(user_params)
    render json: user
  end

  def destroy
    user = find_user
    user.destroy
    head :no_content
  end

  private

  def find_user
    User.find(params[:id])
  end

  def user_params
    params.permit(:username, :password, :password_confirmation, :first_name, :avatar)
  end
end
