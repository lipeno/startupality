class DropScriptsTable < ActiveRecord::Migration
  def up
    drop_table :scripts
    drop_table :scripts_coverages
    drop_table :scripts_users
    drop_table :script_files
    drop_table :reviews
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
