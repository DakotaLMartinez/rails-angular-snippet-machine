class SnippetsController < ApplicationController
  before_action :set_snippet, only: [:show, :update, :destroy]
  before_action :authenticate_user!, only: [:create, :update, :destroy]

  # GET /snippets
  def index
    @snippets = Snippet.all

    render json: @snippets
  end

  # GET /snippets/1
  def show
    render json: @snippet
  end

  # POST /snippets
  def create
    @snippet = Snippet.new(snippet_params)
    @snippet.user = current_user

    if @snippet.save
      render json: @snippet, status: :created, location: @snippet
    else
      render json: @snippet.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /snippets/1
  def update
    if is_my_snippet?(@snippet)
      attributes = snippet_params.merge(user: current_user)
      if @snippet.update(attributes)
        render json: @snippet
      else
        render json: @snippet.errors, status: :unprocessable_entity
      end
    else
      @snippet.errors.add(:user, "can't edit other user's snippets. Please fork this snippet to your account first.")
      render json: @snippet.errors, status: :unauthorized
    end
  end

  # DELETE /snippets/1
  def destroy
    if is_my_snippet?(@snippet)
      @snippet.destroy
      render json: @snippet
    else 
      @snippet.errors['unauthorized'] = ["- only the creator of a snippet can delete it"]
      render json: @snippet.errors, status: :unauthorized
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_snippet
      @snippet = Snippet.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def snippet_params
      params.require(:snippet).permit(:name, :description, :language, :trigger, :body)
    end

    def is_my_snippet?(snippet)
      snippet.user === current_user
    end
end
