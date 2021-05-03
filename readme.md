# Dev

## Dev tools

```shell
npm run start
```

## deploy debug version

```shell
npm run android
```

# Build

## Clean

```shell
cd android && ./gradlew cleancd
```

## APK

```shell
cd android && ./gradlew assembleRelease
```

output will be in `android/app/build/outputs/apk`

## deploy on device

device must be connected

```shell
npx react-native run-android --variant=release
```

# todo:

rajouter de la carto
rajouter un about
