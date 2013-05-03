class CreateSections < ActiveRecord::Migration
  def change
    create_table :sections do |t|
      t.text :data
      t.integer :project_id

      t.timestamps
    end
  end
end
