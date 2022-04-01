export function getFirstElement(classId: string): Element | null {
    const elements = document.getElementsByClassName(classId)
    return elements.item(0)
}

export function getProgressDuration(element_class: string): number | null {
    const element = getFirstElement(element_class)
    if (!element) return null

    const valuemax = element.getAttribute("aria-valuemax")
    if (!valuemax) return null

    return parseInt(valuemax) * 1000
}

export function getProgressElapsed(element_class: string): number | null {
    const element = getFirstElement(element_class)
    if (!element) return null

    const valuenow = element.getAttribute("aria-valuenow")
    if (!valuenow) return null

    return parseInt(valuenow) * 1000
}