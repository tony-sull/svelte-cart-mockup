import { derived, writable } from 'svelte/store'
import { addItemToState } from './addItemToState'
import { getItemsCount } from './getItemsCount'
import { getTotalPrice } from './getTotalPrice'
import { removeSkuFromState } from './removeSkuFromState'
import { setSkuQuantityInState } from './setSkuQuantityInState'

export type CartItem = {
    sku: string
    brand: string
    title: string
    description: string
    quantity: number
    itemPrice: number
}

export type CartState = {
    items: CartItem[]
}

function defaultState(): CartState {
    return {
        items: []
    }
}

export function createCartStore(initialState: CartState = defaultState()) {
    const store = writable(initialState)

    const { update, set, subscribe } = store

    const reset = () => set(defaultState())
    const itemsCount = () => derived(store, getItemsCount)
    const totalPrice = () => derived(store, getTotalPrice)
    const removeSku = (sku: string) => update(removeSkuFromState(sku))
    const setSkuQuantity = (sku: string, quantity: number) => update(setSkuQuantityInState(sku, quantity))
    const addItem = (item: CartItem) => update(addItemToState(item))

    return {
        subscribe,
        update,
        reset,
        addItem,
        removeSku,
        setSkuQuantity,
        itemsCount,
        totalPrice
    }
}
