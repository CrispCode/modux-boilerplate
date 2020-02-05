'use strict'

const fs = require( 'fs' )
const path = require( 'path' )

/**
 * File Class
 * @type {File}
 * @private
 */
const File = require( './File.js' )

// Generate a list of available templates
module.exports = ( templatesFolder ) => {
  return new Promise( ( resolve, reject ) => {
    let promises = []
    fs.readdir( templatesFolder, 'utf8', ( err, files ) => {
      if ( err ) {
        reject( err )
        return
      }
      for ( let i = 0; i < files.length; i++ ) {
        let promise = File.get( templatesFolder + path.sep + files[ i ] ).exists()
          .then( () => {
            return files[ i ]
          } )
        promises.push( promise )
      }
      Promise.all( promises )
        .then( ( list ) => {
          resolve( list )
        } )
        .catch( ( err ) => {
          reject( err )
        } )
    } )
  } )
}
