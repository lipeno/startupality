class Section < ActiveRecord::Base
  attr_accessible :data, :project_id, :tags, :sectionTypeIdentifier
  belongs_to :project
  #belongs_to :section_type
end
