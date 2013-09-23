class AddExamplesToSectionType < ActiveRecord::Migration
  def change
    add_column :section_types, :examples, :string
  end
end
