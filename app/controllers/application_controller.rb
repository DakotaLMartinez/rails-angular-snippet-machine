class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  include ActionController::UrlFor

  def set_redirect_url(url)
    if url.match(/localhost/)
      @redirect_url = "http://localhost:3000"
    else 
      @redirect_url = "http://snippetmachine.dakotaleemartinez.com"
    end
    @redirect_url
  end

  def get_redirect_url
    if url_for(controller: 'dropbox', action: 'connect').match(/localhost/)
      "http://localhost:3000"
    else 
      "http://snippetmachine.dakotaleemartinez.com"
    end
  end
  
  # protect_from_forgery with: :exception, if: Proc.new { |c| c.request.format != 'application/json' }
  # protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format == 'application/json' }
end
