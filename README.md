# nodebar - a nodejs implementation of the i3bar status protocol be used as status bar in i3

To configure the app, create a new plugins.ts from the plugins.ts.template and configure them as needed.

To implement new plugins, just extend the `/Plugins/BasePlugin.ts` or implement `Updateable` interface on your own.
Some examples are in `src/Plugins`
