class Hike < ApplicationRecord
  belongs_to :trail
  belongs_to :trip

  validates :rank, numericality: { only_integer: true }
end
