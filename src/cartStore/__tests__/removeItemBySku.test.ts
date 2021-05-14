import { removeSkuFromState } from '../removeSkuFromState'
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

describe('removeSkuFromState', () => {
    test('should be a function', () => {
        expect(removeSkuFromState).toBeInstanceOf(Function)
    })

    test('should return a function', () => {
        expect(removeSkuFromState('test-123')).toBeInstanceOf(Function)
    })

    test('should not throw for an empty state', () => {
        const state: CartState = {
            items: []
        }

        expect(() => removeSkuFromState('test-123')(state)).not.toThrow()
    })

    test('should remove a known SKU', () => {
        const item = testItems[0]
        const state: CartState = {
            items: [ item ]
        }

        const result = removeSkuFromState(item.sku)(state)

        expect(result.items).toEqual([])
    })

    test('should not remove other SKUs', () => {
        const state: CartState = {
            items: testItems
        }

        const result = removeSkuFromState(testItems[1].sku)(state)

        expect(result.items).toEqual([testItems[0]])
    })

    test('should ignore unknown SKUs', () => {
        const state: CartState = {
            items: testItems
        }

        const result = removeSkuFromState('test-123')(state)

        expect(result.items).toEqual(testItems)
    })
})