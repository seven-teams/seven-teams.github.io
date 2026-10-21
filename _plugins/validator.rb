require "safe_yaml/load"

Jekyll::Hooks.register :site, :post_read do |site|
  site.collections.each_value do |collection|
    pattern = File.join(collection.directory, "**", "*.{md,markdown,html}")

    Dir.glob(pattern).sort.each do |path|
      relative = path.delete_prefix("#{site.source}/")
      report = lambda do |message|
        Jekyll.logger.warn "Front matter:", "#{relative}: #{message}"
      end

      begin
        text = File.read(path, encoding: "bom|utf-8")
        match = text.match(Jekyll::Document::YAML_FRONT_MATTER_REGEXP)

        unless match
          report.call("missing or malformed --- front matter delimiters")
          next
        end

        data = SafeYAML.load(match[1]) || {}

        unless data.is_a?(Hash)
          report.call("front matter must be a YAML mapping")
          next
        end

        if data["date"].to_s.strip.empty?
          report.call("missing or empty date")
        end
      rescue Psych::SyntaxError, ArgumentError, EncodingError => error
        report.call("invalid front matter: #{error.message.lines.first.strip}")
      end
    end
  end
end
