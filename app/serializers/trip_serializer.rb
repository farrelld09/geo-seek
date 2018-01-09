class TripSerializer < ActiveModel::Serializer
  attributes :id,
            :name,
            :user_id,
            :current_user

  def current_user
    scope.current_user
  end
end
