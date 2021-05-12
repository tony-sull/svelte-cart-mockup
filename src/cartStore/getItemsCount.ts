import type { CartState } from '.'

export function getItemsCount(state: CartState) {
    return state.items
        .filter(item => item.quantity > 0)
        .map(item => item.quantity)
        .reduce((acc, next) => acc + next, 0)
}