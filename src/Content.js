// @flow

// Copyright 2017 Uptime Ventures, Ltd. All rights reserved.
// Use of this source code is governed by a BSD-style license
// that can be found in LICENSE.md, at the root of this repository.

import React, { Component } from 'react'
import PropTypes from 'prop-types'

const createElementFromStep = s => {
  if (typeof s === 'function') {
    return s
  }

  if (s && s.component) {
    return s.component
  }
}

export default class Content extends Component<void, void> {
  static contextTypes = {
    wizard: PropTypes.object,
  }

  // $FlowIgnore
  get currentStep() {
    const { steps, index } = this.context.wizard
    if (typeof steps[index] !== 'undefined') {
      return createElementFromStep(steps[index])
    }
    return null
  }

  render() {
    // $FlowIgnore
    const Component = this.currentStep
    return <Component/>
  }
}
