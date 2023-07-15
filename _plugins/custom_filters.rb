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

module CustomFilters
  def colorize(input)
    colorize_core(input)[1]
  end

  def get_color(input)
    colorize_core(input)[0]
  end

  def sort_by_date(input)
    input.sort_by do |document|
      case document.data['sort_date']
      when String
        document.data['sort_date']
      when Date
        document.data['sort_date'].strftime("%Y-%m-%d")
      when NilClass
        document.data['date'].strftime("%Y-%m-%d")
      end.split('-').reverse.map(&:to_f)
    end
  end
end

Liquid::Template.register_filter(CustomFilters)
# rubocop:enable all
