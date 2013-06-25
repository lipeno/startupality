class RemoveRedundantColumns < ActiveRecord::Migration
  def change
    remove_column :checklist_steps, :sectionTypeIdentifier
    remove_column :project_checklist_steps, :sectionTypeIdentifier
    remove_column :sections, :sectionTypeIdentifier
  end
end
