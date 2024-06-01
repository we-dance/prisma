import { Command } from 'commander'
import { importAccounts, importEvents, importProfiles } from './importer'
import { logger } from './utils/logger'
import cliProgress from 'cli-progress'

function getLogLevel(verbosity: number) {
  switch (verbosity) {
    case 0:
      return '';
    case 1:
      return 'warning';
    case 2:
      return 'info';
    default:
      return 'debug';
  }
}

const program = new Command()

program
  .name('prisma-import')
  .option('-v, --verbose', 'increase verbosity', (value, previous) => previous + 1, 0)

program.command('import')
  .option('--all', 'Import everything')
  .option('-a, --accounts', 'Import accounts')
  .option('-p, --profiles', 'Import profiles')
  .option('-e, --events', 'Import events')
  .action(async (options) => {
    const { all, accounts, profiles, events } = options;
    logger.level = getLogLevel(program.opts().verbose);

    const multibar = new cliProgress.MultiBar({
      clearOnComplete: false,
      hideCursor: true,
      format: ` {bar} | {collection} | {eta_formatted} | {value}/{total} | {failed} failed, {created} created, {ignored} ignored, {updated} updated`,
    });

    if (all || accounts) {
      await importAccounts(multibar)
    }

    if (all || profiles) {
      await importProfiles(multibar)
    }

    if (all || events) {
      await importEvents(multibar)
    }
})

program.parse(process.argv)
