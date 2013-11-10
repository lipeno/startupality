worker_processes 3
timeout 30
preload_app true

before_fork do |server, worker|
  # Replace with MongoDB or whatever
  if defined?(ActiveRecord::Base)
    ActiveRecord::Base.connection.disconnect!
    Rails.logger.info('Disconnected from ActiveRecord')
  end

  # If you are using Redis but not Resque, change this
  if defined?(Resque)
    Resque.redis.quit
    Rails.logger.info('Disconnected from Redis')
  end

  sleep 1
end

after_fork do |server, worker|
  # Replace with MongoDB or whatever
  if defined?(ActiveRecord::Base)
    ActiveRecord::Base.establish_connection
    Rails.logger.info('Connected to ActiveRecord')
  end

  # If you are using Redis but not Resque, change this
  if defined?(Resque)
    Resque.redis = ENV['REDIS_URI']
    Rails.logger.info('Connected to Redis')
  end

  if defined? AnalyticsRuby
    Analytics = AnalyticsRuby          # Alias for convenience
    if Rails.env.production?
      Analytics.init({
                         secret: 'k5xl9xj1786ynb9z3z88',
                         on_error: Proc.new { |status, msg| print msg }  # Optional error handler
                     })
    else
      Analytics.init({
                         secret: '1b4w6ezsxqjnfvbkm8d9',
                         on_error: Proc.new { |status, msg| print msg }  # Optional error handler
                     })
    end
  end

  # Need to do this for Segmentio analytics to work on Rails
  defined?(Analytics) and Analytics.init(secret: 'k5xl9xj1786ynb9z3z88')
end