import React from 'react'
import { mount } from 'enzyme'

import Wizard from '../Wizard'
import WizardContent from '../Content'
import Navigation from '../Navigation'

describe('<Wizard/>', () => {
  it('should render via callback', () => {
    const rendered = mount(
      <Wizard
        steps={[
          { component: () => <h2>Step One</h2> },
          { component: () => <h2>Step Two</h2> },
        ]}
        render={() =>
          <div>
            <h1>Wizard</h1>
            <WizardContent/>
          </div>
        }
      />
    )

    expect(rendered.contains(<h2>Step One</h2>)).toBe(true)
  })

  it('should render via children function', () => {
    const rendered = mount(
      <Wizard
        steps={[
          { component: () => <h2>Step One</h2> },
          { component: () => <h2>Step Two</h2> },
        ]}
      >
        {() =>
          <div>
            <WizardContent/>
          </div>
        }
      </Wizard>
    )

    expect(rendered.contains(<h2>Step One</h2>)).toBe(true)
  })

  it('should increment index if possible', () => {
    const rendered = mount(
      <Wizard
        steps={[
          { component: () => <h2>Step One</h2> },
          { component: () => <h2>Step Two</h2> },
        ]}
      >
        {() =>
          <div>
            <WizardContent/>
            <Navigation>
              {({ next }) => (
                <div>
                  <button onClick={next}>Next</button>
                </div>
              )}
            </Navigation>
          </div>
        }
      </Wizard>
    )

    expect(rendered.contains(<h2>Step One</h2>)).toBe(true)
    rendered.find('button').simulate('click')
    expect(rendered.contains(<h2>Step Two</h2>)).toBe(true)
  })

  it('should decrement index if possible', () => {
    const rendered = mount(
      <Wizard
        steps={[
          { component: () => <h2>Step One</h2> },
          { component: () => <h2>Step Two</h2> },
        ]}
      >
        {() =>
          <div>
            <WizardContent/>
            <Navigation>
              {({ next, prev }) => (
                <div>
                  <button id="next" onClick={next}>Next</button>
                  <button id="prev" onClick={prev}>Prev</button>
                </div>
              )}
            </Navigation>
          </div>
        }
      </Wizard>
    )

    expect(rendered.contains(<h2>Step One</h2>)).toBe(true)
    rendered.find('button#next').simulate('click')
    expect(rendered.contains(<h2>Step One</h2>)).toBe(false)
    expect(rendered.contains(<h2>Step Two</h2>)).toBe(true)
    rendered.find('button#prev').simulate('click')
    expect(rendered.contains(<h2>Step One</h2>)).toBe(true)
  })

  it('should support jump (if named scenes are available)', () => {
    const rendered = mount(
      <Wizard
        steps={[
          { component: () => <h2>Step One</h2> },
          { component: () => <h2>Step Two</h2> },
          { name: 'final', component: () => <h2>Step Three</h2> },
        ]}
      >
        {() =>
          <div>
            <WizardContent/>
            <Navigation>
              {({ jump }) => (
                <div>
                  <button onClick={() => {
                    jump('final')
                  }}>Jump</button>
                </div>
              )}
            </Navigation>
          </div>
        }
      </Wizard>
    )

    expect(rendered.contains(<h2>Step One</h2>)).toBe(true)
    rendered.find('button').simulate('click')
    expect(rendered.contains(<h2>Step One</h2>)).toBe(false)
    expect(rendered.contains(<h2>Step Three</h2>)).toBe(true)
  })

  it('should fire onComplete when complete', () => {
    const fn = jest.fn()
    const rendered = mount(
      <Wizard
        steps={[
          { component: () => <h2>Step One</h2> },
          { component: () => <h2>Step Two</h2> },
        ]}
        onComplete={fn}
      >
        {() =>
          <div>
            <WizardContent/>
            <Navigation>
              {({ next, prev }) => (
                <div>
                  <button id="next" onClick={next}>Next</button>
                  <button id="prev" onClick={prev}>Prev</button>
                </div>
              )}
            </Navigation>
          </div>
        }
      </Wizard>
    )

    rendered.find('button#next').simulate('click')
    expect(fn.mock.calls.length).toBe(1)
  })
})
