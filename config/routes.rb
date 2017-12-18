Rails.application.routes.draw do
  root to: 'home#index'
  get 'auth/:provider/callback', to: 'sessions#create'
  get 'logout', to: 'sessions#destroy'
  # get '/auth/google_oauth2', to: 'sessions#create'
end
