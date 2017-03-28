import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { OneSignal } from 'ionic-native';
import { NativeStorage } from 'ionic-native';


import { LoginPage } from '../pages/login/login';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginPage;

  constructor(platform: Platform) {

    OneSignal.startInit('57322a76-745c-4100-8bf3-4d1eef110a94', '837667551466');

    OneSignal.inFocusDisplaying(OneSignal.OSInFocusDisplayOption.InAppAlert);

    OneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
    });

    OneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
    });
    OneSignal.getIds().then(response => {
      console.log(response);

      NativeStorage.setItem('OneSignal', {
        pushToken: response.pushToken,
        userId: response.userId,
      
      })
        .then(
        () => console.log('OneSignal'),
        error => console.error('Error OneSignal item', error)
        );


    },
      error => {
        console.log(error);
      })
    OneSignal.endInit();


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.





      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
