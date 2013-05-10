require 'test_helper'

class ExpensesControllerTest < ActionController::TestCase
  setup do
    @expense = expenses(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:expenses)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create expense" do
    assert_difference('Expense.count') do
      post :create, expense: { april: @expense.april, august: @expense.august, december: @expense.december, february: @expense.february, january: @expense.january, july: @expense.july, june: @expense.june, march: @expense.march, may: @expense.may, november: @expense.november, october: @expense.october, project_id: @expense.project_id, rowName: @expense.rowName, rowNumber: @expense.rowNumber, september: @expense.september, year: @expense.year }
    end

    assert_redirected_to expense_path(assigns(:expense))
  end

  test "should show expense" do
    get :show, id: @expense
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @expense
    assert_response :success
  end

  test "should update expense" do
    put :update, id: @expense, expense: { april: @expense.april, august: @expense.august, december: @expense.december, february: @expense.february, january: @expense.january, july: @expense.july, june: @expense.june, march: @expense.march, may: @expense.may, november: @expense.november, october: @expense.october, project_id: @expense.project_id, rowName: @expense.rowName, rowNumber: @expense.rowNumber, september: @expense.september, year: @expense.year }
    assert_redirected_to expense_path(assigns(:expense))
  end

  test "should destroy expense" do
    assert_difference('Expense.count', -1) do
      delete :destroy, id: @expense
    end

    assert_redirected_to expenses_path
  end
end
