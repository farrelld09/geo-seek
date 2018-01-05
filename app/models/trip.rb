class Trip < ApplicationRecord
  validates :name, presence: true

  belongs_to :user
  has_many :hikes
  has_many :trails, :through => :hikes
end
