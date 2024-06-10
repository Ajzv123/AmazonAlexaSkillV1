const { DebuggerConfig } = require('@jovotech/plugin-debugger');

const debuggerConfig = new DebuggerConfig({
  locales: ['es-MX'],
  buttons: [
    {
      label: 'LAUNCH',
      input: {
        type: 'LAUNCH',
      },
    },
    {
      label: 'Launch',
      input: {
        intent: 'LaunchIntent',
      },
    },
    {
      label: 'Yes',
      input: {
        intent: 'YesIntent',
      },
    },
    {
      label: 'No',
      input: {
        intent: 'NoIntent',
      },
    },
    {
      label: 'Listo',
      input: {
        intent: 'ReadyIntent',
      },
    },
    {
      label: 'Siguiente',
      input: {
        intent: 'NextIntent',
      },
    },
    // ...
  ],
});

module.exports = debuggerConfig;
