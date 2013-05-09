class Revenue < ActiveRecord::Base
  attr_accessible :april, :august, :december, :january, :february, :july, :june, :march, :may, :november, :october, :project_id, :rowName, :rowNumber, :september, :year
  belongs_to :project
end
