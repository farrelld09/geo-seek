class CreateSongs < ActiveRecord::Migration[5.1]
  def change
    create_table :songs do |t|
      t.string :artist, null: false
      t.string :title, null: false
      t.string :lyrics, null: false
    end
  end
end
