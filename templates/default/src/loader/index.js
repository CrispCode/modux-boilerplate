'use strict'

import { Component, loader, logger, loop, Font, extend } from '@crispcode/modux'

import template from './template.html'
import './index.scss'

export class LoaderComponent extends Component {
  get template () {
    return template
  }

  get files () {
    let files = {}
    loop( this.store.get( 'settings.preload.images' ), ( file, name ) => {
      files[ name ] = { 'url': this.store.get( 'settings.images' ) + file, 'type': 'image' }
    } )
    return files
  }

  get fonts () {
    let fonts = []
    loop( this.store.get( 'settings.preload.fonts' ), ( data ) => {
      let font = extend( {}, data )
      let src = []
      loop( data.src, ( file ) => {
        src.push( 'url(\'' + this.store.get( 'settings.fonts' ) + file.url + '\') format(\'' + file.format + '\')' )
      } )
      font.src = src
      fonts.push( font )
    } )
    return fonts
  }

  loadFonts ( callback ) {
    let fontsList = []
    let count = 0
    loop( this.fonts, ( data ) => {
      count++
      fontsList.push(
        Font.create( data.name, data.style )
          .get( data.src )
          .load( 10, 500 )
          .then( () => {
            callback( count )
          } )
          .catch( () => {
            logger.error( 'Could not load font ' + data.name )
          } )
      )
    } )
    return Promise.all( fontsList )
  }

  execute () {
    this.show( false )

    const logo = this.store.get( 'settings.images' ) + this.store.get( 'settings.preload.images.loader' )
    loader.preloadImage( 'loader', logo )
      .then( () => {
        this.show( true )
        this.element.querySelector( '.logo' ).src = logo

        const total = Object.keys( this.files ).length + Object.keys( this.fonts ).length
        let count = 0

        this.loadFonts( ( loaded ) => {
          this.progress( loaded * 100 / total )
          count = loaded
        } )
          .then( () => {
            return loader.preload( this.files, ( err, id, data, loaded ) => {
              if ( err ) {
                logger.warn( 'Cannot load file: ' + this.files[ id ].url )
              }
              this.progress( ( count + loaded ) * 100 / total )
            } )
          } )
          .then( () => {
            setTimeout( () => {
              this.show( false )
              this.store.set( 'action.preload' )
            }, 100 )
          } )
          .catch( ( err ) => {
            logger.error( err.message )
            this.store.set( 'action.preload' )
          } )
      } )
      .catch( ( err ) => {
        logger.error( err )
      } )
  }

  progress ( progress ) {
    let value = parseInt( progress ) / 100 * this.element.querySelector( '.progress' ).offsetWidth
    this.element.querySelector( '.progress-bar' ).style.width = value + 'px'
  }

  show ( show ) {
    if ( show ) {
      this.element.classList.remove( 'hide' )
    } else {
      this.element.classList.add( 'hide' )
    }
  }
}
