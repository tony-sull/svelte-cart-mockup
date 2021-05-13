import { removeSkuFromState } from './removeSkuFromState'
import type { CartState } from '.'

export function setSkuQuantityInState(sku: string, quantity: number) {
    // if setting a SKU's quantity to 0, remove it from the cart state
    if (quantity <= 0) {
        return removeSkuFromState(sku)
    }

    return function(state: CartState) {
        return {
            ...state,
            items: state.items.map(item => {
                return item.sku === sku
                    ? { ...item, quantity }
                    : item
            })
        }
    }
}