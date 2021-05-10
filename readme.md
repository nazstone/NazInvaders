# Dev

## DB

A sqlite db must be fill by information available from InvaderSpotterExtract tools (target => android/app/src/main/assets/www)

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
cd android && ./gradlew clean && cd ..
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
