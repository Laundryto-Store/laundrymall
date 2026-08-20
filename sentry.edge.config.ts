import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://af4dba9360bb4bd1ad6dd1b738afcca6@o4511941894209536.ingest.us.sentry.io/4511941931892736",
  tracesSampleRate: 1,
  debug: false,
});
