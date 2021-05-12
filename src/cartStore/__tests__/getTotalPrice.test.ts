import type { CartState } from '..'
import { getTotalPrice } from '../getTotalPrice'

test('should return 0 for an empty cart', () => {
    const state: CartState = { items: [] }

    const result = getTotalPrice(state)
    expect(result).toBe(0)
})

test('should return the total price of a single cart item', () => {
    const state: CartState = {
        items: [
            {
                brand: 'Test Brand',
                title: 'Oversize Blazer',
                description: 'Black, size: 36',
                quantity: 2,
                itemPrice: 75
            }
        ]
    }

    const result = getTotalPrice(state)
    expect(result).toBe(150)
})

test('should return the total price of multiple cart items', () => {
    const state: CartState = {
        items: [
            {
                brand: 'Test Brand',
                title: 'Oversize Blazer',
                description: 'Black, size: 36',
                quantity: 2,
                itemPrice: 75
            },
            {
                brand: 'Test Brand',
                title: 'Undersize Blazer',
                description: 'Black, size: 36',
                quantity: 3,
                itemPrice: 60
            }
        ]
    }

    const result = getTotalPrice(state)
    expect(result).toBe(330)
})

test('should ignore items with an invalid quantity', () => {
    const state: CartState = {
        items: [
            {
                brand: 'Test Brand',
                title: 'Oversize Blazer',
                description: 'Black, size: 36',
                quantity: 2,
                itemPrice: 75
            },
            {
                brand: 'Test Brand',
                title: 'Undersize Blazer',
                description: 'Black, size: 36',
                quantity: -3,
                itemPrice: 60
            }
        ]
    }

    const result = getTotalPrice(state)
    expect(result).toBe(150)
})