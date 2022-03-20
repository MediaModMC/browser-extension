export function getFirstElement(classId: string): Element | null {
    const elements = document.getElementsByClassName(classId)
    return elements.item(0)
}