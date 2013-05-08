class CreateRisks < ActiveRecord::Migration
  def change
    create_table :risks do |t|
      t.string :strengths
      t.string :weaknesses
      t.string :opportunitiesPolitical
      t.string :opportunitiesEconomical
      t.string :opportunitiesSociological
      t.string :opportunitiesTechnical
      t.string :threatsPolitical
      t.string :threatsEconomical
      t.string :threatsSociological
      t.string :threatsTechnical
      t.integer :project_id

      t.timestamps
    end
  end
end
