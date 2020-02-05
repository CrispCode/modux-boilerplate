'use strict'

/**
 * DateTime Class
 * @type {DateTime}
 * @private
 */
const DateTime = require( './DateTime.js' )

/**
 * Function returns the color string based on colors constant
 * @param {String} style The colors key
 * @return {String}
 */
let color = ( style ) => {
  /**
   * Color constants
   * @type {Object}
   * @private
   */
  const COLORS = {
    'reset': '0',
    'hicolor': '1',
    'underline': '4',
    'inverse': '7',
    'black': '30',
    'red': '31',
    'green': '32',
    'yellow': '33',
    'blue': '34',
    'magenta': '35',
    'cyan': '36',
    'white': '37',
    'bg_black': '40',
    'bg_red': '41',
    'bg_green': '42',
    'bg_yellow': '43',
    'bg_blue': '44',
    'bg_magenta': '45',
    'bg_cyan': '46',
    'bg_white': '47'
  }

  return '\x1B[' + COLORS[style] + 'm'
}

/**
 * Returns the curent datetime in human readable string
 * @return {String}
 */
let timestamp = () => {
  let now = new DateTime()
  return now.toString()
}

/**
 * Output class
 */
class Output {
  /**
   * Direct output
   */
  static write () {
    try {
      console.log.apply( null, arguments )
    } catch ( e ) {}
  }
  /**
   * Wrapper for console.log
   */
  static log () {
    try {
      console.log.apply( null, [ timestamp(), color( 'green' ) + '[ LOG ]' + color( 'reset' ), ...arguments ] )
    } catch ( e ) {}
  }

  /**
   * Wrapper for console.info
   */
  static info () {
    try {
      console.info.apply( this, [ timestamp(), color( 'bg_green' ) + '[ INFO ]' + color( 'reset' ), ...arguments ] )
    } catch ( e ) {}
  }

  /**
   * Wrapper for console.warn
   */
  static warn () {
    try {
      console.log.apply( this, [ timestamp(), color( 'hicolor' ) + color( 'bg_yellow' ) + '[ WARNING ]' + color( 'reset' ), color( 'yellow' ), ...arguments, color( 'reset' ) ] )
    } catch ( e ) {}
  }

  /**
   * Wrapper for console.error
   */
  static error () {
    try {
      console.log( '\n\r' )
      console.log.apply( this, [ timestamp(), color( 'hicolor' ) + color( 'bg_red' ) + '[ ERROR ]' + color( 'reset' ), color( 'red' ), ...arguments, color( 'reset' ) ] )
      console.log( '\n\r' )
    } catch ( e ) {}
  }
}

module.exports = Output
