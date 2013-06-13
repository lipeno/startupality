class AddFkToCheckListStep < ActiveRecord::Migration
  def change
    add_column :checklist_steps, :section_type_id, :integer
  end
end
