class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  include ActionController::UrlFor
  include ActionController::Cookies

  def set_redirect_url(url)
    if url.match(/localhost/)
      @redirect_url = "http://localhost:3000"
    else 
      @redirect_url = "https://snippetmachine.dakotaleemartinez.com"
    end
    @redirect_url
  end

  def get_redirect_url
    if url_for(controller: 'dropbox', action: 'connect').match(/localhost/)
      "http://localhost:3000"
    else 
      "https://snippetmachine.dakotaleemartinez.com"
    end
  end

  def authenticate_current_user 
    head :unauthorized if get_current_user.nil?
  end

  def get_current_user 
    return nil unless cookies[:auth_headers]
    auth_headers = JSON.parse(cookies[:auth_headers])

    expiration_datetime = DateTime.strptime(auth_headers["expiry"], "%s")
    current_user = User.find_by(uid: auth_headers["uid"])

    if current_user &&
       current_user.tokens.has_key?(auth_headers["client"]) &&
       expiration_datetime > DateTime.now

      @current_user = current_user
    end
    @current_user
  end
  
  # protect_from_forgery with: :exception, if: Proc.new { |c| c.request.format != 'application/json' }
  # protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format == 'application/json' }
end
