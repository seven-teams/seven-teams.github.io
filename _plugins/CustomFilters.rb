def colorizeCore(input)
  input = input || ""
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

  def sort_by_date(input)
    input.sort_by { |document| document.data["sort_date"].split("-").map(&:to_f) }
  end
end

Liquid::Template.register_filter(CustomFilters)