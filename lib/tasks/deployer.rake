desc 'This task is for deployment to heroku'
task :heroku => :environment do
  puts.info "Precompiling assets"
  run_locally "bundle exec rake assets:precompile"
  #puts.info "Deploying to heroku"
  #run_locally "git push heroku"
end