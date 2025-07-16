// Simple shim so React Query can call unstable_batchedUpdates
import { unstable_batchedUpdates } from 'react-native';

// React Query expects ReactDOM.* namespace.
export const render = () => { /* noop */ };
export const hydrate = () => { /* noop */ };
export const createPortal = () => { /* noop */ };
// ...add other no-ops if bundler complains

export { unstable_batchedUpdates };
export default { unstable_batchedUpdates }; 