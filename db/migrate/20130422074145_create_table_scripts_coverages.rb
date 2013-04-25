class CreateTableScriptsCoverages < ActiveRecord::Migration
	def change
	create_table(:scripts_coverages) do |t|
	    	t.integer :script_id
	  		t.timestamps
	    end
	    add_attachment :scripts_coverages,:script_coverage_file
	end
end
