class CreateTableScriptsUsers < ActiveRecord::Migration
	def change
		create_table :scripts_users do |t|
			t.integer :script_id
			t.integer :user_id
		end
		add_index :scripts_users, [:script_id, :user_id], :unique => true
		add_index :scripts_users, :user_id
		add_index :scripts_users, :script_id
	end
end
