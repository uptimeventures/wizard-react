// @flow

// Copyright 2017 Uptime Ventures, Ltd. All rights reserved.
// Use of this source code is governed by a BSD-style license
// that can be found in LICENSE.md, at the root of this repository.

import React, { Component } from 'react'
import PropTypes from 'prop-types'

export type Props = {
  render?: Function,
  children?: Function,
}

type Step = {
  name: string,
  component?: Function,
  render?: Function,
}

export type API = {
  steps: Array<Function | Step>,
  index: number,
  next: Function,
  prev: Function,
  jump: Function,
}

function WizardContext(WrappedComponent: Function) {
  class WizardComponent extends Component<Props, null> {
    static contextTypes = {
      wizard: PropTypes.object,
    }

    render() {
      const api = this.context.wizard
      return (
        <WrappedComponent api={api} {...this.props}/>
      )
    }
  }

  return WizardComponent
}

export default WizardContext
