class AddStringIdentifierColumnToSectionTypes < ActiveRecord::Migration
  def change
    add_column :section_types, :stringIdentifier, :string
  end
end
