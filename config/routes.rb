Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: '/api/auth'
  scope '/api' do 
    resources :snippets
    get '/snippets/:id/add_snippet', to: 'snippets#add_snippet'

    get 'dropbox/', to: 'dropbox#authorize'
    get 'dropbox/connect', to: 'dropbox#connect'

    get 'dropbox/users/:user_id/add_snippets', to: 'dropbox#add_snippets', as: 'add_user_snippets'
    
    resources :users, only: [:index, :show]
    get '/users/:id/permissions', to: 'users#permissions'
  end
end
