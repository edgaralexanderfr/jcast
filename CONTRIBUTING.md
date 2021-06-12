# CONTRIBUTING

## Dependencies

1. node
2. npm

## Extensions

### VSCode

1. EditorConfig: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
2. Debugger for Chrome: https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome
3. VsCode Action Buttons: https://marketplace.visualstudio.com/items?itemName=seunlanlege.action-buttons

## Mounting development environment

### Mounting

Clone the repository:

```bash
git clone https://github.com/edgaralexanderfr/jcast.git
cd jcast/
```

Install node dependencies:

```bash
npm install
```

If you're using VSCode you can use the following command to init and create the local files:

```bash
npm run init-for-vscode
```

otherwise:

```bash
npm run init
```

Start the application:

```bash
npm run app
```

### Developing

Create an _index.html_ file into your _./dev_ folder and include the compiled engine file from _../lib/jcast.js_, keep in mind that in order to debug your changes, you need to include this file and not the minified one.

Once you have included the library into your HTML file, you will be able to access and call all the JCast functions, classes and methods of the engine.
