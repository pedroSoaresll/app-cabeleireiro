# How to start App

### To start your android emulator run:

```sh
$ emulator -avd Nexus_5X_API_29_x86
```

### To fix network proxy problem between emulator and your machine.

```sh
$ adb reverse tcp:3001 tcp:3001
```

```sh
$ adb reverse tcp:9090 tcp:9090
```

> Note: please, run the two commands above after you start emulator

### To build the App run:

```sh
$ yarn android
```

### Before open App make sure if metro server is running, if not, run:

```sh
$ yarn start
```

# Server dependency

The App have a dependency of server, to know how install and run the server and all infra [clique here](https://github.com/pedroSoaresll/server-cabeleireiro)
