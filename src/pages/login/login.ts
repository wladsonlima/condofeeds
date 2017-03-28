import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Login } from '../../interface/login';
import { TabsPage } from '../tabs/tabs';

import { WebService } from '../../provider/webService';
import { Dialogs } from 'ionic-native';
import { Device } from 'ionic-native';
import { NativeStorage } from 'ionic-native';
import { LoadingController } from 'ionic-angular';



@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

    public login: Login = {
        login: '',
        password: '',
        uuid: '',
        serial: '',
        pushToken: '',
        userId: ''
    };

    constructor(public navCtrl: NavController, public navParams: NavParams, public webservice: WebService, public loadingCtrl: LoadingController) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    ionViewDidEnter() {


        NativeStorage.getItem('OneSignal').then(data => {
            this.login.pushToken = data.pushToken;
            this.login.userId = data.userId;
        });

        this.login.uuid = Device.uuid;
        this.login.serial = Device.serial;

        NativeStorage.getItem('User')
            .then(
            data => {
                let loader = this.loadingCtrl.create({
                    content: "Aguarde...",
                });
                this.navCtrl.push(TabsPage);
                loader.dismiss();
            },
            error => {
                Dialogs.alert("Sessão Expirada, Favor Realize seu Login ", 'Atenção', 'Ok');
            }
            );
    }


    public doLogin() {

        let loader = this.loadingCtrl.create({
            content: "Aguarde...",
        });

        loader.present();

        this.webservice.getLogin(this.login).then(response => {

            if (response.status) {

                if (Device.uuid == null) {
                    console.log("Device Web");
                } else {
                    console.log(response);

                    NativeStorage.setItem('User', {
                        uuid: Device.uuid,
                        serial: Device.serial,
                        cpf_cnpj: response.obj.cpf_cnpj,
                        nome: response.obj.nome,
                        login: response.obj.login,
                        tipo: response.obj.tipo_usuario,
                        token: response.obj.token,
                        condominio: response.obj.condominio,
                        nome_condominio: response.obj.nome_condominio,
                        logo_condominio: response.obj.logo_condominio,
                        bloco: response.obj.bloco,
                        id_apto: response.obj.id_apto,
                        num_apto: response.obj.num_apto

                    })
                        .then(
                        () => console.log('Stored User!'),
                        error => console.error('Error storing item', error)
                        );
                }

                this.navCtrl.push(TabsPage);
                loader.dismiss();

            } else {
                loader.dismiss();
                console.log(response.msg);
                Dialogs.alert(response.msg, 'Atenção', 'ok');

            }
        });
        //        this.login = { login: '', password: '' };
    }

}
