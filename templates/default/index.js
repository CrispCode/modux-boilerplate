'use strict'

const path = require( 'path' )

module.exports = {
  'create': [
    {
      'action': 'input',
      'options': () => {
        return {
          'parameters': {
            'name': 'Enter project name: '
          }
        }
      }
    },
    {
      'action': 'mkdir',
      'options': ( parameters ) => {
        return {
          'name': parameters.get( 'name' )
        }
      }
    },
    {
      'action': 'copy',
      'options': ( parameters ) => {
        return {
          'source': __dirname + path.sep + 'src',
          'destination': path.resolve( './' ) + path.sep + parameters.get( 'name' )
        }
      }
    },
    {
      'action': 'rename',
      'options': ( parameters ) => {
        return {
          files: [
            {
              from: path.resolve( './' ) + path.sep + parameters.get( 'name' ) + path.sep + '_.gitignore',
              to: path.resolve( './' ) + path.sep + parameters.get( 'name' ) + path.sep + '.gitignore'
            }
          ]
        }
      }
    }
  ]
}
