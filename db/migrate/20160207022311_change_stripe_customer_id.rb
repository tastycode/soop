class ChangeStripeCustomerId < ActiveRecord::Migration
  def change
    change_table :patrons do

    end
    change_column :patrons, :stripe_id, :string, :null => false

  end
end
