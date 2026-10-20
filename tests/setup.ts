import { afterEach } from 'vitest'

afterEach(() => {
  document.body.innerHTML = ''
  document.body.className = ''
})

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  }),
})

Object.defineProperty(HTMLElement.prototype, 'scrollBy', {
  configurable: true,
  value: () => undefined,
})

Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  configurable: true,
  value: () => ({ measureText: (text: string) => ({ width: text.length * 8 }) }),
})
