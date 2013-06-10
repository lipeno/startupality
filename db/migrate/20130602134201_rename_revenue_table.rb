class RenameRevenueTable < ActiveRecord::Migration
def self.up
  rename_table :revenues, :revenueOrExpenses
end

def self.down
  rename_table :revenueOrExpenses, :revenues
end
end
