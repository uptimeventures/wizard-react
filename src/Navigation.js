// @flow

// Copyright 2017 Uptime Ventures, Ltd. All rights reserved.
// Use of this source code is governed by a BSD-style license
// that can be found in LICENSE.md, at the root of this repository.

import { Component } from 'react'
import PropTypes from 'prop-types'

type Props = {
  render?: Function,
  children?: Function,
}

export default class Nav extends Component<Props, void> {
  static contextTypes = {
    wizard: PropTypes.object,
  }

  render() {
    const { render, children } = this.props
    const props = this.context.wizard

    if (render) {
      return render(props)
    }

    if (children) {
      return children(props)
    }

    return null
  }
}
