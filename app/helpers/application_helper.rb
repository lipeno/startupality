module ApplicationHelper
	def flash_div(kind)
		unless flash[kind].blank?
			text = "<p>#{flash[kind]}</p>"
			content_tag :div, text.html_safe, :id => "flash", :class => kind
		end
	end
	def current_navigation expected_path
		if params[:controller] ==expected_path
			return "active"
		else
			return ""
		end
	end
end
