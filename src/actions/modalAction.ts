export type ModalActionOptions = {
    close: () => void
}

export function modalAction(node: HTMLElement, options?: ModalActionOptions) {
    const originalOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    function onTransitionEnd(e: TransitionEvent) {
        const node = e.target as HTMLElement
        node.focus()
    }
    
    function onKeyDown(e: KeyboardEvent) {
        e.stopPropagation()
        if (e.key === 'Escape' && options?.close) {
            options.close()
        }
    }

    node.addEventListener('transitionend', onTransitionEnd)
    node.addEventListener('keydown', onKeyDown)

    node.focus()

    return {
        destroy: () => {
            document.body.style.overflow = originalOverflow
            node.removeEventListener('transitionend', onTransitionEnd)
            node.removeEventListener('keydown', onKeyDown)
        }
    }
}