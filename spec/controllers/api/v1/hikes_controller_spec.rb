require 'rails_helper'
require 'spec_helper'

RSpec.describe Api::V1::HikesController, type: :controller do
  let!(:user) do
    User.create(
      first_name: 'Dan'
    )
  end

  let!(:trip) do
    Trip.create(
      name: 'trip1',
      user_id: user.id
      )
  end

  let!(:trail) do
    Trail.create(
      name: 'trail1'
    )
  end

  let!(:hike) do
    Hike.create(
      rank: '1',
      trail_id: trail.id,
      trip_id: trip.id
    )
  end

  before do
    allow(controller).to receive(:current_user) { user }
  end

  describe 'GET#index' do
    it 'returns a list of all the hikes for that trip' do
      get :index, params: { id: trip.id }
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')
      expect(returned_json.length).to eq 1
      expect(returned_json['hikes'][0]['id']).to eq hike.id
      expect(returned_json['hikes'][0]['rank']).to eq 1
      expect(returned_json['hikes'][0]['trail_id']).to eq trail.id
      expect(returned_json['hikes'][0]['trip_id']).to eq trip.id
    end
  end

  describe 'POST#create' do
    it 'posts a single hike' do
      params =
        {
          hike:
            {
              rank: 1,
              trip_id: trip.id,
              trail_id: trail.id
            }
        }

      expect { post :create, params: params }.to change(Hike, :count).by(1)
    end
  end
end
