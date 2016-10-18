class DropboxController < ApplicationController


  private

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
