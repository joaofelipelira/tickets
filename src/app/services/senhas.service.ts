import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SenhasService {

  public senhasGeral: number = 0;
  public senhasPrior: number = 0;
  public senhasExame: number = 0;
  public senhasTotal: number = 0;
  public senhasArray: any = { SG: [], SP: [], SE: [] };
  public inputNovaSenha: string = '';

  somaGeral() { this.senhasGeral++; this.senhasTotal++; }
  somaPrior() { this.senhasPrior++; this.senhasTotal++; }
  somaExame() { this.senhasExame++; this.senhasTotal++; }

  novaSenha(tipoSenha: string = '') {
    const timestamp = new Date().toLocaleString();
    let senhasArray = JSON.parse(localStorage.getItem('senhasArray') || '{"SG": [], "SP": [], "SE": []}');


    const ano = new Date().getFullYear().toString().substring(2, 4); 
    const mes = (new Date().getMonth() + 1).toString().padStart(2, '0'); 
    const dia = new Date().getDate().toString().padStart(2, '0'); 

    const dataFormatada = `${ano}${mes}${dia}`; 

    if (tipoSenha === 'SG') {
      this.somaGeral();
      this.inputNovaSenha =
        `${dataFormatada}-SG${(senhasArray['SG'].length + 1).toString().padStart(2, '0')}`;
      senhasArray['SG'].push({ senha: this.inputNovaSenha, timestamp: timestamp });
    } else if (tipoSenha === 'SP') {
      this.somaPrior();
      this.inputNovaSenha =
        `${dataFormatada}-SP${(senhasArray['SP'].length + 1).toString().padStart(2, '0')}`;
      senhasArray['SP'].push({ senha: this.inputNovaSenha, timestamp: timestamp });
    } else if (tipoSenha === 'SE') {
      this.somaExame();
      this.inputNovaSenha =
        `${dataFormatada}-SE${(senhasArray['SE'].length + 1).toString().padStart(2, '0')}`;
      senhasArray['SE'].push({ senha: this.inputNovaSenha, timestamp: timestamp });
    }

    localStorage.setItem('senhasArray', JSON.stringify(senhasArray));
    console.log(senhasArray);
  }

  constructor() { }
}
