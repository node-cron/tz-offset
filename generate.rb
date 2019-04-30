require 'tzinfo'
require 'json'

zones = Hash.new
timezones = TZInfo::Timezone.all.each { |tz| 
  zones[tz.name] = tz.current_period.offset.utc_offset / 60 * -1
}

File.open("offsets.json", 'w') { |file| file.write(zones.to_json) }
