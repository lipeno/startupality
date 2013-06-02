class DropLevelsTable < ActiveRecord::Migration
  def up
    drop_table :levels
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
