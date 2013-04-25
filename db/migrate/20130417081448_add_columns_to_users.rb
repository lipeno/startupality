class AddColumnsToUsers < ActiveRecord::Migration
	def change
		add_column :users, :is_overbrook, :boolean
		add_column :users, :fullname, :string
	end
end
