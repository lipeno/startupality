class Expense < ActiveRecord::Base
  attr_accessible :april, :august, :december, :february, :january, :july, :june, :march, :may, :november, :october, :project_id, :rowName, :rowNumber, :september, :year
  belongs_to :project
end
