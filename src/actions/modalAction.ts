export type ModalActionOptions = {
    close: () => void,
    focusElem?: Element,
    originalFocusElem?: Element
}

function focusOnElement(elem?: Element) {
    if (elem instanceof HTMLElement) {
        elem.focus()
    }
}

export function modalAction(node: HTMLElement, options?: ModalActionOptions) {
    const originalOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    function onTransitionEnd(e: TransitionEvent) {
        const node = e.target as HTMLElement
        node.focus()
    }
    
    function onKeyDown(e: KeyboardEvent) {
        if (e.key === 'Escape' && options?.close) {
            options.close()
            e.stopPropagation()
        }
    }

    node.addEventListener('transitionend', onTransitionEnd)
    node.addEventListener('keydown', onKeyDown)

    focusOnElement(options?.focusElem)

    return {
        destroy: () => {
            document.body.style.overflow = originalOverflow
            focusOnElement(options.originalFocusElem)
            node.removeEventListener('transitionend', onTransitionEnd)
            node.removeEventListener('keydown', onKeyDown)
        }
    }
}