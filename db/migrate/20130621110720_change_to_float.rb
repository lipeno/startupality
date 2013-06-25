class ChangeToFloat < ActiveRecord::Migration
  def change
    change_column :register_risks, :probability, :float
    change_column :register_risks, :impact, :float
  end
end
