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

export type PercentDiscount = {
    title: string
    description: string
    discountPercent: number
}

export type AmountDiscount = {
    title: string
    description: string
    discountAmount: number
}

export type Discount = PercentDiscount | AmountDiscount

export function isPercentDiscount(discount: Discount): discount is PercentDiscount {
    return 'discountPercent' in discount
}

export function isAmountDiscount(discount: Discount): discount is AmountDiscount {
    return 'discountAmount' in discount
}

export type CartState = {
    items: CartItem[],
    discount?: Discount
}

function defaultState(): CartState {
    return {
        items: [],
        discount: undefined
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
