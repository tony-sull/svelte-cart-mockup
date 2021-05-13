import type { CartItem, CartState } from '.'

export function addItemToState(item: CartItem) {
    return function(state: CartState) {
        return {
            ...state,
            items: state.items.concat(item)
        }
    }
}
