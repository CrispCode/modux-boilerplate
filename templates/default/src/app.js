/* globals window, document */

'use strict'

import {
  Module,

  extend,
  logger
} from '@crispcode/modux'

import { communication } from './communication.js'
import { defaults } from './config.js'

import { LoaderComponent } from './loader'
import { LayoutComponent } from './src/layout.js'

import './app.scss'

let initialize = () => {
  // Create application
  let app = new Module( 'app' )
  app
    .addDependency( 'layout', LayoutComponent )
    .addDependency( 'loader', LoaderComponent )

  return communication.post( defaults.api.config )
    .then( ( response ) => {
      // Set configuration object
      app.store.set( 'settings', extend( defaults, response ) )

      // Set logger debug mode
      logger.enabled( app.store.get( 'settings.debug' ) )

      // Start application
      app.bootstrap( document.querySelector( 'body' ), 'layout' )
    } )
}

window.addEventListener( 'load', () => {
  initialize()
    .then( () => {
      logger.info( 'Application started' )
    } )
    .catch( ( err ) => {
      logger.error( err )
    } )
} )
