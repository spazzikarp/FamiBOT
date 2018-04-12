# Description
#   Der index
#
#

fs = require 'fs'
path = require 'path'

module.exports = (robot, scripts) ->
  robot.identity = require './lib/identity'
  robot.identity.init()

  robot.loadFile(path.resolve(__dirname, 'src'), 'backend.coffee')
  