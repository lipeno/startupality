class CreateChecklistSteps < ActiveRecord::Migration
  def change
    create_table :checklist_steps do |t|
      t.string :title
      t.string :sectionTypeIdentifier
      t.integer :stepNumber

      t.timestamps
    end
  end
end
