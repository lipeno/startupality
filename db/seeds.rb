# encoding: UTF-8



# # This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

if SectionType.count == 0
  puts "Creating section types"
  SectionType.create(:title => 'Problem', :description => 'Problems that your solution is solving', :questions => 'What are the 3 most important problems? What are the particular paint points that your target audience is having?');
  SectionType.create(:title => 'Solution', :description => 'Possible solution for each of the problems that you are trying to solve', :questions => 'How do you plan to solve the problems that your target audience has currently? Why and how you plan to implement this solution?');
  SectionType.create(:title => 'Key Partners', :description => 'Problems that your solution is solving', :questions => 'Who are our Key Partners? Who are our key suppliers? Which Key Resources are we acquiring from partners? Which Key Activities do partners perform?');
  SectionType.create(:title => 'Key Activities', :description => 'Problems that your solution is solving', :questions => 'What Key Activities do our Value Propositions require? Our Distribution Channels? Customer Relationships? Revenue streams?');
  SectionType.create(:title => 'Value Proposition', :description => 'Clear and compelling message that tries to with turn your visitor into an interested prospect', :questions => 'What value do we deliver to the customer? Which one of our customer’s problems are we helping to solve? What bundles of products and services are we offering to each Customer Segment? Which customer needs are we satisfying?');
  SectionType.create(:title => 'Customer Relationships', :description => 'Your path and ways of reaching to your customers', :questions => 'What type of relationship does each of our Customer Segments expect us to establish and maintain with them? Which ones have we established? How are they integrated with the rest of our business model? How costly are they?');
  SectionType.create(:title => 'Customer Segments', :description => 'Your target audience', :questions => 'For whom are we creating value? Who are our most important customers?');
  SectionType.create(:title => 'Key Resources', :description => 'Problems that your solution is solving', :questions => 'What Key Resources do our Value Propositions require? Our Distribution Channels? Customer Relationships? Revenue Streams?');
  SectionType.create(:title => 'Channels', :description => 'Problems that your solution is solving', :questions => 'Through which Channels do our Customer Segments want to be reached? How are we reaching them now? How are our Channels integrated? Which ones work best? Which ones are most cost-efficient? How are we integrating them with customer routines?');
end