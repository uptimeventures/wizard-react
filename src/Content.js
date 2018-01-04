// @flow

// Copyright 2017 Uptime Ventures, Ltd. All rights reserved.
// Use of this source code is governed by a BSD-style license
// that can be found in LICENSE.md, at the root of this repository.

import React, { Component } from 'react'

import WizardContext, { type API } from './WizardContext'

const createElementFromStep = s => {
  if (typeof s === 'function') {
    return s
  }

  if (s && s.component) {
    return s.component
  }
}

export type Props = {
  render?: Function,
  children?: Function,
  api: API,
}

class Content extends Component<Props, void> {
  render() {
    const { api: { steps, index } } = this.props
    const Step = createElementFromStep(steps[index])

    if (Step) {
      return <Step/>
    }

    return null
  }
}

export default WizardContext(Content)
