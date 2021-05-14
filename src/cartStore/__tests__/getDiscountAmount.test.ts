import { getDiscountAmount } from '../getDiscountAmount'
import type { CartState } from '..'

const testItems = [
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

test('should return 0 for an empty cart', () => {
    const state: CartState = {
        items: []
    }
    expect(getDiscountAmount(state)).toBe(0)
})

test('should return 0 when no discount is applied', () => {
    const state: CartState = {
        items: testItems
    }

    expect(getDiscountAmount(state)).toBe(0)
})

test('should return the flat amount when an amount off discount is applied', () => {
    const state: CartState = {
        items: testItems,
        discount: {
            title: '50 SEK off',
            description: 'New customer discount',
            discountAmount: 50
        }
    }

    expect(getDiscountAmount(state)).toBe(50)
})

test('should return a calculated percentage for pecent off discounts', () => {
    const state: CartState = {
        items: testItems,
        discount: {
            title: '10% off',
            description: 'New customer discount',
            discountPercent: 10
        }
    }

    expect(getDiscountAmount(state)).toBe(33)
})
