class ChangeColumnOnProjects < ActiveRecord::Migration
  def up
    rename_column :projects, :completed, :activated
  end

  def down
    rename_column :projects, :activated, :completed
  end
end
