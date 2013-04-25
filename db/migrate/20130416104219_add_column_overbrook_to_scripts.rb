class AddColumnOverbrookToScripts < ActiveRecord::Migration

	def change
		add_column :scripts, :is_overbrook, :boolean
	end
end
