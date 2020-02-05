'use strict'

const path = require( 'path' )

module.exports = {
  'create': [
    {
      'action': 'input',
      'options': () => {
        return {
          'questions': [
            {
              'name': 'name',
              'question': 'Enter project name: '
            },
            {
              'name': 'description',
              'question': 'Enter project description: '
            },
            {
              'name': 'author',
              'question': 'Enter project author: '
            },
            {
              'name': 'repository_url',
              'question': 'Repository url: '
            },
            {
              'name': 'issues_url',
              'question': 'Issues reporting url: '
            }
          ]
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
            },
            {
              from: path.resolve( './' ) + path.sep + parameters.get( 'name' ) + path.sep + '_package.json',
              to: path.resolve( './' ) + path.sep + parameters.get( 'name' ) + path.sep + 'package.json'
            },
            {
              from: path.resolve( './' ) + path.sep + parameters.get( 'name' ) + path.sep + '_.eslintrc',
              to: path.resolve( './' ) + path.sep + parameters.get( 'name' ) + path.sep + '.eslintrc'
            }
          ]
        }
      }
    },
    {
      'action': 'parameters',
      'options': ( parameters ) => {
        return {
          'files': [
            path.resolve( './' ) + path.sep + parameters.get( 'name' ) + path.sep + 'readme.md',
            path.resolve( './' ) + path.sep + parameters.get( 'name' ) + path.sep + 'package.json',
            path.resolve( './' ) + path.sep + parameters.get( 'name' ) + path.sep + 'app.html'
          ],
          'keywords': {}
        }
      }
    }
  ]
}
