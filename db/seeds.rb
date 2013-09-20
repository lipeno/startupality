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
  SectionType.create(:order => 1, :title => 'Problem', :stringIdentifier => "problem", :description => 'Problems that our solution is solving', :questions => 'What are the 3 most important problems? What are the particular paint points that your target audience is having?');
  SectionType.create(:order => 2, :title => 'Solution', :stringIdentifier => "solution", :description => 'Possible solution for each of the problems we are trying to solve', :questions => 'How do you plan to solve the problems that your target audience has currently? Why and how you plan to implement this solution?');
  SectionType.create(:order => 3, :title => 'Key Partners', :stringIdentifier => "keypartners", :description => 'Partners, suppliers and others that are helping us', :questions => 'Who are our Key Partners? Who are our key suppliers? Which Key Resources are we acquiring from partners? Which Key Activities do partners perform?');
  SectionType.create(:order => 4, :title => 'Key Activities', :stringIdentifier => "keyactivities", :description => 'Key activities that are required for our value propositions', :questions => 'What Key Activities do our Value Propositions require? Our Distribution Channels? Customer Relationships? Revenue streams?');
  SectionType.create(:order => 5, :title => 'Value Proposition', :stringIdentifier => "valueproposition", :description => 'Clear and compelling message that tries to turn our visitor into an interested prospect', :questions => 'What value do we deliver to the customer? Which one of our customer’s problems are we helping to solve? What bundles of products and services are we offering to each Customer Segment? Which customer needs are we satisfying?');
  SectionType.create(:order => 6, :title => 'Customer Relationships', :stringIdentifier => "customerrelationships", :description => 'How we interact with to our customers', :questions => 'What type of relationship does each of our Customer Segments expect us to establish and maintain with them? Which ones have we established? How are they integrated with the rest of our business model? How costly are they?');
  SectionType.create(:order => 7, :title => 'Customer Segments', :stringIdentifier => "customersegments", :description => 'Our target audience', :questions => 'For whom are we creating value? Who are our most important customers?');
  SectionType.create(:order => 8, :title => 'Key Resources', :stringIdentifier => "keyresources", :description => 'Key resources that are required by our value propositions', :questions => 'What Key Resources do our Value Propositions require? Our Distribution Channels? Customer Relationships? Revenue Streams?');
  SectionType.create(:order => 9, :title => 'Channels', :stringIdentifier => "channels", :description => 'Path through which our target customer segments are reached', :questions => 'Through which Channels do our Customer Segments want to be reached? How are we reaching them now? How are our Channels integrated? Which ones work best? Which ones are most cost-efficient? How are we integrating them with customer routines?');
end

if ChecklistStep.count == 0
  puts "Creating checklist steps"

  sectionType = SectionType.where(:stringIdentifier => "customersegments")[0]
  ChecklistStep.create(:stepNumber => 1, :title => 'Which types of customers are you targeting?', :section_type => sectionType);
  ChecklistStep.create(:stepNumber => 2, :title => 'Who will be the day-to-day users?', :section_type => sectionType);
  ChecklistStep.create(:stepNumber => 3, :title => 'Who are the most important influencers and recommenders?', :section_type => sectionType);
  ChecklistStep.create(:stepNumber => 4, :title => 'Who are the decision makers in your industry?', :section_type => sectionType);
  ChecklistStep.create(:stepNumber => 5, :title => 'Draw the customer archetypes/personas.', :section_type => sectionType);

  sectionType = SectionType.where(:stringIdentifier => "problem")[0]
  ChecklistStep.create(:stepNumber => 1, :title => 'For all of the customer segments, identify the problems they are having.', :section_type => sectionType)
  ChecklistStep.create(:stepNumber => 2, :title => 'What needs is it solving? What benefits do users get?', :section_type => sectionType);
  ChecklistStep.create(:stepNumber => 3, :title => 'For all of the customer segments, do they have a passive or active problem/need for your solution?', :section_type => sectionType);
  ChecklistStep.create(:stepNumber => 4, :title => 'Does the product solve a critical problem or satisfy a must-have customer need?', :section_type => sectionType);
  ChecklistStep.create(:stepNumber => 5, :title => 'How painful are these needs? Rate them by importance.', :section_type => sectionType);

  sectionType = SectionType.where(:stringIdentifier => "channels")[0]

  ChecklistStep.create(:stepNumber => 1, :title => 'From which channels will your users buy your solution?', :section_type => sectionType);
  ChecklistStep.create(:stepNumber => 2, :title => 'Through which channels will you inform yours users about your solution?', :section_type => sectionType);
  ChecklistStep.create(:stepNumber => 3, :title => 'Through which channels will you distribute your product?', :section_type => sectionType);
  ChecklistStep.create(:stepNumber => 4, :title => 'What are the costs for using each of the channels?', :section_type => sectionType);
  ChecklistStep.create(:stepNumber => 5, :title => 'Is this a multi-sided market? If so, how will you address the needs of each side?', :section_type => sectionType);

  sectionType = SectionType.where(:stringIdentifier => "customerrelationships")[0]

  ChecklistStep.create(:stepNumber => 1, :title => 'Describe how do you plan to get your customers. Do you focus more on inbound or outbound marketing?', :section_type => sectionType);
  ChecklistStep.create(:stepNumber => 2, :title => 'Describe how do you plan to keep your customers. Do you use any loyalty programs, e-mail campaigns or use some other tactics?', :section_type => sectionType);
  ChecklistStep.create(:stepNumber => 3, :title => 'Describe how do you plan to grow your customers. Do you up-sell, cross-sell or use other tactics?', :section_type => sectionType);
  ChecklistStep.create(:stepNumber => 4, :title => 'Draw your customer get-keep-grow funnel.', :section_type => sectionType);
  ChecklistStep.create(:stepNumber => 5, :title => 'Organize how will you receive feedback from your customers.', :section_type => sectionType);

  sectionType = SectionType.where(:stringIdentifier => "keyresources")[0]

  ChecklistStep.create(:stepNumber => 1, :title => 'Describe your physical, financial, intellectual, human and other resources.', :section_type => sectionType);
  ChecklistStep.create(:stepNumber => 2, :title => 'Are there any particular dependencies between them?', :section_type => sectionType);
  ChecklistStep.create(:stepNumber => 3, :title => 'Where can these resources be found, and how will they be secured?', :section_type => sectionType);

  sectionType = SectionType.where(:stringIdentifier => "keypartners")[0]

  ChecklistStep.create(:stepNumber => 1, :title => 'Who are your target partners and what will they provide?', :section_type => sectionType);
  ChecklistStep.create(:stepNumber => 2, :title => 'Which specific type of partners are they? Are they suppliers, strategic allies or other?', :section_type => sectionType);
  ChecklistStep.create(:stepNumber => 3, :title => 'Who are your necessary partners and how will you reciprocate?', :section_type => sectionType);

  sectionType = SectionType.where(:stringIdentifier => "keyactivities")[0]

  ChecklistStep.create(:stepNumber => 1, :title => 'What key activities have been done and are done currently?', :section_type => sectionType);
  ChecklistStep.create(:stepNumber => 2, :title => 'What activities have to be done in the future to build the solution?', :section_type => sectionType);
  ChecklistStep.create(:stepNumber => 3, :title => 'What are the dependencies between our key activities and is there any possibility for a critical path to be crashed?', :section_type => sectionType);

  sectionType = SectionType.where(:stringIdentifier => "solution")[0]

  ChecklistStep.create(:stepNumber => 1, :title => 'What other similar solutions exist?', :section_type => sectionType);
  ChecklistStep.create(:stepNumber => 2, :title => 'How our customer segments are currently consuming and buying other similar solutions?', :section_type => sectionType);
  ChecklistStep.create(:stepNumber => 3, :title => 'How tested is our solution with our potential customers?', :section_type => sectionType);
  ChecklistStep.create(:stepNumber => 4, :title => 'What are the product features? What are the set of feature which will be in the minimum viable version of the product?', :section_type => sectionType);

  sectionType = SectionType.where(:stringIdentifier => "valueproposition")[0]

  ChecklistStep.create(:stepNumber => 1, :title => 'How defined are features of our solution and are they aligned with insights from potential customers?', :section_type => sectionType);
  ChecklistStep.create(:stepNumber => 2, :title => 'Are there any value propositions which could be removed?', :section_type => sectionType);
  ChecklistStep.create(:stepNumber => 3, :title => 'Rate value propositions in the order of importance if possible.', :section_type => sectionType);

end
