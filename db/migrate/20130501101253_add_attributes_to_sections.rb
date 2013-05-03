class AddAttributesToSections < ActiveRecord::Migration
  def change
    add_column :sections, :tags, :text
    add_column :sections, :section_type_id, :integer
    add_index :sections, :section_type_id
  end
end
