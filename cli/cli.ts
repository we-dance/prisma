import { Command } from 'commander'
import { importAccounts, importEvents, importProfiles } from './importer'

const program = new Command()

program
  .name('prisma-import')
  .option('-d, --debug', 'enables verbose logging', false)

program.command('import').action(async () => {
  await importAccounts()
  await importProfiles()
  await importEvents()
})

program.command('import:events').action(async () => {
  await importEvents()
})

program.command('import:profiles').action(async () => {
  await importProfiles()
})

program.command('import:accounts').action(async () => {
  await importAccounts()
})

program.parse(process.argv)
