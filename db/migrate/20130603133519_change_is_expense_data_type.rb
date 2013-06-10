class ChangeIsExpenseDataType < ActiveRecord::Migration
  def up
    change_column :revenue_or_expenses, :isExpense, :boolean, :default => false
  end

  def down
    change_column :revenue_or_expenses, :isExpense, :boolean, :default => nil
  end
end