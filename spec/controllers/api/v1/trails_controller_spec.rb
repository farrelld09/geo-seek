require 'rails_helper'
require 'spec_helper'

RSpec.describe Api::V1::TrailsController, type: :controller do
  let!(:trail) do
    Trail.create(
      id: '2',
      name: 'trail1',
      summary: 'trail1',
      difficulty: 3,
      stars: 3,
      starVotes: 3,
      location: 'Boulder',
      url: '.com',
      imgSqSmall: 'url',
      imgSmall: 'url',
      imgSmallMed: 'url',
      imgMedium: 'url',
      length: '6',
      ascent: '6',
      descent: '6',
      high: '6',
      low: '6',
      longitude: '6',
      latitude: '6',
      conditionStatus: 'good',
      conditionDetails: 'good'
    )
  end

  describe 'GET#index' do
    it 'returns a list of all the superheroes' do
      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')
      expect(returned_json.length).to eq 1
      expect(returned_json[0]['id']).to eq 2
      expect(returned_json[0]['name']).to eq 'trail1'
      expect(returned_json[0]['summary']).to eq 'trail1'
      expect(returned_json[0]['difficulty']).to eq '3'
      expect(returned_json[0]['stars']).to eq 3
      expect(returned_json[0]['starVotes']).to eq 3
      expect(returned_json[0]['location']).to eq 'Boulder'
      expect(returned_json[0]['url']).to eq '.com'
      expect(returned_json[0]['imgSqSmall']).to eq 'url'
      expect(returned_json[0]['imgSmall']).to eq 'url'
      expect(returned_json[0]['imgSmallMed']).to eq 'url'
      expect(returned_json[0]['imgMedium']).to eq 'url'
      expect(returned_json[0]['length']).to eq 6
      expect(returned_json[0]['ascent']).to eq 6
      expect(returned_json[0]['descent']).to eq 6
      expect(returned_json[0]['high']).to eq 6
      expect(returned_json[0]['low']).to eq 6
      expect(returned_json[0]['longitude']).to eq 6
      expect(returned_json[0]['latitude']).to eq 6
      expect(returned_json[0]['conditionStatus']).to eq 'good'
      expect(returned_json[0]['conditionDetails']).to eq 'good'
    end
  end

  describe 'GET#show' do
    it 'returns a single trail' do
      get :show, params: { id: trail.id }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')
      expect(returned_json['id']).to eq 2
      expect(returned_json['name']).to eq 'trail1'
      expect(returned_json['summary']).to eq 'trail1'
      expect(returned_json['difficulty']).to eq '3'
      expect(returned_json['stars']).to eq 3
      expect(returned_json['starVotes']).to eq 3
      expect(returned_json['location']).to eq 'Boulder'
      expect(returned_json['url']).to eq '.com'
      expect(returned_json['imgSqSmall']).to eq 'url'
      expect(returned_json['imgSmall']).to eq 'url'
      expect(returned_json['imgSmallMed']).to eq 'url'
      expect(returned_json['imgMedium']).to eq 'url'
      expect(returned_json['length']).to eq 6
      expect(returned_json['ascent']).to eq 6
      expect(returned_json['descent']).to eq 6
      expect(returned_json['high']).to eq 6
      expect(returned_json['low']).to eq 6
      expect(returned_json['longitude']).to eq 6
      expect(returned_json['latitude']).to eq 6
      expect(returned_json['conditionStatus']).to eq 'good'
      expect(returned_json['conditionDetails']).to eq 'good'
    end
  end

  describe 'POST#create' do
    it 'posts a single trail' do
      params =
        {
          trail:
            {
              id: '3',
              name: 'trail1',
              summary: 'trail1',
              difficulty: '3',
              stars: '3',
              starVotes: '3',
              location: 'Boulder',
              url: '.com',
              imgSqSmall: 'url',
              imgSmall: 'url',
              imgSmallMed: 'url',
              imgMedium: 'url',
              length: '6',
              ascent: '6',
              descent: '6',
              high: '6',
              low: '6',
              longitude: '6',
              latitude: '6',
              conditionStatus: 'good',
              conditionDetails: 'good'
            }
        }

      expect { post :create, params: params }.to change(Trail, :count).by(1)
    end
  end
end
