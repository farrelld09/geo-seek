class HikeSerializer < ActiveModel::Serializer
  attributes :id,
            :trail_id,
            :trip_id,
            :rank
end
