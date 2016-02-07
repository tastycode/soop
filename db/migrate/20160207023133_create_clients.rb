class CreateClients < ActiveRecord::Migration
  def change
    create_table :clients do |t|
      t.string :fullname
      t.string :address
      t.string :address2
      t.string :city
      t.string :state
      t.string :zip
      t.decimal :location_lat
      t.decimal :location_lng
      t.boolean :anonymous
      t.integer :count
      t.string :tastes
      t.string :restrictions
      t.string :state

      t.timestamps null: false
    end
  end
end
