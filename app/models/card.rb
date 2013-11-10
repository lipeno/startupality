class Card < ActiveRecord::Base
  attr_accessible :board, :project_id, :title, :order
  belongs_to :project
end
