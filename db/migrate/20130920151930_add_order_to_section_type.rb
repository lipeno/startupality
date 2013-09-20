class AddOrderToSectionType < ActiveRecord::Migration
  def up
    add_column :section_types, :order, :integer
  end
end
