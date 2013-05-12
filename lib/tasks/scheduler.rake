#A schedule task to keep Heroku alive
desc 'This task is called by the Heroku cron addon'
task :call_page => :environment do
  uri = URI.parse('http://startupalityapp.herokuapp.com')
  Net::HTTP.get(uri)
end