class ChecklistStep < ActiveRecord::Base
  attr_accessible :title, :stepNumber, :project_checklist_step, :section_type
  has_many :project_checklist_step
  belongs_to :section_type

  def as_json(options={})
    {
        :id => self.id,
        :title => self.title,
        :stepNumber => self.stepNumber,
        :section_type => self.section_type,
    }
  end
end
