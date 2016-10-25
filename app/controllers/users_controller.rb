class UsersController < ApplicationController
  before_action :set_user, only: [:show, :snippet_ids, :permissions]

  def index 
    @users = User.all
    render json: @users
  end

  def show 
    render json: @user.snippets.order(updated_at: 'desc')
  end

  # get /users/:id/permissions
  def permissions 
    response = {
      can_edit: {},
      can_download: {}
    }
    @user.snippets.each do |s|
      if @user === s.user
        response[:can_edit][s.id] = true
        response[:can_download][s.id] = true
      else
        response[:can_download][s.id] = true
      end
    end
    render json: response
  end

  private 

  def set_user  
    @user = User.find(params[:id])
    if !@user 
      render json: 'User not found', status: :not_found
    end
  end
end
