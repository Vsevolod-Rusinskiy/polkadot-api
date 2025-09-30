"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockAuthor = blockAuthor;
const rxjs_1 = require("rxjs");
const index_js_1 = require("../util/index.js");
function extractSpinSlot(header, api) {
    const spinLog = header.digest.logs.find(log => {
        if (log.isPreRuntime) {
            const [engine] = log.asPreRuntime;
            return engine.toString() === 'spin';
        }
        return false;
    });
    if (!spinLog)
        return undefined;
    const [, data] = spinLog.asPreRuntime;
    const slot = api.registry.createType('Slot', data);
    return Number(slot);
}
/**
 * @name blockAuthor
 * @description Retrieves the block author for SPIN consensus
 * @example
 * ```javascript
 * api.derive.spin.blockAuthor(header).subscribe((author) => {
 *   if (author) {
 *     console.log(`Block author: ${author.toString()}`);
 *   }
 * });
 * ```
 */
function blockAuthor(instanceId, api) {
    return (0, index_js_1.memo)(instanceId, (header) => (0, rxjs_1.combineLatest)([
        api.derive.spin.auxData()
    ]).pipe((0, rxjs_1.map)(([auxData]) => {
        if (!auxData)
            return undefined;
        const slotNum = extractSpinSlot(header, api);
        if (slotNum === undefined)
            return undefined;
        const [authorities, sessionLength] = auxData;
        if (!authorities.length)
            return undefined;
        const sessionLengthNum = Number(sessionLength);
        const sessionIndex = Math.floor(slotNum / sessionLengthNum);
        const leaderIdx = sessionIndex % authorities.length;
        return authorities[leaderIdx];
    })));
}
