def colorizeCore(input)
  color, tag = input.split("@").map{|item| item.strip}
  unless tag then tag, color = color, nil end
  
  style = if color then %(style="color: #{color}") end
  html = "<span #{style}>#{tag}</span>"
  color = if color then color else "?" end

  return color, html
end
  

module CustomFilters
    def colorize(input)
      return colorizeCore(input)[1]
    end

    def getColor(input)
      return colorizeCore(input)[0]
    end
  end
end

Liquid::Template.register_filter(CustomFilters)
