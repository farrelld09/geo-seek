class CreateHikes < ActiveRecord::Migration[5.1]
  def change
    create_table :hikes do |t|
      t.belongs_to :trip
      t.belongs_to :trail
      t.integer :rank

      t.timestamps
    end
  end
end
