class CreateRegisterRisks < ActiveRecord::Migration
  def change
    create_table :register_risks do |t|
      t.integer :project_id
      t.text :name
      t.integer :probability
      t.integer :impact
      t.text :responseAction

      t.timestamps
    end
  end
end
