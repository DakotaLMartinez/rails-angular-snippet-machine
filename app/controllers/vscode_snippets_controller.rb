class VscodeSnippetsController < ApplicationController
  before_action :set_snippet, only: :show
  before_action :set_user, only: [:language]
  # before_action :authenticate_user!, only: [:language]

  # get 'api/user_snippets/:id'
  def show 
    render json: @snippet.body
  end

  # get 'api/user_snippets/:user_id/language/:language'
  def language 
    lang = params[:language]
    @snippets = @user.snippets.where('language = ?', lang)
    response = {}
    @snippets.each do |s|
      name = s.name
      snippet = {}
      snippet['prefix'] = s.trigger
      snippet['body'] = s.vscode
      snippet['description'] = s.description
      response[name] = snippet
    end
    render json: response
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
