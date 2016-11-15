class DropboxController < ApplicationController
  before_action :authenticate_current_user
  before_action :authenticate_dropbox, only: [:add_snippets, :upload_existing_snippets]
  
  def authorize 
    consumer      = Dropbox::API::OAuth.consumer(:authorize)
    request_token = consumer.get_request_token
    dropbox_callback_url = url_for(controller: 'dropbox', action: 'connect')
    set_redirect_url(dropbox_callback_url)
    url = request_token.authorize_url(:oauth_callback => dropbox_callback_url)
    session[:dropbox_oauth_request_token]  = request_token.token
    session[:dropbox_oauth_request_secret] = request_token.secret
    redirect_to url
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
    redirect_to "#{get_redirect_url}/#/instructions?authorized=true"
  end

  def upload_existing_snippets
    if dropbox_enabled?
      token = session[:dropbox_token]
      secret = session[:dropbox_secret]
      @uploader = DropboxUploader.new(token, secret, get_current_user)
      message = @uploader.upload_snippets
      redirect_to "#{get_redirect_url}/#/profile?upload_count=#{message}"
    end
  end

  # get /api/dropbox/users/:user_id/add_snippets
  def add_snippets
    if dropbox_enabled?
      user = User.find_by(id: params[:user_id])
      if user
        create_folders
        user.languages.uniq.each do |lang|
          snippets_file = lang.vscode_snippets(user.id)
          dropbox.upload "vscode/snippets/#{lang.vscode}.json", snippets_file
          lang.sublime_snippets(user.id).each do |name, body|
            dropbox.upload "sublime/User/#{name}.sublime-snippet", body
          end
        end
        render json: "Successfully saved snippets to dropbox, you may now close this window."
      else
        render json: "couldn't find a user with that ID", status: :not_found
      end
    end
  end

  private

  def create_folders
    client = Dropbox::API::Client.new(token: session[:dropbox_token], secret: session[:dropbox_secret])
    begin client.mkdir('vscode') rescue {} end
    begin client.mkdir('vscode/snippets') rescue {} end
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
