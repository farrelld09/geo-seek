class Api::V1::HikesController < ApiController
  def index
    myhikes = Hike.where(trip_id: params[:trip_id])
    render json: myhikes
  end

  def create
    hike = Hike.new(hike_params)
    if hike.save
      render json: hike
    else
      render json:
      { error: hike.errors.full_messages },
      status: :unprocessable_entity
    end
  end

  def destroy
    binding.pry
    @hike = Hike.where(trail_id: params[:trail_id])
    @hike.delete
  end

  private

  def hike_params
    params.require(:hike).permit(
      :trail_id,
      :trip_id,
      :rank
      )
  end
end
