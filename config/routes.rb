Rails.application.routes.draw do
  resources :photo_tags, only: [:create, :destroy]
  resources :friendships, only: [:create, :destroy]
  resources :likes, only: [:create, :destroy]
  resources :tags, only: [:index, :create]
  resources :comments, only: [:create]
  resources :photos
  resources :users

  post '/signup', to: 'users#create'
  get '/me', to: 'users#me'

  post '/login', to: 'session#create'
  delete 'logout', to: 'session#destroy'
  
  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
