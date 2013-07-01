class Api::ProjectsController < ApplicationController
  # GET /projects
  # GET /projects.json
  def index
    #@projects = Project.all
    @projects = Project.where(:user_id => current_user.id)

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @projects }
    end
  end

  # GET /projects/1
  # GET /projects/1.json
  def show
    @project = Project.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @project }
    end
  end

  # GET /projects/new
  # GET /projects/new.json
  #def new
  #  # NOT USED, LOOK FOR CREATE
  #  @project = Project.new
  #  @project.user_id = current_user.id;
  #  # Add all the sections that project should have
  #  SectionType.each do |item|
  #    @project.sections.create(data:'', tags:'', section_type_id:item.id)
  #  end
  #  @project.risks.create()
  #
  #  respond_to do |format|
  #    format.html # new.html.erb
  #    format.json { render json: @project }
  #  end
  #end

  # GET /projects/1/edit
  def edit
    @project = Project.find(params[:id])
  end

  # POST /projects
  # POST /projects.json
  def create
    @project = Project.new(params[:project])
    # Save for current user
    @project.user_id = current_user.id;

    # Add all the sections that project should have
    SectionType.all.each do |sectionType|
      #@project.sections.new(data:nil, tags:nil, sectionTypeIdentifier:item.stringIdentifier)
      @project.sections.new(data:nil, tags:nil, :section_type_id => sectionType.id)
    end

    ChecklistStep.all.each do |item|
      #@project.project_checklist_steps.new(sectionTypeIdentifier:item.sectionTypeIdentifier, stepNumber:item.stepNumber,done:false,value:nil)
      @project.project_checklist_steps.new(stepNumber:item.stepNumber,done:false,value:nil, :checklist_step_id => item.id)
      #ProjectChecklistStep.create(sectionTypeIdentifier:item.sectionTypeIdentifier, stepNumber:item.stepNumber,done:false,value:nil, :project => @project, :checklist_step => item)
    end

    @project.risks.new(:opportunitiesEconomical => nil, :opportunitiesPolitical => nil, :opportunitiesSociological=> nil, :opportunitiesTechnical=> nil, :strengths=> nil, :threatsEconomical=> nil, :threatsPolitical=> nil, :threatsSociological=> nil, :threatsTechnical=> nil, :weaknesses=> nil)

    respond_to do |format|
      if @project.save
        format.html { redirect_to @project, notice: 'Project was successfully created.' }
        format.json { render json: @project, status: :created}
      else
        format.html { render action: "new" }
        format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /projects/1
  # PUT /projects/1.json
  def update
    @project = Project.find(params[:id])
    # user_id should stay the same

    respond_to do |format|
      if @project.update_attributes(params[:project])
        format.html { redirect_to @project, notice: 'Project was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /projects/1
  # DELETE /projects/1.json
  def destroy
    @project = Project.find(params[:id])
    @project.destroy

    respond_to do |format|
      format.html { redirect_to projects_url }
      format.json { head :no_content }
    end
  end

  # Get Currently active project
  def getActivated
    @project = Project.where("activated = true").where(:user_id => current_user.id)

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @project }
    end
  end
end
