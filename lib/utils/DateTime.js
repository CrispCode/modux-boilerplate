'use strict'

/**
 * An extenion of Date to DateTime
 */
class DateTime extends Date {
  /**
   * Return the date and time in the YYYY-mm-DD HH:MM:ss format
   * @return {String}
   */
  toString () {
    return '' +
      this.getFullYear() +
      '-' +
      ( this.getMonth() + 1 ).toString().padStart( 2, '0' ) +
      '-' +
      this.getDate().toString().padStart( 2, '0' ) +
      ' ' +
      this.getHours().toString().padStart( 2, '0' ) +
      ':' +
      this.getMinutes().toString().padStart( 2, '0' ) +
      ':' +
      this.getSeconds().toString().padStart( 2, '0' )
  }

  /**
   * Returns the time in the HH:MM:ss format
   * @return {String}
   */
  toTime () {
    return '' +
      this.getHours().toString().padStart( 2, '0' ) +
      ':' +
      this.getMinutes().toString().padStart( 2, '0' ) +
      ':' +
      this.getSeconds().toString().padStart( 2, '0' ) +
      '.' +
      this.getMilliseconds().toString().padStart( 3, '0' )
  }

  /**
   * Returns the date in the YYYY-mm-DD format
   * @return {String}
   */
  toDate () {
    return '' +
      this.getFullYear() +
      '-' +
      ( this.getMonth() + 1 ).toString().padStart( 2, '0' ) +
      '-' +
      this.getDate().toString().padStart( 2, '0' )
  }

  /**
   * Returns the milliseconds since the date was created to now
   * @return {String}
   */
  elapsedTime () {
    return Date.now() - this.getTime()
  }
}

module.exports = DateTime
