import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';

import { WebService } from '../../provider/webService';
import { TokenCondominio } from '../../interface/tokenCondominio';


import {FeedsPage} from "../feeds/feeds";

import { UserData } from '../../interface/user/userData';
import {LoginPage} from "../login/login";
import {OrdersPage} from "../orders/orders";
import { App } from 'ionic-angular';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  

  public tokenCondominio: TokenCondominio = {
    token: '',
    condominio: ''
  };

  public userData: UserData = {
    nome: '',
    bloco: '',
    num_apto: '',
    avatar: 'https://www.condofeeds.com.br/condofeeds/assets/images/user_padrao.jpg'
  };


  constructor(public navCtrl: NavController, public webservice: WebService, public app : App) { }

  ionViewDidEnter() {

    NativeStorage.getItem('User')
      .then(
      data => {
        this.userData.nome = data.nome;
        this.userData.bloco = data.bloco;
        this.userData.num_apto = data.num_apto;
      },
      error => console.log(error)
      );
  }//end ionViewDidEnter

exit() {
    if(NativeStorage.remove('User')){
      this.app.getRootNav().setRoot(LoginPage);

    }else {
      console.log("Error")
    }
  }

  order(){
     this.navCtrl.push(OrdersPage);
  }

  ListFeeds(){

        this.navCtrl.push(FeedsPage);
    }
  
}


