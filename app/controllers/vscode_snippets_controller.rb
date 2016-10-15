class VscodeSnippetsController < ApplicationController
  before_action :set_snippet

  def show 
    render json: @snippet.body
  end

  private 

  def set_snippet 
    @snippet = Snippet.find(params[:id])
  end
end
