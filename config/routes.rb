Startupality::Application.routes.draw do
  root :to => 'angular#angular'
  match 'angular/angular' => 'angular#angular'

  devise_for :users, :controllers => { :sessions => "sessions", :registrations => "registrations" }
  #Notice for confirmation of e-mail
  devise_scope :user do get "/registrations/notification" => "registrations#notification" end

  resources :users

  namespace :api do
    resources :instructional_videos
    resources :section_types
    resources :checklist_steps
    resources :projects do
      collection do
        get 'getActivated'
      end
      resources :sections do
        resources :section_types
      end
      resources :risks
      resources :revenueOrExpenses
      resources :expenses
      resources :cards
      resources :hypotheses
      resources :project_checklist_steps
      resources :register_risks
    end


    resources :userutil do
      post :fetch_current_user, :on => :collection
      get :get_users_select2, :on => :collection
    end

  end

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
