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
    this.databus.on( 'preload', () => {
      this.element.innerHTML = '<h1>Ta da, Modux!</h1>'
    }, true )
  }
}
