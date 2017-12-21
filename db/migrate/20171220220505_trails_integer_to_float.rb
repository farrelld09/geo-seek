class TrailsIntegerToFloat < ActiveRecord::Migration[5.1]
  def change
    change_column :trails, :stars, :float
    change_column :trails, :length, :float
    change_column :trails, :latitude, :float
    change_column :trails, :longitude, :float
  end
end
