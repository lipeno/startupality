class CreateHypotheses < ActiveRecord::Migration
  def change
    create_table :hypotheses do |t|
      t.string :title
      t.string :board
      t.integer :project_id

      t.timestamps
    end
  end
end