import * as chalk from 'chalk';
const log = console.log;

export function printInfo(): void {
  const HOST = 'http://127.0.0.1';
  log(chalk.yellow.bold('manager starting...  🚀'.padStart(16)));
  log('\n');
  log(
    chalk.red.bold('Restful接口链接:'.padStart(16)),
    chalk.green.underline(`${HOST}:${process.env.PORT}`),
  );
}
