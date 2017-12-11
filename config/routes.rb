Rails.application.routes.draw do
  root "static_pages#index"

  resources :songs

  namespace :api do
    namespace :v1 do
      resources :songs
    end
  end
end
