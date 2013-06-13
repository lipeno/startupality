class ProjectChecklistStep < ActiveRecord::Base
  attr_accessible :done, :project_id, :sectionTypeIdentifier, :stepNumber, :value, :checklist_step_id
  belongs_to :project
  belongs_to :checklist_step

  def as_json(options={})
    {
        :id => self.id,
        :done => self.done,
        :stepNumber => self.stepNumber,
        :value => self.value,
        :project_id => self.project_id,
        :project => self.project,
        :checklist_step => self.checklist_step
    }
  end

end
