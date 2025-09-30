import type { Observable } from 'rxjs';
import type { AccountId } from '@polkadot/types/interfaces';
import type { HeaderExtended } from '../types.js';
import type { DeriveApi } from '../types.js';
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
export declare function blockAuthor(instanceId: string, api: DeriveApi): (header: HeaderExtended) => Observable<AccountId | undefined>;
