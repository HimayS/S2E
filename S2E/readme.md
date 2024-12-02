Ionic CLI:
- ionic build                    -> builds web assests in dist
- ionic capacitor add android    -> adds packages
- ionic capacitor copy android   -> builds dist then copy it to android
- ionic capacitor open android   -> opens Android Studio to build apk for Android

Or:
- ionic capacitor build android  -> Copy dist to android and opens Android Studio
- ionic capacitor run android    -> Runs the Android Project, use option --livereload --external for Emulator

Update:
- ionic capacitor sync android   -> builds dists and copies it to android
- ionic capacitor update android -> just updates android from dist 


LiveReload:
- ionic cap run android -l --external (allows to access app server in network)


How to use Cordova plugin in ionic app with capacitor:
- npm install cordova-plugin-name
- npx cap ls  -->  to check installed plugins
- npx cap sync

How to use cordova plugins method in capacitor with javascript window object:
- window.TARGET.Method_name  -> target from plugins.xml: insode js-module tag