class RenameRevenueOrExpenses < ActiveRecord::Migration
  def self.up
    rename_table :revenueOrExpenses, :revenue_or_expenses
  end

  def self.down
    rename_table :revenue_or_expenses, :revenueOrExpenses
  end
end
