'use strict'

import { Component } from '@crispcode/modux'

import template from './template.html'
import './index.scss'

export class DemoComponent extends Component {
  get template () {
    return template
  }

  execute () {
    // Waiting for preloader
    this.store.on( 'action.preload', () => {
      this.element.innerHTML = this.store.get( 'settings.texts.hello' )
    }, true )
  }
}
