class AddFkToSection < ActiveRecord::Migration
  def change
    add_column :sections, :section_type_id, :integer
  end
end
