import { createSignal } from 'solid-js'

const useToggleBoolean = () => {
    const [status, setStatus] = createSignal(false)
    const toggleStatus = () => setStatus(prev => !prev)

    return { status, toggleStatus }
}

export default useToggleBoolean