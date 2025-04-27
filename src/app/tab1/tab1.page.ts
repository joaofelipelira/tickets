import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  constructor(public senhasService: SenhasService, public toastController: ToastController) {}

  async gerarSenhaGeral() {
    this.senhasService.novaSenha('SG');
    await this.presentToast(`Senha Geral: ${this.senhasService.inputNovaSenha}`);
  }

  async gerarSenhaPrioritaria() {
    this.senhasService.novaSenha('SP');
    await this.presentToast(`Senha Prioritária: ${this.senhasService.inputNovaSenha}`);
  }

  async gerarSenhaExame() {
    this.senhasService.novaSenha('SE');
    await this.presentToast(`Senha Exame: ${this.senhasService.inputNovaSenha}`);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }
}
