class AddColumnToSections < ActiveRecord::Migration
  def change
    add_column :sections, :sectionTypeIdentifier, :string
    remove_column :sections, :section_type_id
  end
end
