import type { CartState } from '..'
import { getItemsCount } from '../getItemsCount'

test('should return 0 for an empty cart', () => {
    const state: CartState = { items: [] }

    const result = getItemsCount(state)
    expect(result).toBe(0)
})

test('should return the quantity of a single cart item', () => {
    const state: CartState = {
        items: [
            {
                sku: 'overside-blazer-bl-36',
                brand: 'Test Brand',
                title: 'Oversize Blazer',
                description: 'Black, size: 36',
                quantity: 2,
                itemPrice: 75
            }
        ]
    }

    const result = getItemsCount(state)
    expect(result).toBe(2)
})

test('should return the total quantity of multiple cart items', () => {
    const state: CartState = {
        items: [
            {
                sku: 'overside-blazer-bl-36',
                brand: 'Test Brand',
                title: 'Oversize Blazer',
                description: 'Black, size: 36',
                quantity: 2,
                itemPrice: 75
            },
            {
                sku: 'undersize-blazer-bl-36',
                brand: 'Test Brand',
                title: 'Undersize Blazer',
                description: 'Black, size: 36',
                quantity: 3,
                itemPrice: 60
            }
        ]
    }

    const result = getItemsCount(state)
    expect(result).toBe(5)
})

test('should ignore items with an invalid quantity', () => {
    const state: CartState = {
        items: [
            {
                sku: 'overside-blazer-bl-36',
                brand: 'Test Brand',
                title: 'Oversize Blazer',
                description: 'Black, size: 36',
                quantity: 2,
                itemPrice: 75
            },
            {
                sku: 'undersize-blazer-bl-36',
                brand: 'Test Brand',
                title: 'Undersize Blazer',
                description: 'Black, size: 36',
                quantity: -3,
                itemPrice: 60
            }
        ]
    }

    const result = getItemsCount(state)
    expect(result).toBe(2)
})