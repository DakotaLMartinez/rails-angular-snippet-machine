class SnippetsController < ApplicationController
  before_action :set_snippet, only: [:show, :update, :destroy, :add_snippet, :remove_snippet]
  before_action :authenticate_user!, only: [:create, :update, :destroy, :add_snippet, :remove_snippet]

  # GET /snippets
  def index
    @snippets = Snippet.all.order(updated_at: 'desc')

    render json: @snippets
  end

  # GET /snippets/1
  def show
    render json: @snippet
  end

  # POST /snippets
  def create
    @snippet = current_user.snippets.build(snippet_params)

    language = find_language(params[:language])
    
    if language
      @snippet.language = language
      @snippet.user = current_user
      @snippet.author = current_user.email
      if current_user.add_snippet(@snippet)
        render json: @snippet, status: :created, location: @snippet
      else
        message = "must be unique for snippets in #{language.name}"
        @snippet.errors.add(:trigger, message)
        render json: @snippet.errors, status: :unprocessable_entity
      end
    end
  end

  # PATCH/PUT /snippets/1
  def update
    if is_my_snippet?(@snippet)
      language = find_language(params[:language])

      if language 
        @snippet.user = current_user
        @snippet.name = snippet_params[:name] 
        @snippet.description = snippet_params[:description]
        @snippet.language = language
        @snippet.trigger = snippet_params[:trigger]
        @snippet.body = snippet_params[:body]
      end
  
      if current_user.update_snippet(@snippet)
        render json: @snippet
      else 
        @snippet.errors.add(:trigger, "must be unique for your snippets in #{language.name}")
        render json: @snippet.errors, status: :unprocessable_entity
      end
    else
      @snippet.errors.add(:user, "can't edit other user's snippets. Please add this snippet to your account first.")
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

  # GET /snippets/:id/add_snippet
  def add_snippet 
    begin
      current_user.add_snippet(@snippet)
      render json: UserSnippet.exists?(user: current_user, snippet: @snippet)
    rescue
      render json: @snippet.errors.full_messages
    end
  end

  # GET /snippets/:id/remove_snippet 
  def remove_snippet
    begin 
      current_user.remove_snippet(@snippet)
      render json: UserSnippet.exists?(user: current_user, snippet: @snippet)
    rescue 
      render json: @snippet.errors.full_messages
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_snippet
      @snippet = Snippet.find(params[:id])
    end

    def find_language(language_name)
      begin
        language = Language.find_or_create_by(name: language_name)
      rescue 
        @snippet.errors.add(:language, 'not supported')
        render json: @snippet.errors, status: :unprocessable_entity
      end
      language if language
    end

    # Only allow a trusted parameter "white list" through.
    def snippet_params
      params.require(:snippet).permit(:name, :description, :language, :trigger, :body, :vscode)
    end

    def is_my_snippet?(snippet)
      snippet.user === current_user
    end
end
