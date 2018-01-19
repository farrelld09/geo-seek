require 'rails_helper'
require 'spec_helper'

RSpec.describe Hike, type: :model do
  it 'is created with attributes' do
    new_hike = Hike.new

    expect(new_hike).to have_attributes(trip_id: nil)
    expect(new_hike).to have_attributes(trail_id: nil)
    expect(new_hike).to have_attributes(rank: nil)
  end

  it 'should be invalid without a rank, trip, and trail' do
    new_hike = Hike.new

   expect(new_hike.valid?).to be false
   expect(new_hike.errors.full_messages).to include("Rank is not a number")
   expect(new_hike.errors.full_messages).to include("Trail must exist")
   expect(new_hike.errors.full_messages).to include("Trip must exist")
 end
end
