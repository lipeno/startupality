class AddOrderToHypothesis < ActiveRecord::Migration
  def change
    add_column :hypotheses, :order, :integer
  end
end
