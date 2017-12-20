class TrailsController < ApplicationController

def index
  @trails = Trail.all
  @geojson = Array.new

  @trails.each do |trail|
    @geojson << {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [trail.longitude, trail.latitude]
      },
        properties: {
          name: trail.name,
          location: trail.location,
          length: trail.length,
          :'marker-color' => '#00607d',
          :'marker-symbol' => 'circle',
          :'marker-size' => 'medium'
        }
      }
    end
    respond_to do |format|
      format.html
      format.json { render json: @geojson }
    end
  end
end
