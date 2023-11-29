import _isFinite from 'lodash/isFinite'

import * as D from '../db'
import * as U from '../utils'
import * as C from '../color'
import { genEntry } from '../sheets'
import { type TimeTrackerDB } from '../types'

const COMMAND_CONFIG = {
  command: 'resume',
  describe: 'Resume the last active entry',
  alias: 'r'
}

interface ResumeCommandArgs {
  db: TimeTrackerDB
}

const handler = async (args: ResumeCommandArgs) => {
  const { db } = args
  const lastActiveSheet = D.findLastActiveSheet(db)

  if (lastActiveSheet === null) {
    throw new Error('No recent active sheet')
  }

  const { name } = lastActiveSheet
  const lastActiveEntry = D.findLastActiveSheetEntry(lastActiveSheet)

  if (lastActiveEntry === null) {
    throw new Error(`No recent entry for sheet ${name}`)
  }

  const { id, description, end } = lastActiveEntry

  if (_isFinite(end)) {
    throw new Error(
      `Sheet ${name} already has an active entry (${id}: ${description})`
    )
  }

  const newEntryID = id + 1
  const newEntry = genEntry(newEntryID, description)

  lastActiveSheet.entries.push(newEntry)
  lastActiveSheet.activeEntryID = newEntryID

  await D.saveDB(db)

  console.log(
    `${C.clSheet(`[sheet ${name}]`)} ${C.clText('Resumed entry')} ${C.clID(
      `(${newEntryID})`
    )} ${C.clHighlight(description)}`
  )
}

export default {
  ...COMMAND_CONFIG,
  handler: U.cmdHandler(handler)
}