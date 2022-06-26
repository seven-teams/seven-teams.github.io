def colorizeCore(input)
  color, tag = input.split('@').map(&:strip)
  unless tag
    tag = color
    color = nil
  end

  [color || '?', "<span #{
    %(style="color: #{color}; text-decoration: underline; text-decoration-color: #{color}") if color
  }>#{tag}</span>"]
end

module CustomFilters
  def colorize(input)
    colorizeCore(input)[1]
  end

  def getColor(input)
    colorizeCore(input)[0]
  end
end

Liquid::Template.register_filter(CustomFilters)
