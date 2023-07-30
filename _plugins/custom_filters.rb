# rubocop:disable Style/Documentation Naming/FileName
# frozen_string_literal: true

def colorize_core(input)
  input ||= ''
  color, tag = input.split('@').map(&:strip)
  unless tag
    tag = color
    color = nil
  end

  [color || '?', "<span #{
    %(style="color: #{color}; text-decoration: underline; text-decoration-color: #{color}") if color
  }>#{tag}</span>"]
end

def parse_date(document)
  case document['sort_date']
  when String
    document['sort_date']
  when Date
    document['sort_date'].strftime('%Y-%m-%d')
  when NilClass
    document['date'].strftime('%Y-%m-%d')
  end.split('-')
end

module CustomFilters
  def colorize(input)
    colorize_core(input)[1]
  end

  def get_color(input)
    colorize_core(input)[0]
  end

  def sort_by_date(input)
    input.sort_by { |e| parse_date(e.data).map(&:to_f) }
  end

  def get_year(input)
    parse_date(input)[0]
  end
end

Liquid::Template.register_filter(CustomFilters)
# rubocop:enable all
