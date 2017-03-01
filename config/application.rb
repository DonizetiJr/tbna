require_relative 'boot'

require 'rails/all'

Bundler.require(*Rails.groups)

module Tbna
  class Application < Rails::Application
    config.action_controller.page_cache_directory = "{Rails.root.to_s}/public/deploy"
  end
end
