module CustomTags
  class ColorTag < Liquid::Tag
    def initialize(_, value, _)
      super
      @value = value
    end

    def render(context)
      color, tag = context[@value].split("@").map{|item| item.strip}
      unless tag then tag, color = color, nil end
	  "<span #{if color then %(style="color: #{color}") end}>#{tag}</span>"
    end
  end
end

Liquid::Template.register_tag("colorize", CustomTags::ColorTag)
