Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: '/api/auth'
  scope '/api' do 
    resources :snippets
    resources :users, only: [:index, :show]
  end
end
