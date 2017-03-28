import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';
import { WebService } from '../../provider/webService';
import { Dialogs } from 'ionic-native';

import { GetOrders } from '../../interface/orders/getOrders';
import { ListOrders } from '../../interface/orders/listOrders';

@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html'
})
export class OrdersPage {

  public getOrders: GetOrders = {
    token: '',
    condominio: '',
    id_apto: ''
  };

  public listOrders: ListOrders[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public webService: WebService) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');

    NativeStorage.getItem('User')
      .then(data => {
        console.log(data);

        this.getOrders.token = data.token;
        this.getOrders.condominio = data.condominio;
        this.getOrders.id_apto = data.id_apto;

        this.webService.getOrders(this.getOrders).then(response => {

          if (response.status) {
            this.listOrders = response.obj;
          } else {
            Dialogs.alert(response.msg, 'Atenção', 'Ok');
          }
        }, error => {
          Dialogs.alert("Não possível buscar Encomendas ", 'Atenção', 'Ok');
        });

      },
      error => {

        this.getOrders.token = "32838a4e42d0c8729910f3a67b590dd7e0bf99d485cdadc0c3e8cce0b7e4ebf170928e29a4a4b88c78d9399c453f1769759a9c65a3ca5dfb18a76a97c41919aa67697363686566666572616c76657340686f746d61696c2e636f6d";
        this.getOrders.condominio = "05488161000190";
        this.getOrders.id_apto = "396";

        this.webService.getOrders(this.getOrders).then(response => {
          console.log(response)
          this.listOrders = response.obj;
        });

        //this.webservice.getNota().then(data => this.listNotes = data)


      }

      )

  }

}
