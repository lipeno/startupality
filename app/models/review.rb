class Review < ActiveRecord::Base
	belongs_to :reviewable, :polymorphic=>true
	belongs_to :user
  	attr_accessible  :rating, :review_text, :reviewable_type, :user_id
end
