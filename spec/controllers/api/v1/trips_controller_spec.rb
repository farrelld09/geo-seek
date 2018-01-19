require 'rails_helper'
require 'spec_helper'

RSpec.describe Api::V1::TripsController, type: :controller do
  let!(:user) do
    User.create(
      first_name: 'Dan'
    )
  end
  let!(:trip) do
    Trip.create(
      name: 'trip1',
      user: user
    )
  end

  before do
    allow(controller).to receive(:current_user) { user }
  end

  describe 'GET#index' do
    it 'returns a list of all the trips' do
      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')
      expect(returned_json.length).to eq 1
      expect(returned_json['trips'][0]['id']).to eq trip.id
      expect(returned_json['trips'][0]['name']).to eq 'trip1'
      expect(returned_json['trips'][0]['user_id']).to eq user.id
    end
  end

  describe 'GET#show' do
    it 'returns a single trip' do
      get :show, params: { id: trip.id }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')
      expect(returned_json['trip']['id']).to eq trip.id
      expect(returned_json['trip']['name']).to eq 'trip1'
      expect(returned_json['trip']['user_id']).to eq user.id
    end
  end

  describe 'POST#create' do
    it 'posts a single trip' do
      params =
        {
          trip:
            {
              name: 'trip2',
              user_id: user.id
            }
        }

      expect { post :create, params: params }.to change(Trip, :count).by(1)
    end
  end
end
