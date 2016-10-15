class UsersController < ApplicationController
  before_action :set_user, only: :show

  def index 
    @users = User.all
    render json: @users
  end

  def show 
    if @user
      render json: @user.snippets
    else 
      render json: @user
    end
    
  end

  private 

  def set_user  
    @user = User.find(params[:id])
  end
end
