class Client < ActiveRecord::Base
  serialize :restrictions
  serialize :tastes
end
