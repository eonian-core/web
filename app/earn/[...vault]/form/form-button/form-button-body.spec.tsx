import React from 'react'
import { render } from '@testing-library/react'
import { FormButtonBody } from './form-button-body'

describe('FormButtonBody', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<FormButtonBody />)
    expect(asFragment()).toMatchSnapshot()
  })
})
