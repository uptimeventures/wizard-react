// @flow

// Copyright 2017 Uptime Ventures, Ltd. All rights reserved.
// Use of this source code is governed by a BSD-style license
// that can be found in LICENSE.md, at the root of this repository.

import { Component } from 'react'
import PropTypes from 'prop-types'

export type Step = {
  name: Function,
  component?: Function,
  render?: Function,
}

export type Props = {
  onComplete: Function,
  onUpdate: Function,
  steps: Array<Function | Step>,
  render: Function,
  children: Function,
}

export type State = {
  index: number,
}

export default class Wizard extends Component<Props, State> {
  static defaultProps = {
    steps: [],
  }

  static childContextTypes = {
    wizard: PropTypes.object,
  }

  state = {
    index: 0,
  }

  jump = (to: string) => {
    const index = this.props.steps.findIndex((f: Step) => f.name === to)
    if (index) {
      this.setState({ index })
    }
  }

  next = () => {
    const index = this.state.index === this.props.steps.length - 1 ? this.props.steps.length - 1 : this.state.index + 1

    this.setState({ index })

    if (
      index === this.props.steps.length - 1 &&
      typeof this.props.onComplete === 'function'
    ) {
      this.props.onComplete()
    }

    if (typeof this.props.onUpdate === 'function') {
      this.props.onUpdate({ index })
    }
  }

  prev = () => {
    const index = this.state.index === 0 ? this.state.index : this.state.index - 1

    this.setState({ index })

    if (typeof this.props.onUpdate === 'function') {
      this.props.onUpdate({ index })
    }
  }

  getChildContext() {
    return {
      wizard: {
        steps: this.props.steps,
        index: this.state.index,
        next: this.next,
        prev: this.prev,
        jump: this.jump,
      },
    }
  }

  render() {
    const { render, children, ...rest } = this.props

    if (render) {
      return render(rest)
    }

    if (children) {
      return children(rest)
    }

    return null
  }
}
