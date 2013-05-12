class Card < ActiveRecord::Base
  attr_accessible :board, :project_id, :title
  belongs_to :project
end
