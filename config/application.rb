require_relative 'boot'

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "action_cable/engine"
# require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module RailsAngularSnippets
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.autoload_paths << Rails.root.join('app/services')

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.generators do |g|
      g.test_framework :rspec,
        fixtures: false,
        view_specs: false,
        helper_specs: false,
        routing_specs: false,
        request_specs: false,
        controller_specs: true
    end

    config.middleware.insert_before 0, Rack::Cors do 
      allow do 
        origins '*'
        resource '*',
          :headers => :any, 
          :expose => ['access-token', 'expiry', 'token-type', 'uid', 'client'],
          :methods => [:get, :post, :options, :delete, :put]
      end
    end

    config.api_only = true
    config.from_file 'settings.yml'
    config.from_file 'settings.local.yml'

    config.middleware.use ActionDispatch::Cookies
    config.middleware.insert_after(ActionDispatch::Cookies, ActionDispatch::Session::CookieStore)
    config.middleware.use OmniAuth::Builder do
      provider :dropbox, Rails.configuration.dropbox.app_key, Rails.configuration.dropbox.secret_key
    end
  end
end
