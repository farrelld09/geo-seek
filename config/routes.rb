Rails.application.routes.draw do
  root "sign_in#index"

  resources :trails
  resources :users
  resources :trips
  resources :hikes

  namespace :api do
    namespace :v1 do
      resources :trails
      resources :hikes
      resources :trips do
        resources :hikes
      end
    end
  end

  get 'auth/:provider/callback', to: 'sessions#create'
  get 'logout', to: 'sessions#destroy'
  get '/*all', to: 'sign_in#index'
end
