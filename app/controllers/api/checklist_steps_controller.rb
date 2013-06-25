class Api::ChecklistStepsController < ApplicationController
  # GET /checklist_steps
  # GET /checklist_steps.json
  def index
    @checklist_steps = ChecklistStep.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @checklist_steps }
    end
  end

  # GET /checklist_steps/1
  # GET /checklist_steps/1.json
  def show
    @checklist_step = ChecklistStep.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @checklist_step }
    end
  end

  # GET /checklist_steps/new
  # GET /checklist_steps/new.json
  def new
    @checklist_step = ChecklistStep.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @checklist_step }
    end
  end

  # GET /checklist_steps/1/edit
  def edit
    @checklist_step = ChecklistStep.find(params[:id])
  end

  # POST /checklist_steps
  # POST /checklist_steps.json
  def create
    @checklist_step = ChecklistStep.new(params[:checklist_step])

    respond_to do |format|
      if @checklist_step.save
        format.html { redirect_to @checklist_step, notice: 'Checklist step was successfully created.' }
        format.json { render json: @checklist_step, status: :created}
      else
        format.html { render action: "new" }
        format.json { render json: @checklist_step.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /checklist_steps/1
  # PUT /checklist_steps/1.json
  def update
    @checklist_step = ChecklistStep.find(params[:id])

    respond_to do |format|
      if @checklist_step.update_attributes(params[:checklist_step])
        format.html { redirect_to @checklist_step, notice: 'Checklist step was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @checklist_step.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /checklist_steps/1
  # DELETE /checklist_steps/1.json
  def destroy
    @checklist_step = ChecklistStep.find(params[:id])
    @checklist_step.destroy

    respond_to do |format|
      format.html { redirect_to checklist_steps_url }
      format.json { head :no_content }
    end
  end
end
