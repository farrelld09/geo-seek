require 'rails_helper'
require 'spec_helper'

RSpec.describe Api::V1::HikesController, type: :controller do
  let!(:user) do
    User.create(
      id: '2',
      first_name: 'Dan'
    )
  end

  let!(:trip) do
    Trip.create(
      id: '1',
      name: 'trip1',
      user_id: 2
      )
  end

  let!(:trail) do
    Trail.create(
      id: '1'
    )
  end

  binding.pry

  let!(:hike) do
    Hike.create(
      id: '1',
      rank: 1,
      trail_id: 1,
      trip_id: 1
    )
  end

  binding.pry

  before do
    allow(controller).to receive(:current_user) { user }
  end

  describe 'GET#index' do
    it 'returns a list of all the hikess' do
      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')
      expect(returned_json.length).to eq 1
      expect(returned_json['hikes'][0]['id']).to eq 1
      expect(returned_json['hikes'][0]['rank']).to eq 1
      expect(returned_json['hikes'][0]['trail_id']).to eq 1
      expect(returned_json['hikes'][0]['trip_id']).to eq 1
    end
  end

  describe 'GET#show' do
    it 'returns a single trip' do
      get :show, params: { id: trip.id }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')
      expect(returned_json['trip']['id']).to eq 2
      expect(returned_json['trip']['name']).to eq 'trip1'
      expect(returned_json['trip']['user_id']).to eq 2
    end
  end

  describe 'POST#create' do
    it 'posts a single trip' do
      params =
        {
          trip:
            {
              name: 'trip2',
              user_id: 2
            }
        }

      expect { post :create, params: params }.to change(Trip, :count).by(1)
    end
  end
end
