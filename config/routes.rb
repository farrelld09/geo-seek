Rails.application.routes.draw do
  root to: 'home#index'
  get 'auth/:provider/callback', to: 'sessions#create'
  get 'logout', to: 'sessions#destroy'

  resources :trails
  resources :users

  namespace :api do
    namespace :v1 do
      resources :trails
    end
  end
end
