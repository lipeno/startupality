class Api::HypothesesController < ApplicationController
  before_filter :load_parent

  def load_parent
    @project = Project.find(params[:project_id])
  end

  # GET /hypotheses
  # GET /hypotheses.json
  def index
    @hypotheses = @project.hypotheses.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @hypotheses }
    end
  end

  # GET /hypotheses/1
  # GET /hypotheses/1.json
  def show
    @hypothesis = @project.hypotheses.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @hypothesis }
    end
  end

  # GET /hypotheses/new
  # GET /hypotheses/new.json
  def new
    @hypothesis = @project.hypotheses.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @hypothesis }
    end
  end

  # GET /hypotheses/1/edit
  def edit
    @hypothesis = @project.hypotheses.find(params[:id])
  end

  # POST /hypotheses
  # POST /hypotheses.json
  def create
    @hypothesis = @project.hypotheses.new(params[:hypothesis])

    respond_to do |format|
      if @hypothesis.save
        format.html { redirect_to @hypothesis, notice: 'hypothesis was successfully created.' }
        format.json { render json: @hypothesis, status: :created}
      else
        format.html { render action: "new" }
        format.json { render json: @hypothesis.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /hypotheses/1
  # PUT /hypotheses/1.json
  def update
    @hypothesis = @project.hypotheses.find(params[:id])

    respond_to do |format|
      if @hypothesis.update_attributes(params[:hypothesis])
        format.html { redirect_to @hypothesis, notice: 'hypothesis was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @hypothesis.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /hypotheses/1
  # DELETE /hypotheses/1.json
  def destroy
    @hypothesis = @project.hypotheses.find(params[:id])
    @hypothesis.destroy

    respond_to do |format|
      format.html { redirect_to hypotheses_url }
      format.json { head :no_content }
    end
  end
end
