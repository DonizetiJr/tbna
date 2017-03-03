Rails.application.routes.draw do
  resources :contacts, only: [:new, :create]

  get 'welcome/index'
  root 'welcome#index'
end
