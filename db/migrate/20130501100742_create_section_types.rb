class CreateSectionTypes < ActiveRecord::Migration
  def change
    create_table :section_types do |t|
      t.text :title
      t.text :description
      t.text :questions

      t.timestamps
    end
  end
end
