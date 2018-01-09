class Trip < ApplicationRecord
  validates_presence_of :name, :user_id

  belongs_to :user
  has_many :hikes
  has_many :trails, :through => :hikes
end
