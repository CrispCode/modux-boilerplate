'use strict'

const fs = require( 'fs' )
const path = require( 'path' )

const commands = require( './commands.js' )

/**
 * File Class
 * @type {File}
 * @private
 */
const File = require( './utils/File.js' )

/**
 * Output Class
 * @type {Output}
 * @private
 */
const Output = require( './utils/Output.js' )

module.exports = ( templatePackage, template, action ) => {
  let templateDirectory = path.dirname( require.resolve( templatePackage ) )

  // Get template directory
  return File.get( templateDirectory ).exists()
    .then( ( file ) => {
      if ( !file.isDirectory() ) {
        throw new Error( 'Unable to resolve template path' )
      }
    } )
    .then( () => {
      // Get configuration for template
      let config = require( templatePackage )
      if ( !config ) {
        throw new Error( 'Unable to locate configuration file for template ' + template )
      }

      if ( !action ) {
        Output.write( fs.readFileSync( templateDirectory + path.sep + 'help.txt', 'utf8' ) )
        return
      }

      if ( !config[ action ] ) {
        throw new Error( 'Invalid action ' + action + ' for template ' + template )
      }

      // Show template intro
      Output.write( fs.readFileSync( templateDirectory + path.sep + 'intro.txt', 'utf8' ) )

      let steps = config[ action ]

      // Execute steps
      Output.info( 'Executing action ' + action )

      const command = ( i ) => {
        Output.log( 'Running step ' + ( i + 1 ) + ' ' + steps[ i ].action )
        return commands[ steps[ i ].action ]( steps[ i ].options )
          .then( () => {
            i = i + 1
            if ( i < steps.length ) {
              return command( i )
            }
          } )
      }

      return command( 0 )
        .then( () => {
          Output.info( '>> Environment succesfully created. <<' )
        } )
    } )
}
