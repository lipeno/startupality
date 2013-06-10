class AddIsExpenseToRevenuesOrExpense < ActiveRecord::Migration
  def change
    add_column :revenueOrExpenses, :isExpense, :boolean, :default => nil
  end
end
