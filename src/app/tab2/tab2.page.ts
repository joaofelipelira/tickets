import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SenhasService } from '../services/senhas.service';

@Component({
    selector: 'app-tab2',
    templateUrl: './tab2.page.html',
    styleUrls: ['./tab2.page.scss'],
    standalone: false,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tab2Page implements OnInit {
    public proximaSenhaChamada: any | undefined;
    public ultimasChamadasExibicao: any[] = [];
    public senhasPendentes: any = { SG: [], SP: [], SE: [] };
    public senhaEmAtendimento: string | null = null;

    constructor(private senhasService: SenhasService, private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.carregarSenhas();
        this.atualizarProximaSenhaExibicao();
        this.atualizarUltimasChamadasExibicao();
    }

    carregarSenhas() {
        this.senhasPendentes = this.senhasService.senhasArray;
    }

    atualizarProximaSenhaExibicao() {
        this.proximaSenhaChamada = this.senhasService.peekProximaSenha();
        this.cdr.detectChanges();
    }

    atualizarUltimasChamadasExibicao() {
        this.ultimasChamadasExibicao = [...this.senhasService.ultimasChamadas];
        this.cdr.detectChanges();
    }

    iniciarAtendimento(senha: string) {
        this.senhasService.iniciarAtendimento(senha);
        this.senhaEmAtendimento = senha;
        this.carregarSenhas();
        this.atualizarProximaSenhaExibicao();
    }

    finalizarAtendimento(senha: string) {
        this.senhasService.finalizarAtendimento(senha);
        this.senhaEmAtendimento = null;
        this.atualizarUltimasChamadasExibicao();
        this.carregarSenhas();
        this.atualizarProximaSenhaExibicao();
    }

    descartarSenha(senha: string, tipo: string) {
        this.senhasService.removerSenhaDaFila(senha, tipo as 'SG' | 'SP' | 'SE');
        this.carregarSenhas(); 
        this.atualizarProximaSenhaExibicao(); 
    }
}