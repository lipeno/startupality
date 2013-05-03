# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

if SectionType.count == 0
  puts "Creating section types"
  SectionType.create(title:'Problem', description:'Problems that your solution is solving',questions:'');
  SectionType.create(title:'Solution', description:'Possible solution for each of the problems that you are trying to solve', questions:'');
  SectionType.create(title:'Key Partners', description:'Problems that your solution is solving', questions:'');
  SectionType.create(title:'Key Activities', description:'Problems that your solution is solving', questions:'');
  SectionType.create(title:'Value Proposition', description:'Clear and compelling message that tries to with turn your visitor into an interested prospect', questions:'');
  SectionType.create(title:'Customer Relationships', description:'Your path and ways of reaching to your customers', questions:'');
  SectionType.create(title:'Customer Segments', description:'Your target audience', questions:'');
  SectionType.create(title:'Key Resources', description:'Problems that your solution is solving', questions:'');
  SectionType.create(title:'Channels', description:'Problems that your solution is solving', questions:'');
end

puts "Creating tags"
t = Tag.new
t.section_id = 20
t.data = "testTag";
t.save