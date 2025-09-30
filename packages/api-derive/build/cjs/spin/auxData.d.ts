import type { Observable } from 'rxjs';
import type { DeriveApi } from '../types.js';
import type { SpinAuxData } from './types.js';
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
export declare function auxData(instanceId: string, api: DeriveApi): () => Observable<SpinAuxData | undefined>;
