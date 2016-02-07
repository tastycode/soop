class CreatePatrons < ActiveRecord::Migration
  def change
    create_table :patrons do |t|
      t.string :fullname
      t.string :email
      t.decimal :location_lat
      t.decimal :location_lng
      t.string :address
      t.string :city
      t.string :state
      t.integer :stripe_id
      t.string :stripe_state
      t.integer :count

      t.timestamps null: false
    end
  end
end
