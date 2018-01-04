# Wizard :crystal_ball:

[![CI Status
Badge](https://travis-ci.org/uptimeventures/wizard.svg?branch=master)](https://travis-ci.org/uptimeventures/wizard)
[![NSP Status](https://nodesecurity.io/orgs/uptimeventures/projects/d97d425c-f377-4e76-b659-9ac8b49e7144/badge)](https://nodesecurity.io/orgs/uptimeventures/projects/d97d425c-f377-4e76-b659-9ac8b49e7144)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![Made by Uptime Ventures
badge](https://img.shields.io/badge/made_by-Uptime_Ventures-fcb040.svg)](https://www.uptime.ventures)

Lightweight, multi-step flow-control for React and React Native.

## Installation

`npm install @uptimeventures/react-wizard`

## Usage

```javascript
import React from 'react'
import Wizard, { Content, Navigation } from '@uptimeventures/react-wizard'

const App = () =>
  <Wizard
    steps={[
      { scene: 'welcome', component: () => <h2>Welcome</h2> },
      () => <h2>Step Two</h2>
    ]}
    component={() =>
      <div>
        <h1>Wizard</h1>
        <Content/>
        <Navigation
          render={({ prev, next }) =>
            <div>
              <button onClick={prev}>Previous</button>
              <button onClick={next}>Next</button>
            </div>
          }
        />
      </div>
    }
  />
```

## License

&copy; 2017 Uptime Ventures, Ltd. All rights reserved. Released under the
[3-Clause BSD License](LICENSE.md).
