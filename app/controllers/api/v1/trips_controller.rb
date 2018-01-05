class Api::V1::TripsController < ApiController
  def index
    trips = Trip.where(user_id: current_user.id)
    render json: trips
  end

  def show
    render json: Trip.find(params[:id])
  end

  def create
    trip = Trip.new(trip_params)
    if trip.save
      render json: trip
    else
      render json:
      { error: trip.errors.full_messages },
      status: :unprocessable_entity
    end
  end

  private

  def trip_params
    params.require(:trip).permit(
      :id,
      :name
      )
  end
end
