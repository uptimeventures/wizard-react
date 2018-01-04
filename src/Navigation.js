// @flow

// Copyright 2017 Uptime Ventures, Ltd. All rights reserved.
// Use of this source code is governed by a BSD-style license
// that can be found in LICENSE.md, at the root of this repository.

import { Component } from 'react'

import WizardContext, { type API } from './WizardContext'

type Props = {
  render?: Function,
  children?: Function,
  api: API,
}

class Nav extends Component<Props, void> {
  render() {
    const { api, render, children } = this.props

    if (render) {
      return render(api)
    }

    if (children) {
      return children(api)
    }

    return null
  }
}

export default WizardContext(Nav)
