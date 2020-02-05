'use strict'

const fs = require( 'fs' )
const ncp = require( 'ncp' ).ncp

/**
 * File class
 */
class File {
  /**
   * Creates an instance of File
   * @param { String } file The file path
   */
  constructor ( file ) {
    this._file = file
  }

  /**
   * Creates an instance of File
   * @param { String } file The file path
   */
  static get ( file ) {
    return new File( file )
  }

  /**
   * Check if the file or directory exists
   * @returns { Promise }
   */
  exists () {
    return new Promise( ( resolve, reject ) => {
      fs.lstat( this._file, ( err, stats ) => {
        if ( err ) {
          reject( err )
          return
        }
        this._stats = stats
        resolve( this )
      } )
    } )
  }

  /**
   * A method used to determine if the file is an actual file or a directory
   * @return { Boolean }
   */
  isDirectory () {
    return this._stats.isDirectory()
  }

  /**
   * A method used to rename a file or directory
   * @param { String } to The new file or directory name
   * @return { Promise }
   */
  rename ( to ) {
    return new Promise( ( resolve, reject ) => {
      fs.rename( this._file, to, ( err ) => {
        if ( err ) {
          reject( err )
          return
        }
        resolve()
      } )
    } )
  }

  /**
   * A method used to read the file
   * @return { Promise }
   */
  read () {
    return new Promise( ( resolve, reject ) => {
      fs.readFile( this._file, 'utf8', ( err, data ) => {
        if ( err ) {
          reject( err )
          return
        }
        resolve( data )
      } )
    } )
  }

  /**
   * A method used to write data to the file
   * @param { String } data The data to be written
   * @return { Promise }
   */
  write ( data ) {
    return new Promise( ( resolve, reject ) => {
      fs.writeFile( this._file, data, 'utf8', ( err ) => {
        if ( err ) {
          reject( err )
          return
        }
        resolve()
      } )
    } )
  }

  /**
   * A method used to copy file or directory
   * @param { String } to The new file or directory path
   * @return { Promise }
   */
  copy ( to ) {
    return new Promise( ( resolve, reject ) => {
      ncp.limit = 16

      ncp( this._file, to, ( err ) => {
        if ( err ) {
          reject( err )
          return
        }
        resolve()
      } )
    } )
  }
}

module.exports = File
