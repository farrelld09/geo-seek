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
      expect(returned_json['trails'][0]['id']).to eq 2
      expect(returned_json['trails'][0]['name']).to eq 'trail1'
      expect(returned_json['trails'][0]['summary']).to eq 'trail1'
      expect(returned_json['trails'][0]['difficulty']).to eq '3'
      expect(returned_json['trails'][0]['stars']).to eq 3
      expect(returned_json['trails'][0]['starVotes']).to eq 3
      expect(returned_json['trails'][0]['location']).to eq 'Boulder'
      expect(returned_json['trails'][0]['url']).to eq '.com'
      expect(returned_json['trails'][0]['imgSqSmall']).to eq 'url'
      expect(returned_json['trails'][0]['imgSmall']).to eq 'url'
      expect(returned_json['trails'][0]['imgSmallMed']).to eq 'url'
      expect(returned_json['trails'][0]['imgMedium']).to eq 'url'
      expect(returned_json['trails'][0]['length']).to eq 6
      expect(returned_json['trails'][0]['ascent']).to eq 6
      expect(returned_json['trails'][0]['descent']).to eq 6
      expect(returned_json['trails'][0]['high']).to eq 6
      expect(returned_json['trails'][0]['low']).to eq 6
      expect(returned_json['trails'][0]['longitude']).to eq 6
      expect(returned_json['trails'][0]['latitude']).to eq 6
      expect(returned_json['trails'][0]['conditionStatus']).to eq 'good'
      expect(returned_json['trails'][0]['conditionDetails']).to eq 'good'
    end
  end

  describe 'GET#show' do
    it 'returns a single trail' do
      get :show, params: { id: trail.id }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')
      expect(returned_json['trail']['id']).to eq 2
      expect(returned_json['trail']['name']).to eq 'trail1'
      expect(returned_json['trail']['summary']).to eq 'trail1'
      expect(returned_json['trail']['difficulty']).to eq '3'
      expect(returned_json['trail']['stars']).to eq 3
      expect(returned_json['trail']['starVotes']).to eq 3
      expect(returned_json['trail']['location']).to eq 'Boulder'
      expect(returned_json['trail']['url']).to eq '.com'
      expect(returned_json['trail']['imgSqSmall']).to eq 'url'
      expect(returned_json['trail']['imgSmall']).to eq 'url'
      expect(returned_json['trail']['imgSmallMed']).to eq 'url'
      expect(returned_json['trail']['imgMedium']).to eq 'url'
      expect(returned_json['trail']['length']).to eq 6
      expect(returned_json['trail']['ascent']).to eq 6
      expect(returned_json['trail']['descent']).to eq 6
      expect(returned_json['trail']['high']).to eq 6
      expect(returned_json['trail']['low']).to eq 6
      expect(returned_json['trail']['longitude']).to eq 6
      expect(returned_json['trail']['latitude']).to eq 6
      expect(returned_json['trail']['conditionStatus']).to eq 'good'
      expect(returned_json['trail']['conditionDetails']).to eq 'good'
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
