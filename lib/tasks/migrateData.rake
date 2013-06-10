#A schedule task to keep Heroku alive
desc 'This task is called'

task :migrateData => :environment do
  @projects = Project.where(:id => 70)

  @expenses = Expense.where(:project_id => 70)

  @expenses.each do |item|
    @projects.each do |project|
      puts project.revenue_or_expenses
      project.revenue_or_expenses.new << item
      @order = @customer.orders.create(:order_date => Time.now)
      #project.revenue_or_expenses.new(item)
    end
  end
end