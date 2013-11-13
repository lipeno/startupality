source 'https://rubygems.org'

ruby '1.9.3'
gem 'rails', "3.2.14"
gem 'devise', "3.1.0"
gem 'cancan'
gem 'analytics-ruby', '<1.0'

gem 'simple_form'
gem "paperclip", "~> 3.0"
gem "haml"
gem "select2-rails"
gem 'pg'
gem 'aws-sdk'

# Bundle edge Rails instead:
# gem 'rails', :git => 'git://github.com/rails/rails.git'

group :development, :test do
  gem 'thin'
  gem 'meta_request'
  gem 'rails-erd' # for generating er diagrams
end

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails', "~> 3.2.3"
  gem 'coffee-rails'
  gem 'compass-rails'
  gem 'compass_twitter_bootstrap'
  gem 'yui-compressor'
  # See https://github.com/sstephenson/execjs#readme for more supported runtimes
  # gem 'therubyracer', :platforms => :ruby

  gem 'uglifier', '>= 1.0.3'
end

# GEMS FOR PRODUCTION
group :production do
  # Use unicorn as the app server
  gem 'unicorn'
  gem 'rails_12factor'
end

# To use ActiveModel has_secure_password
# gem 'bcrypt-ruby', '~> 3.0.0'

# To use Jbuilder templates for JSON
# gem 'jbuilder'

# Deploy with Capistrano
# gem 'capistrano'

# To use debugger
# gem 'debugger'
