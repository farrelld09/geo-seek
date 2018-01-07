class TripsController < ApplicationController
  def index
    @trips = Trip.where(user_id: current_user.id)
  end

  def show
    @trip = Trip.find(params[:id])
    @hikes = @trip.hikes
  end
end
