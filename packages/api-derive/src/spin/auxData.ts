// Copyright 2017-2025 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Observable } from 'rxjs'
import type { DeriveApi } from '../types.js'
import type { SpinAuxData } from './types.js'


import { memo } from '../util/index.js'

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
export function auxData (instanceId: string, api: DeriveApi): () => Observable<SpinAuxData | undefined> {
  return memo(instanceId, () => {
    try {
      const result = api.call['spinApi']['auxData']()
      return result as unknown as SpinAuxData
    } catch {
      return undefined
    }
  })
}
