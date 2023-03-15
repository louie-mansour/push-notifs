import { migrate } from 'postgres-migrations';

(async () => {
  const dbConfig = {
    host: 'db',
    user: 'push_notifs',
    password: 'push_notifs',
    database: 'push_notifs',
    port: 5432,
    ensureDatabaseExists: true,
    defaultDatabase: 'postgres',
  };
  try {
    console.log('start');
    await migrate(dbConfig, './src/postgresql/migrations/');
    console.log('success');
  } catch (e) {
    console.log('error');
    console.log(e);
  }
})();
