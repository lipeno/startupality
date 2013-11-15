# Segmentio analytics initialization
Analytics = AnalyticsRuby            # Alias for convenience
if Rails.env.production?
Analytics.init(secret: 'k5xl9xj1786ynb9z3z88')
else
Analytics.init(secret: '1b4w6ezsxqjnfvbkm8d9')
end