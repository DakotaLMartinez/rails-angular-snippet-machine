class VscodeSnippetsController < ApplicationController
  before_action :set_snippet, only: :show
  before_action :set_user, only: [:language]
  # before_action :authenticate_user!, only: [:language]

  def show 
    render json: @snippet.body
  end

  def language 
    lang = params[:language]
    @snippets = @user.snippets.where('language = ?', lang)
    response = {}
    @snippets.each do |s|
      name = s.name
      # snippet = {}
      # snippet['prefix'] = s.trigger
      # snippet['body'] = s.body
      # snippet['description'] = s.description
      # response[name] = snippet
      response[name] = s
    end
    render json: response
    # @snippets = @user.snippets.where('language =', lang)
    # render
  end

  private 

  def set_snippet 
    @snippet = Snippet.find(params[:id])
  end

  def set_user 
    @user = User.find(params[:user_id])
  end

  def vscode_snippet_params
    params.permit(:id, :user_id, :language)
  end
end
