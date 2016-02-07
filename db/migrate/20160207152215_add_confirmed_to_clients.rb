class AddConfirmedToClients < ActiveRecord::Migration
  def change
    add_column :clients, :confirmed, :boolean
  end
end
