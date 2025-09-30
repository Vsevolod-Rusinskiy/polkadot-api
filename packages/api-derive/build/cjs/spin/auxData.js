"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auxData = auxData;
const index_js_1 = require("../util/index.js");
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
function auxData(instanceId, api) {
    return (0, index_js_1.memo)(instanceId, () => {
        try {
            const result = api.call['spinApi']['auxData']();
            return result;
        }
        catch {
            return undefined;
        }
    });
}
