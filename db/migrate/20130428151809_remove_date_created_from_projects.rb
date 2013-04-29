class RemoveDateCreatedFromProjects < ActiveRecord::Migration
  def up
    remove_column :projects, :dateCreated
  end

  def down
    add_column :projects, :dateCreated, :datetime
  end
end
