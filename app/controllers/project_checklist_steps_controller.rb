class ProjectChecklistStepsController < ApplicationController
  before_filter :load_parent

  def load_parent
    @project = Project.find(params[:project_id])
  end

  # GET /project_checklist_steps
  # GET /project_checklist_steps.json
  def index
    @project_checklist_steps = @project.project_checklist_steps.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @project_checklist_steps }
    end
  end

  # GET /project_checklist_steps/1
  # GET /project_checklist_steps/1.json
  def show
    @project_checklist_step = @project.project_checklist_steps.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @project_checklist_step }
    end
  end

  # GET /project_checklist_steps/new
  # GET /project_checklist_steps/new.json
  def new
    @project_checklist_step = @project.project_checklist_steps.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @project_checklist_step }
    end
  end

  # GET /project_checklist_steps/1/edit
  def edit
    @project_checklist_step = @project.project_checklist_steps.find(params[:id])
  end

  # POST /project_checklist_steps
  # POST /project_checklist_steps.json
  def create
    @project_checklist_step = @project.project_checklist_steps.new(params[:project_checklist_step])

    respond_to do |format|
      if @project_checklist_step.save
        format.html { redirect_to @project_checklist_step, notice: 'Project checklist step was successfully created.' }
        format.json { render json: @project_checklist_step, status: :created, location: @project_checklist_step }
      else
        format.html { render action: "new" }
        format.json { render json: @project_checklist_step.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /project_checklist_steps/1
  # PUT /project_checklist_steps/1.json
  def update
    @project_checklist_step = @project.project_checklist_steps.find(params[:id])

    respond_to do |format|
      if @project_checklist_step.update_attributes(params[:project_checklist_step])
        format.html { redirect_to @project_checklist_step, notice: 'Project checklist step was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @project_checklist_step.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /project_checklist_steps/1
  # DELETE /project_checklist_steps/1.json
  def destroy
    @project_checklist_step = @project.project_checklist_steps.find(params[:id])
    @project_checklist_step.destroy

    respond_to do |format|
      format.html { redirect_to project_checklist_steps_url }
      format.json { head :no_content }
    end
  end
end
