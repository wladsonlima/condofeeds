import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DetailFeeds } from '../../interface/detailsFeeds';
/*
  Generated class for the DetailFeeds page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detail-feeds',
  templateUrl: 'detail-feeds.html'
})
export class DetailFeedsPage {

  public detail: DetailFeeds = {feed:'',descricao:"",caminho:"",arquivo:""};


  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailFeedsPage');

    this.detail = this.navParams.get('details');

  }

}
