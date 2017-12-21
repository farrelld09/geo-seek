class Api::V1::TrailsController < ApiController

  def index
    trails = Trail.all
    render json: trails
  end

  def show
    render json: Trail.find(params[:id])
  end

  def create
    trail = Trail.new(trail_params)
    if trail.save
      render json: trail
    else
      render json:
      { error: trail.errors.full_messages },
        status: :unprocessable_entity
    end
  end

  private

  def trail_params
    params.require(:trail).permit(
      :id,
      :name,
      :summary,
      :difficulty,
      :stars,
      :starVotes,
      :location,
      :url,
      :imgSqSmall,
      :imgSmall,
      :imgSmallMed,
      :imgMedium,
      :length,
      :ascent,
      :descent,
      :high,
      :low,
      :longitude,
      :latitude,
      :conditionStatus,
      :conditionDetails,
      :conditionDate,
      )
    end
  end
