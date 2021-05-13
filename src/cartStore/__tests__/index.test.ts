import { get } from 'svelte/store'
import { createCartStore } from '..'

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
        quantity: -3,
        itemPrice: 60
    }
]

describe('createCartStore', () => {
    test('should be a function', () => {
        expect(createCartStore).toBeInstanceOf(Function)
    })

    test('should default to an empty state', () => {
        const store = createCartStore()
        expect(store).toBeDefined()
    })

    test('should accept initial cart items', () => {
        const store = createCartStore({
            items: testItems
        })

        const state = get(store)

        expect(state.items).toEqual(testItems)
    })
})

describe('cartStore.reset', () => {
    test('should be a function', () => {
        const { reset } = createCartStore()
        expect(reset).toBeInstanceOf(Function)
    })

    test('should not throw for an empty store', () => {
        const { reset } = createCartStore()
        expect(() => reset()).not.toThrow()
    })

    test('should remove all items from the store', () => {
        const store = createCartStore({
            items: testItems
        })

        store.reset()

        const state = get(store)

        expect(state.items).toEqual([])
    })
})

describe('cartStore.addItem', () => {
    test('should be a function', () => {
        const { addItem } = createCartStore()
        expect(addItem).toBeInstanceOf(Function)
    })

    test('should add an item to an empty store', () => {
        const store = createCartStore()
        store.addItem(testItems[0])

        const state = get(store)

        expect(state.items).toEqual([testItems[0]])
    })

    test('should not change existing items', () => {
        const [ item1, item2 ] = testItems
        const store = createCartStore({
            items: [item1]
        })

        store.addItem(item2)

        const state = get(store)

        expect(state.items).toEqual(testItems)
    })
})

describe('cartStore.removeSku', () => {
    test('should be a function', () => {
        const { removeSku } = createCartStore()
        expect(removeSku).toBeInstanceOf(Function)
    })

    test('should not throw for an empty store', () => {
        const { removeSku } = createCartStore()
        expect(() => removeSku(testItems[0].sku)).not.toThrow()
    })

    test('should remove a known SKU from the cart', () => {
        const testItem = testItems[0]
        const store = createCartStore({
            items: [testItem]
        })

        store.removeSku(testItem.sku)

        const state = get(store)
        expect(state.items).toEqual([])
    })

    test('should not remove other items', () => {
        const store = createCartStore({
            items: testItems
        })

        store.removeSku(testItems[1].sku)

        const state = get(store)
        expect(state.items).toEqual([testItems[0]])
    })

    test('should ignore unknown SKUs', () => {
        const store = createCartStore({
            items: testItems
        })

        store.removeSku('test-123')

        const state = get(store)
        expect(state.items).toEqual(testItems)
    })
})

describe('cartStore.setSkuQuantity', () => {
    test('should be a function', () => {
        const { setSkuQuantity } = createCartStore()
        expect(setSkuQuantity).toBeInstanceOf(Function)
    })

    test('should not throw on empty store', () => {
        const { setSkuQuantity } = createCartStore()
        expect(() => setSkuQuantity('test-123', 3)).not.toThrow()
    })

    test('should update a known SKU\'s quantity', () => {
        const testItem = testItems[0]
        const store = createCartStore({
            items: [ testItem ]
        })

        store.setSkuQuantity(testItem.sku, 10)

        const state = get(store)
        expect(state.items).toEqual([
            { ...testItem, quantity: 10 }
        ])
    })

    test('should not change other SKUs', () => {
        const store = createCartStore({
            items: testItems
        })

        store.setSkuQuantity(testItems[1].sku, 10)

        const state = get(store)
        expect(state.items).toEqual(
            [
                testItems[0],
                { ...testItems[1], quantity: 10 }
            ]
        )
    })

    test('should ignore unknown SKUs', () => {
        const store = createCartStore({
            items: testItems
        })

        store.setSkuQuantity('test-123', 10)

        const state = get(store)
        expect(state.items).toEqual(testItems)
    })
})