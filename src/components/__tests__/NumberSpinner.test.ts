import { fireEvent, render } from '@testing-library/svelte'
import NumberSpinner from '../NumberSpinner.svelte'

test('should render', () => {
    const { getByLabelText } = render(NumberSpinner, { props: { label: "spinner" } })
    expect(() => getByLabelText('spinner')).not.toThrow()
})

test('should include a plus button', () => {
    const { getByLabelText } = render(NumberSpinner)
    expect(() => getByLabelText('plus')).not.toThrow()
})

test('should include a minus button', () => {
    const { getByLabelText } = render(NumberSpinner)
    expect(() => getByLabelText('minus')).not.toThrow()
})

test('should include a value label', () => {
    const { getByLabelText } = render(NumberSpinner)
    expect(() => getByLabelText('value')).not.toThrow()
})

test('should display the initial value', () => {
    const { getByLabelText } = render(NumberSpinner, { props: { value: 10 }})
    const valueElem = getByLabelText('value')
    expect(valueElem.textContent).toBe('10')
})

test('plus should increment the component\'s value', () => {
    const { getByLabelText, component } = render(NumberSpinner, { props: { value: 10 }})
    const plusElem = getByLabelText('plus')

    fireEvent.click(plusElem)

    expect(component.value).toBe(11)
})

test('plus should allow multiple clicks in a row', () => {
    const { getByLabelText, component } = render(NumberSpinner, { props: { value: 10 }})
    const plusElem = getByLabelText('plus')

    for(let i = 0; i < 5; i++) {
        fireEvent.click(plusElem)
    }

    expect(component.value).toBe(15)
})

test('plus should respect the max value', () => {
    const { getByLabelText, component } = render(NumberSpinner, { props: { value: 10, max: 15 }})
    const plusElem = getByLabelText('plus')

    for (let i = 0; i < 10; i++) {
        fireEvent.click(plusElem)
    }

    expect(component.value).toBe(15)
})

test('plus should respect the step value', () => {
    const { getByLabelText, component } = render(NumberSpinner, { props: { value: 10, step: 2 }})
    const plusElem = getByLabelText('plus')

    fireEvent.click(plusElem)

    expect(component.value).toBe(12)
})

test('minus should decrement the component\'s value', () => {
    const { getByLabelText, component } = render(NumberSpinner, { props: { value: 10 }})
    const minusElem = getByLabelText('minus')

    fireEvent.click(minusElem)

    expect(component.value).toBe(9)
})

test('minus should allow multiple clicks in a row', () => {
    const { getByLabelText, component } = render(NumberSpinner, { props: { value: 10 }})
    const minusElem = getByLabelText('minus')

    for(let i = 0; i < 5; i++) {
        fireEvent.click(minusElem)
    }

    expect(component.value).toBe(5)
})

test('minus should respect the min value', () => {
    const { getByLabelText, component } = render(NumberSpinner, { props: { value: 10, min: 5 }})
    const minusElem = getByLabelText('minus')

    for(let i = 0; i < 10; i++) {
        fireEvent.click(minusElem)
    }

    expect(component.value).toBe(5)
})

test('minus should respect the step value', () => {
    const { getByLabelText, component } = render(NumberSpinner, { props: { value: 10, step: 2 }})
    const minusElem = getByLabelText('minus')

    fireEvent.click(minusElem)

    expect(component.value).toBe(8)
})
