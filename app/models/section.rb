class Section < ActiveRecord::Base
  attr_accessible :data, :project_id, :tags, :section_type_id
  belongs_to :project
  belongs_to :section_type

  def as_json(options={})
    {
        :id => self.id,
        :data => self.data,
        :tags => self.tags,
        :project_id => self.project_id,
        :project => self.project,
        :section_type => self.section_type
    }
  end


end
