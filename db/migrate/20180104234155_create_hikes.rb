class CreateHikes < ActiveRecord::Migration[5.1]
  def change
    create_table :hikes do |t|
      t.integer :trail_id
      t.integer :trip_id
      t.integer :rank

      t.timestamps
    end
  end
end
