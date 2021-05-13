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
        quantity: 3,
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
    test('should update subscribers', () => {
        const store = createCartStore({
            items: testItems
        })

        const mock = jest.fn()
        const unsubscribe = store.subscribe(mock)

        store.reset()

        expect(mock).toHaveBeenLastCalledWith({
            items: []
        })

        unsubscribe()
    })
})

describe('cartStore.addItem', () => {
    test('should update subscribers', () => {
        const store = createCartStore()

        const mock = jest.fn()
        const unsubscribe = store.subscribe(mock)

        store.addItem(testItems[0])

        expect(mock).toHaveBeenLastCalledWith({
            items: [testItems[0]]
        })

        unsubscribe()
    })
})

describe('cartStore.removeSku', () => {
    test('should update subscribers', () => {
        const store = createCartStore({
            items: testItems
        })

        const mock = jest.fn()
        const unsubscribe = store.subscribe(mock)

        store.removeSku(testItems[1].sku)

        expect(mock).toHaveBeenLastCalledWith({
            items: [testItems[0]]
        })

        unsubscribe()
    })
})

describe('cartStore.setSkuQuantity', () => {
    test('should update subscribers', () => {
        const store = createCartStore({
            items: testItems
        })

        const mock = jest.fn()
        const unsubscribe = store.subscribe(mock)

        store.setSkuQuantity(testItems[0].sku, 10)

        expect(mock).toHaveBeenLastCalledWith({
            items: [
                { ...testItems[0], quantity: 10 },
                testItems[1]
            ]
        })

        unsubscribe()
    })
})

describe('cartStore.itemsCount', () => {
    test('should be subscribable', () => {
        const store = createCartStore()
        const itemsCount = store.itemsCount()

        expect(itemsCount.subscribe).toBeInstanceOf(Function)
    })

    test('should be called immediately after subscribe()', () => {
        const store = createCartStore({
            items: testItems
        })
        const itemsCount = store.itemsCount()
        
        const mock = jest.fn()
        const unsubscribe = itemsCount.subscribe(mock)

        expect(mock).toHaveBeenCalledTimes(1)
        expect(mock).toHaveBeenLastCalledWith(5)

        unsubscribe()
    })

    test('should be called again after addItem', () => {
        const store = createCartStore({
            items: [testItems[0]]
        })
        const itemsCount = store.itemsCount()

        const mock = jest.fn()
        const unsubscribe = itemsCount.subscribe(mock)

        store.addItem(testItems[1])

        expect(mock).toHaveBeenCalledTimes(2)
        expect(mock).toHaveBeenLastCalledWith(5)

        unsubscribe()
    })

    test('should be called again after removeSku', () => {
        const store = createCartStore({
            items: testItems
        })
        const itemsCount = store.itemsCount()

        const mock = jest.fn()
        const unsubscribe = itemsCount.subscribe(mock)

        store.removeSku(testItems[1].sku)

        expect(mock).toHaveBeenCalledTimes(2)
        expect(mock).toHaveBeenLastCalledWith(2)

        unsubscribe()
    })

    test('should be called again after setSkuQuantity', () => {
        const store = createCartStore({
            items: testItems
        })
        const itemsCount = store.itemsCount()

        const mock = jest.fn()
        const unsubscribe = itemsCount.subscribe(mock)

        store.setSkuQuantity(testItems[0].sku, 10)

        expect(mock).toHaveBeenCalledTimes(2)
        expect(mock).toHaveBeenLastCalledWith(13)

        unsubscribe()
    })
})

describe('cartStore.totalPrice', () => {
    test('should be subscribable', () => {
        const store = createCartStore()
        const totalPrice = store.totalPrice()

        expect(totalPrice.subscribe).toBeInstanceOf(Function)
    })

    test('should be called immediately after subscribe()', () => {
        const store = createCartStore({
            items: testItems
        })
        const totalPrice = store.totalPrice()
        
        const mock = jest.fn()
        const unsubscribe = totalPrice.subscribe(mock)

        expect(mock).toHaveBeenCalledTimes(1)
        expect(mock).toHaveBeenLastCalledWith(330)

        unsubscribe()
    })

    test('should be called again after addItem', () => {
        const store = createCartStore({
            items: [testItems[0]]
        })
        const totalPrice = store.totalPrice()

        const mock = jest.fn()
        const unsubscribe = totalPrice.subscribe(mock)

        store.addItem(testItems[1])

        expect(mock).toHaveBeenCalledTimes(2)
        expect(mock).toHaveBeenLastCalledWith(330)

        unsubscribe()
    })

    test('should be called again after removeSku', () => {
        const store = createCartStore({
            items: testItems
        })
        const totalPrice = store.totalPrice()

        const mock = jest.fn()
        const unsubscribe = totalPrice.subscribe(mock)

        store.removeSku(testItems[1].sku)

        expect(mock).toHaveBeenCalledTimes(2)
        expect(mock).toHaveBeenLastCalledWith(150)

        unsubscribe()
    })

    test('should be called again after setSkuQuantity', () => {
        const store = createCartStore({
            items: testItems
        })
        const totalPrice = store.totalPrice()

        const mock = jest.fn()
        const unsubscribe = totalPrice.subscribe(mock)

        store.setSkuQuantity(testItems[0].sku, 10)

        expect(mock).toHaveBeenCalledTimes(2)
        expect(mock).toHaveBeenLastCalledWith(930)

        unsubscribe()
    })
})