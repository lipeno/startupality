class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :title
      t.string :board
      t.integer :project_id

      t.timestamps
    end
  end
end
