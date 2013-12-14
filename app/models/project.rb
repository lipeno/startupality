class Project < ActiveRecord::Base
  attr_accessible :activated, :title
  belongs_to :user
  has_many :sections, :dependent => :destroy
  has_many :risks, :dependent => :destroy
  has_many :revenue_or_expenses, :dependent => :destroy
  has_many :cards, :dependent => :destroy
  has_many :hypotheses, :dependent => :destroy
  has_many :project_checklist_steps, :dependent => :destroy
  has_many :register_risks, :dependent => :destroy
end
