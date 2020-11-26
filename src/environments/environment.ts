// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:9090/',
  firebase : {
    apiKey: "AIzaSyDX0gJGgP1MRBST3xnM_4oEaNzGMJoguXM",
    authDomain: "cart-dchocuec.firebaseapp.com",
    databaseURL: "https://cart-dchocuec.firebaseio.com",
    projectId: "cart-dchocuec",
    storageBucket: "cart-dchocuec.appspot.com",
    messagingSenderId: "281601937702",
    appId: "1:281601937702:web:ffc752429a360608a271e7"
  }

  //cart-dchouec.herokuapp.com
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
