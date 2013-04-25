module Reviewable
  def is_reviewable
    has_many :reviews, :as=>:reviewable, :dependent=>:destroy
    include InstanceMethods
  end
  module InstanceMethods
    def reviewable?
      true
    end
  end
end

