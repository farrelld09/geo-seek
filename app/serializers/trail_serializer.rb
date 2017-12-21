class TrailSerializer < ActiveModel::Serializer
  attributes :id,
            :name,
            :summary,
            :difficulty.
            :stars,
            :starVotes,
            :location,
            :url,
            :imgSqSmall,
            :imgSmall,
            :imgSmallMed,
            :imgMedium,
            :length,
            :ascent,
            :descent,
            :high,
            :low,
            :longitude,
            :latitude,
            :conditionStatus,
            :conditionDetails,
            :conditionDate
end