class DropboxController < ApplicationController
  
  def authorize 
    consumer      = Dropbox::API::OAuth.consumer(:authorize)
    request_token = consumer.get_request_token
    dropbox_callback_url = url_for(controller: 'dropbox', action: 'connect')
    set_redirect_url(dropbox_callback_url)
    url = request_token.authorize_url(:oauth_callback => dropbox_callback_url)
    redirect_to url
    session[:dropbox_oauth_request_token]  = request_token.token
    session[:dropbox_oauth_request_secret] = request_token.secret
  end

  def connect
    consumer      = Dropbox::API::OAuth.consumer(:authorize)
    request_token = OAuth::RequestToken.new(consumer, session[:dropbox_oauth_request_token], session[:dropbox_oauth_request_secret])
    begin
      access_token = request_token.get_access_token
      session[:dropbox_token] = access_token.token
      session[:dropbox_secret] = access_token.secret
      session[:dropbox_uid] = params[:uid]
      create_folders
    rescue OAuth::Unauthorized => e
      render json: "Couldn't authorize with Dropbox (#{e.message})"
    end
    @redirect_url = get_redirect_url
    redirect_to @redirect_url
  end

  private

  def create_folders
    client = Dropbox::API::Client.new(token: session[:dropbox_token], secret: session[:dropbox_secret])
      
    begin client.mkdir('vscode') rescue {} end
    begin client.mkdir('sublime') rescue {} end
    begin client.mkdir('sublime/User') rescue {} end
    @response = client.ls
  end

  def authenticate_dropbox
    redirect_to dropbox_path if dropbox.nil?
  end

  def dropbox
    if dropbox_enabled?
      Dropbox::API::Client.new({
        :token => dropbox_token,
        :secret => dropbox_secret
      })
    end
  end

  def dropbox_enabled?
    dropbox_token && dropbox_secret
  end

  def dropbox_token
    session[:dropbox_token]
  end

  def dropbox_secret
    session[:dropbox_secret]
  end


end
