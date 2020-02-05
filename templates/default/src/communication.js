'use strict'

import { Communication } from '@crispcode/modux'

const request = ( method, url, params ) => {
  return new Promise( ( resolve, reject ) => {
    let comm = new Communication()

    if ( params ) {
      comm.addFields( params )
    }

    comm.listener( null, ( err, response ) => {
      if ( err ) {
        reject( 'Invalid or no data received from the server' )
        return
      }
      try {
        response = JSON.parse( response )
      } catch ( e ) {
        reject( 'Invalid data received from the server' )
      }
      if ( response.error ) {
        reject( response.error )
        return
      }
      resolve( response )
    } )

    if ( method === 'POST' ) {
      comm.post( url )
    } else {
      comm.get( url )
    }
  } )
}

export let communication = {
  get: ( url, params ) => {
    return request( 'GET', url, params )
  },
  post: ( url, params ) => {
    return request( 'POST', url, params )
  }
}
