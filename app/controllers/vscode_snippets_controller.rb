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
    response = {}
    # render json: session
    begin
      @snippets = @user.snippets.where('language = ?', lang)
      @snippets.each do |s|
        name = s.name
        snippet = {}
        snippet['prefix'] = s.trigger
        snippet['body'] = s.vscode
        snippet['description'] = s.description
        response[name] = snippet
      end
      render json: response
    rescue
      response["errors"] = ["no snippets found for this user in #{lang}"]
      render json: response, status: :not_found
    end
  end

  private 

  def set_snippet 
    @snippet = Snippet.find(params[:id])
  end

  def set_user 
    @user = current_user
    # User.find(params[:user_id])
  end

  def vscode_snippet_params
    params.permit(:id, :user_id, :language)
  end
end
