class SessionController < ApplicationController

  def create
    user = find_by_username
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user
    else
      render json: { errors: ["Invalid username or password"] }, status: :unauthorized
    end
    # try to implement invalid password message vs nonexistent user
  end

  def destroy
    session.delete :user_id
    head :no_content
  end
end
