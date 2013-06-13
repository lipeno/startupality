class AddFkToProjectChecklistStep < ActiveRecord::Migration
  def change
    add_column :project_checklist_steps, :checklist_step_id, :integer
  end
end
