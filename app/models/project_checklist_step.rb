class ProjectChecklistStep < ActiveRecord::Base
  attr_accessible :done, :project_id, :sectionTypeIdentifier, :stepNumber, :value
  belongs_to :project
end
