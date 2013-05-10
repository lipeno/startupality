class CreateExpenses < ActiveRecord::Migration
  def change
    create_table :expenses do |t|
      t.integer :april
      t.integer :august
      t.integer :december
      t.integer :january
      t.integer :february
      t.integer :july
      t.integer :june
      t.integer :march
      t.integer :may
      t.integer :november
      t.integer :october
      t.integer :project_id
      t.string :rowName
      t.integer :rowNumber
      t.integer :september
      t.integer :year

      t.timestamps
    end
  end
end
