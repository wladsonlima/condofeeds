import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WebService } from '../../provider/webService';
import { NativeStorage } from 'ionic-native';
import { ListFeeds } from '../../interface/listFeeds';
import { TokenCondominio } from '../../interface/tokenCondominio';
import { DetailFeedsPage } from "../detail-feeds/detail-feeds";

import { Dialogs } from 'ionic-native';
/*
  Generated class for the Feeds page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-feeds',
  templateUrl: 'feeds.html'
})



export class FeedsPage {

  public listFeeds: ListFeeds[];

  public token: TokenCondominio = {
    token: "",
    condominio: ""
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public webservice: WebService) { }

  ionViewDidLoad() {

    NativeStorage.getItem('User').then(response => {

      this.token.token = response.token;
      this.token.condominio = response.condominio;

      this.webservice.getFeeds(this.token).then(response => {

        if (response.status) {
          this.listFeeds = response.obj;
        } else {
          Dialogs.alert(response.msg, 'Atenção', 'Ok');
        }

      }, error => {
        Dialogs.alert("Não possível buscar Comunicados.", 'Atenção', 'Ok');
      });

    }, error => {
      Dialogs.alert("Não possível buscar dados do usuário.", 'Atenção', 'Ok');

    });
  }


  openFeeds(details: ListFeeds) {

    this.navCtrl.push(DetailFeedsPage, { details: details });

  }






}
