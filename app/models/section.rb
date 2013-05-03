class Section < ActiveRecord::Base
  attr_accessible :data, :project_id, :tags, :section_type_id
  belongs_to :project
  belongs_to :section_type
  #has_many :tags
  #accepts_nested_attributes_for :tags
end
