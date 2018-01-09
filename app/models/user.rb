class User < ApplicationRecord
  has_many :trips
  def self.update_or_create(auth)
    user = User.find_by(uid: auth[:uid]) || User.new
    user.attributes = {
      provider: auth[:provider],
      uid: auth[:uid],
      email: auth[:info][:email],
      first_name: auth[:info][:first_name],
      last_name: auth[:info][:last_name],
      token: auth[:credentials][:token],
      refresh_token: auth[:credentials][:refresh_token],
      oauth_expires_at: auth[:credentials][:expires_at]
    }
    unless User.find_by(uid: auth[:uid])
      user.save!
      example_trip = Trip.create(name: "Example Trip", user: user)
      user
    else
      user.save!
      user
    end
  end
end
