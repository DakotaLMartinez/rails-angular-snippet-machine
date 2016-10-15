class UsersController < ApplicationController
  before_action :set_user

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
