'use strict'

import { Component } from '@crispcode/modux'

import template from './layout.html'
import './layout.scss'

import { DemoComponent } from './components/demo/index.js'

export class LayoutComponent extends Component {
  dependencies () {
    this.module.addDependency( 'demo', DemoComponent )
  }

  get template () {
    this.dependencies()

    return template
  }
}
