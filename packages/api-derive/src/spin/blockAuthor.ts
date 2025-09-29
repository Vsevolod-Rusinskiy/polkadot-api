// Copyright 2017-2025 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Observable } from 'rxjs'
import type { AccountId } from '@polkadot/types/interfaces'
import type { HeaderExtended } from '../types.js'
import type { DeriveApi } from '../types.js'
import type { SpinAuxData } from './types.js'

import { combineLatest, map } from 'rxjs'

import { memo } from '../util/index.js'

function extractSpinSlot (header: HeaderExtended, api: DeriveApi): number | undefined {
  const spinLog = header.digest.logs.find(log => {
    if (log.isPreRuntime) {
      const [engine] = log.asPreRuntime
      return engine.toString() === 'spin'
    }
    return false
  })

  if (!spinLog) return undefined

  const [, data] = spinLog.asPreRuntime
  const slot = api.registry.createType('Slot', data)
  return Number(slot)
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
export function blockAuthor (instanceId: string, api: DeriveApi): (header: HeaderExtended) => Observable<AccountId | undefined> {
  return memo(instanceId, (header: HeaderExtended): Observable<AccountId | undefined> =>
    combineLatest([
      api.derive.spin.auxData()
    ]).pipe(
      map(([auxData]: [SpinAuxData | undefined]) => {
        if (!auxData) return undefined

        const slotNum = extractSpinSlot(header, api)
        if (slotNum === undefined) return undefined

        const [authorities, sessionLength] = auxData
        if (!authorities.length) return undefined

        const sessionLengthNum = Number(sessionLength)
        const sessionIndex = Math.floor(slotNum / sessionLengthNum)
        const leaderIdx = sessionIndex % authorities.length

        return authorities[leaderIdx]
      })
    )
  )
}
