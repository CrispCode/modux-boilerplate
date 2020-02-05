'use strict'

/**
 * Variables class
 */
class Variables {
  /**
   * Create an instance of Config
   */
  constructor () {
    this._data = {}
  }

  /**
   * A method used to set data
   * @param { String } name The key
   * @param { String } value The value
   */
  set ( name, value ) {
    this._data[ name ] = value
  }

  /**
   * A method used to get data
   * @param { String } name The key
   * @returns { String }
   */
  get ( name ) {
    if ( name ) {
      return this._data[ name ]
    }
    return this._data
  }
}

module.exports = Variables
