#!/usr/bin/env node

'use strict'

const path = require( 'path' )
const parameters = process.argv
const execute = require( __dirname + '/lib' )

/**
 * File Class
 * @type {File}
 * @private
 */
const File = require( __dirname + '/lib/utils/File.js' )

/**
 * Output Class
 * @type {Output}
 * @private
 */
const Output = require( __dirname + '/lib/utils/Output.js' )

/**
 * getDirectories function
 * @private
 */
const getDirectories = require( __dirname + '/lib/utils/getDirectories.js' )

var template = parameters[ 2 ]
var command = parameters[ 3 ]

getDirectories( __dirname + path.sep + 'templates' )
  .then( ( list ) => {
    // Check the command line arguments
    if ( list.includes( template ) ) {
      return execute( __dirname + path.sep + 'templates' + path.sep + template, template, command )
    } else if ( template === 'list' ) {
      Output.info( 'Avilable templates: ' )
      Output.write( '- ' + list.join( ',\n - ' ) )
    } else {
      // Fallback
      return File.get( __dirname + path.sep + 'help.txt' ).exists()
        .then( ( file ) => {
          return file.read()
        } )
        .then( ( data ) => {
          Output.write( data )
        } )
    }
  } )
  .catch( ( err ) => {
    Output.error( err )
  } )

