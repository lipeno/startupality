class CreateTablesForScriptology < ActiveRecord::Migration
  	def change
	   	create_table(:levels) do |t|
	    	t.string :level
	  	end
	  	create_table(:scripts) do |t|
	  		t.integer :user_id
	  		t.string :title
	  		t.string :author
	  		t.timestamps
	    end
	    add_index :scripts, :user_id
	    create_table(:script_files) do |t|
	    	t.integer :script_id
	  		t.timestamps
	    end
	    add_attachment :script_files,:script_file

	end
end
