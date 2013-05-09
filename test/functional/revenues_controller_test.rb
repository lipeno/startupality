require 'test_helper'

class RevenuesControllerTest < ActionController::TestCase
  setup do
    @revenue = revenues(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:revenues)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create revenue" do
    assert_difference('Revenue.count') do
      post :create, revenue: { april: @revenue.april, august: @revenue.august, december: @revenue.december, february: @revenue.february, july: @revenue.july, june: @revenue.june, march: @revenue.march, may: @revenue.may, november: @revenue.november, october: @revenue.october, project_id: @revenue.project_id, rowName: @revenue.rowName, rowNumber: @revenue.rowNumber, september: @revenue.september, year: @revenue.year }
    end

    assert_redirected_to revenue_path(assigns(:revenue))
  end

  test "should show revenue" do
    get :show, id: @revenue
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @revenue
    assert_response :success
  end

  test "should update revenue" do
    put :update, id: @revenue, revenue: { april: @revenue.april, august: @revenue.august, december: @revenue.december, february: @revenue.february, july: @revenue.july, june: @revenue.june, march: @revenue.march, may: @revenue.may, november: @revenue.november, october: @revenue.october, project_id: @revenue.project_id, rowName: @revenue.rowName, rowNumber: @revenue.rowNumber, september: @revenue.september, year: @revenue.year }
    assert_redirected_to revenue_path(assigns(:revenue))
  end

  test "should destroy revenue" do
    assert_difference('Revenue.count', -1) do
      delete :destroy, id: @revenue
    end

    assert_redirected_to revenues_path
  end
end
