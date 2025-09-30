import { memo } from '../util/index.js';
/**
 * @name auxData
 * @description Retrieves SPIN auxiliary data including authorities and session length
 * @example
 * ```javascript
 * api.derive.spin.auxData().subscribe((auxData) => {
 *   if (auxData) {
 *     const [authorities, sessionLength] = auxData;
 *     console.log(`SPIN authorities: ${authorities.length}, session length: ${sessionLength}`);
 *   }
 * });
 * ```
 */
export function auxData(instanceId, api) {
    return memo(instanceId, () => {
        try {
            const result = api.call['spinApi']['auxData']();
            return result;
        }
        catch {
            return undefined;
        }
    });
}
