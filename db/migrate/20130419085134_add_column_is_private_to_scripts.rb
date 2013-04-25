class AddColumnIsPrivateToScripts < ActiveRecord::Migration
  def change
  		add_column :scripts, :is_private, :boolean,:default => false
  end
end
