class RevenueOrExpensesController < ApplicationController
  before_filter :load_parent

  def load_parent
    @project = Project.find(params[:project_id])
  end
  # GET /revenue_or_expenses
  # GET /revenue_or_expenses.json
  def index
    @revenue_or_expenses = @project.revenue_or_expenses.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @revenue_or_expenses }
    end
  end

  # GET /revenue_or_expenses/1
  # GET /revenue_or_expenses/1.json
  def show
    @revenue_or_expense = @project.revenue_or_expenses.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @revenue_or_expense }
    end
  end

  # GET /revenue_or_expenses/new
  # GET /revenue_or_expenses/new.json
  def new
    @revenue_or_expense = @project.revenue_or_expenses.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @revenue_or_expense }
    end
  end

  # GET /revenue_or_expenses/1/edit
  def edit
    @revenue_or_expense = @project.revenue_or_expenses.find(params[:id])
  end

  # POST /revenue_or_expenses
  # POST /revenue_or_expenses.json
  def create
    @revenue_or_expense = @project.revenue_or_expenses.new(params[:revenue_or_expense])
    # It is saved properly but returns an error to rest api request
    respond_to do |format|
      if @revenue_or_expense.save
        format.html { redirect_to @revenue_or_expense, notice: 'Revenue was successfully created.' }
        format.json { render json: @revenue_or_expense}
      else
        format.html { render action: "new" }
        format.json { render json: @revenue_or_expense.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /revenue_or_expenses/1
  # PUT /revenue_or_expenses/1.json
  def update
    @revenue_or_expense = @project.revenue_or_expenses.find(params[:id])

    respond_to do |format|
      if @revenue_or_expense.update_attributes(params[:revenue_or_expense])
        format.html { redirect_to @revenue_or_expense, notice: 'Revenue was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @revenue_or_expense.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /revenue_or_expenses/1
  # DELETE /revenue_or_expenses/1.json
  def destroy
    @revenue_or_expense = @project.revenue_or_expenses.find(params[:id])
    @revenue_or_expense.destroy

    respond_to do |format|
      format.html { redirect_to revenue_or_expenses_url }
      format.json { head :no_content }
    end
  end
end
