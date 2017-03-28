import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { OrdersPage } from '../pages/orders/orders';
import { FeedsPage } from '../pages/feeds/feeds';
import { DetailFeedsPage } from '../pages/detail-feeds/detail-feeds';
import { WebService } from '../provider/webService';
import { NativeStorage } from 'ionic-native';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    OrdersPage,
    FeedsPage,
    DetailFeedsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    OrdersPage,
    FeedsPage,
    DetailFeedsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},WebService, NativeStorage]
})
export class AppModule {}
