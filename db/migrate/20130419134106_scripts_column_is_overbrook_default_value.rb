class ScriptsColumnIsOverbrookDefaultValue < ActiveRecord::Migration
  def change
  		change_column :scripts, :is_overbrook,:boolean, :default => false
  end

end
