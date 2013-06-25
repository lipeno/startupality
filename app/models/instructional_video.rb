class InstructionalVideo < ActiveRecord::Base
  attr_accessible :url
  belongs_to :section_type
end
