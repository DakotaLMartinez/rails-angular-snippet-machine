Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: '/api/auth'
  scope '/api' do 
    resources :snippets
    
    get 'user_snippets/:user_id/language/:language', to: 'vscode_snippets#language'
    resources :vscode_snippets, only: [:show]
    
    resources :users, only: [:index, :show]
  end
end
