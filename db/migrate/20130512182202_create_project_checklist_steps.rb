class CreateProjectChecklistSteps < ActiveRecord::Migration
  def change
    create_table :project_checklist_steps do |t|
      t.string :value
      t.boolean :done
      t.string :sectionTypeIdentifier
      t.integer :project_id
      t.integer :stepNumber

      t.timestamps
    end
  end
end
