class Trail < ApplicationRecord
  belongs_to :trip
  has_many :trails
end
