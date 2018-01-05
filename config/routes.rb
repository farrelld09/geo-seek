Rails.application.routes.draw do
  devise_for :users
  root to: 'home#index'
  get 'auth/:provider/callback', to: 'sessions#create'
  get 'logout', to: 'sessions#destroy'

  resources :trails
  resources :users
  resources :trips
  resources :hikes

  namespace :api do
    namespace :v1 do
      resources :trips
      resources :trails
      resources :hikes
    end
  end
end
