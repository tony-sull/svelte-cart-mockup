import { fireEvent, render } from '@testing-library/svelte'
import Button from '../Button.svelte'

test("should render", () => {
    const { getByText } = render(Button)
    expect(() => getByText('Click Me')).not.toThrow()
})

test('should display `label` if provided', () => {
    const { getByText } = render(Button, { props: { label: 'Test Button' } })
    expect(() => getByText('Test Button')).not.toThrow()
})

test('should bubble HTML click events', () => {
    const { getByText, component } = render(Button, { props: { label: 'Test Button'} })
    const buttonElem = getByText('Test Button')

    const mock = jest.fn()
    component.$on('click', mock)

    fireEvent.click(buttonElem)

    expect(mock).toHaveBeenCalledTimes(1)
})
