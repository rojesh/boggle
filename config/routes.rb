Rails.application.routes.draw do
  scope '/api/v1' do
    resources :boggle, only: %i[index] do
      post :score, on: :collection
    end
  end
end