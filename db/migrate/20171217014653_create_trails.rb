class CreateTrails < ActiveRecord::Migration[5.1]
  def change
    create_table :trails do |t|
      t.string :name, null: false
      t.string :type
      t.string :summary
      t.string :difficulty
      t.integer :stars
      t.integer :starVotes
      t.string :location
      t.string :url
      t.string :imgSqSmall
      t.string :imgSmall
      t.string :imgSmallMed
      t.string :imgMedium
      t.integer :length
      t.integer :ascent
      t.integer :descent
      t.integer :high
      t.integer :low
      t.integer :longitude
      t.integer :latitude
      t.string :conditionStatus
      t.string :conditionDetails
      t.datetime :conditionDate

      t.timestamps
    end
  end
end
