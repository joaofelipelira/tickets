import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SenhasService {

    public senhasGeral: number = 0;
    public senhasPrior: number = 0;
    public senhasExame: number = 0;
    public senhasTotal: number = 0;
    public senhasArray: any = { SG: [], SP: [], SE: [], ultimasChamadas: [] };
    public inputNovaSenha: string = '';
    public senhasAtendidas: any[] = [];
    public ultimasChamadas: any[] = [];
    private proximaPrioridadeSP = true;
    private ultimaSenhaChamadaTipo: 'SP' | 'SE' | 'SG' | null = null;

    constructor() {
        this.carregarContadores();
        this.carregarSenhas();
        this.ultimasChamadas = this.senhasArray.ultimasChamadas || [];
    }

    private salvarContadores() {
        localStorage.setItem('senhasGeral', this.senhasGeral.toString());
        localStorage.setItem('senhasPrior', this.senhasPrior.toString());
        localStorage.setItem('senhasExame', this.senhasExame.toString());
        localStorage.setItem('senhasTotal', this.senhasTotal.toString());
    }

    private carregarContadores() {
        this.senhasGeral = parseInt(localStorage.getItem('senhasGeral') || '0', 10);
        this.senhasPrior = parseInt(localStorage.getItem('senhasPrior') || '0', 10);
        this.senhasExame = parseInt(localStorage.getItem('senhasExame') || '0', 10);
        this.senhasTotal = parseInt(localStorage.getItem('senhasTotal') || '0', 10);
    }

    somaGeral() {
        this.senhasGeral++;
        this.senhasTotal++;
        this.salvarContadores();
    }

    somaPrior() {
        this.senhasPrior++;
        this.senhasTotal++;
        this.salvarContadores();
    }

    somaExame() {
        this.senhasExame++;
        this.senhasTotal++;
        this.salvarContadores();
    }

    novaSenha(tipoSenha: string = '') {
        const agora = new Date();
        const timestamp = agora.toLocaleString();
        const ano = agora.getFullYear().toString().substring(2, 4);
        const mes = (agora.getMonth() + 1).toString().padStart(2, '0');
        const dia = agora.getDate().toString().padStart(2, '0');
        const dataFormatada = `${ano}${mes}${dia}`;

        let senhasArray = JSON.parse(localStorage.getItem('senhasArray') || '{"SG": [], "SP": [], "SE": [], "ultimasChamadas": []}');
        let sequencia = 1;

        if (tipoSenha === 'SG') {
            this.somaGeral();
            const senhasHoje = senhasArray['SG'].filter((senha: any) => senha.senha.startsWith(`${dataFormatada}-SG`));
            sequencia = senhasHoje.length + 1;
            this.inputNovaSenha = `${dataFormatada}-SG${sequencia.toString().padStart(2, '0')}`;
            senhasArray['SG'].push({ senha: this.inputNovaSenha, timestamp: timestamp, status: 'pendente' });
        } else if (tipoSenha === 'SP') {
            this.somaPrior();
            const senhasHoje = senhasArray['SP'].filter((senha: any) => senha.senha.startsWith(`${dataFormatada}-SP`));
            sequencia = senhasHoje.length + 1;
            this.inputNovaSenha = `${dataFormatada}-SP${sequencia.toString().padStart(2, '0')}`;
            senhasArray['SP'].push({ senha: this.inputNovaSenha, timestamp: timestamp, status: 'pendente' });
        } else if (tipoSenha === 'SE') {
            this.somaExame();
            const senhasHoje = senhasArray['SE'].filter((senha: any) => senha.senha.startsWith(`${dataFormatada}-SE`));
            sequencia = senhasHoje.length + 1;
            this.inputNovaSenha = `${dataFormatada}-SE${sequencia.toString().padStart(2, '0')}`;
            senhasArray['SE'].push({ senha: this.inputNovaSenha, timestamp: timestamp, status: 'pendente' });
        }

        senhasArray.ultimasChamadas = this.ultimasChamadas;
        localStorage.setItem('senhasArray', JSON.stringify(senhasArray));
        this.senhasArray = senhasArray;
    }

    carregarSenhas() {
        const armazenado = JSON.parse(localStorage.getItem('senhasArray') || '{"SG": [], "SP": [], "SE": [], "ultimasChamadas": []}');
        this.senhasArray = armazenado;
        this.ultimasChamadas = this.senhasArray.ultimasChamadas || [];
    }

    peekProximaSenha(): any | undefined {
        const spPendentes = this.senhasArray.SP.filter((senha: any) => senha.status === 'pendente');
        const sePendentes = this.senhasArray.SE.filter((senha: any) => senha.status === 'pendente');
        const sgPendentes = this.senhasArray.SG.filter((senha: any) => senha.status === 'pendente');
        let proxima: any | undefined;

        if (this.proximaPrioridadeSP) {
            if (spPendentes.length > 0) {
                proxima = spPendentes[0];
                this.ultimaSenhaChamadaTipo = 'SP';
            } else if (sePendentes.length > 0) {
                proxima = sePendentes[0];
                this.ultimaSenhaChamadaTipo = 'SE';
                this.proximaPrioridadeSP = false; 
            } else if (sgPendentes.length > 0) {
                proxima = sgPendentes[0];
                this.ultimaSenhaChamadaTipo = 'SG';
                this.proximaPrioridadeSP = false; 
            } else {
                this.proximaPrioridadeSP = true; 
            }
        } else {
            if (sePendentes.length > 0) {
                proxima = sePendentes[0];
                this.ultimaSenhaChamadaTipo = 'SE';
                this.proximaPrioridadeSP = true; 
            } else if (sgPendentes.length > 0) {
                proxima = sgPendentes[0];
                this.ultimaSenhaChamadaTipo = 'SG';
                this.proximaPrioridadeSP = true; 
            } else if (spPendentes.length > 0) {
                proxima = spPendentes[0];
                this.ultimaSenhaChamadaTipo = 'SP';
                this.proximaPrioridadeSP = true; 
            } else {
                this.proximaPrioridadeSP = true; 
            }
        }

        return proxima;
    }

    chamarProximaSenha(): any | undefined {
        const proxima = this.peekProximaSenha();
        if (proxima) {
            this.removerSenhaDaFila(proxima.senha, this.getTipoSenha(proxima.senha));
            this.atualizarUltimasChamadas(proxima);
            this.proximaPrioridadeSP = (this.ultimaSenhaChamadaTipo === 'SP') ? false : true; 
            this.salvarUltimasChamadas();
        }
        return proxima;
    }

    private getTipoSenha(senha: string): 'SG' | 'SP' | 'SE' | undefined {
        if (senha.includes('-SG')) return 'SG';
        if (senha.includes('-SP')) return 'SP';
        if (senha.includes('-SE')) return 'SE';
        return undefined;
    }

    public removerSenhaDaFila(senha: string, tipo: 'SG' | 'SP' | 'SE' | undefined) {
        if (tipo) {
            const index = this.senhasArray[tipo].findIndex((s: any) => s.senha === senha);
            if (index > -1) {
                this.senhasArray[tipo].splice(index, 1);
                this.salvarSenhasArray();
            }
        }
    }

    iniciarAtendimento(senha: string) {
        const tipos = ['SG', 'SP', 'SE'];
        for (let tipo of tipos) {
            const senhaIndex = this.senhasArray[tipo].findIndex((s: any) => s.senha === senha);
            if (senhaIndex !== -1) {
                this.senhasArray[tipo][senhaIndex].status = 'em atendimento';
                this.salvarSenhasArray();
                this.senhasArray = { ...this.senhasArray, [tipo]: [...this.senhasArray[tipo]] };
                break;
            }
        }
    }

    finalizarAtendimento(senha: string) {
        const tipoSenhaAtendida = this.getTipoSenha(senha);
        const tipos = ['SG', 'SP', 'SE'];
        for (let tipo of tipos) {
            const senhaIndex = this.senhasArray[tipo].findIndex((s: any) => s.senha === senha);
            if (senhaIndex !== -1) {
                this.senhasArray[tipo][senhaIndex].status = 'atendida';
                let tempoAtendimento = 5; 
                if (tipoSenhaAtendida) {
                    tempoAtendimento = this.calcularTempoAtendimento(tipoSenhaAtendida);
                }
                this.senhasArray[tipo][senhaIndex].tempoAtendimento = tempoAtendimento;
                this.senhasArray[tipo][senhaIndex].horaAtendimento = new Date().toLocaleString();
                this.atualizarUltimasChamadas(this.senhasArray[tipo][senhaIndex]);
                this.salvarUltimasChamadas();
                this.senhasAtendidas.push(this.senhasArray[tipo][senhaIndex]);
                this.salvarSenhasArray();
                this.senhasArray = { ...this.senhasArray, [tipo]: [...this.senhasArray[tipo]] };
                break;
            }
        }
        if (tipoSenhaAtendida) {
            this.proximaPrioridadeSP = (tipoSenhaAtendida !== 'SP'); 
        }
    }

    private calcularTempoAtendimento(tipo: 'SP' | 'SE' | 'SG'): number {
        if (tipo === 'SP') {
            return 15 + (Math.floor(Math.random() * 11) - 5); 
        } else if (tipo === 'SE') {
            return Math.random() < 0.95 ? Math.floor(Math.random() * 1) + 1 : Math.floor(Math.random() * 5) + 1; 
        } else if (tipo === 'SG') {
            return 5 + (Math.floor(Math.random() * 7) - 3); 
        }
        return 5; 
    }

    private atualizarUltimasChamadas(senhaChamada: any) {
        this.ultimasChamadas.unshift(senhaChamada);
        if (this.ultimasChamadas.length > 5) {
            this.ultimasChamadas.pop();
        }
    }

    private salvarUltimasChamadas() {
        this.senhasArray.ultimasChamadas = this.ultimasChamadas;
        this.salvarSenhasArray();
    }

    private salvarSenhasArray() {
        localStorage.setItem('senhasArray', JSON.stringify(this.senhasArray));
    }

    resetarSenhas() {
        this.senhasGeral = 0;
        this.senhasPrior = 0;
        this.senhasExame = 0;
        this.senhasTotal = 0;
        this.senhasArray = { SG: [], SP: [], SE: [], ultimasChamadas: [] };
        this.ultimasChamadas = [];
        this.proximaPrioridadeSP = true;
        this.ultimaSenhaChamadaTipo = null;
        localStorage.removeItem('senhasGeral');
        localStorage.removeItem('senhasPrior');
        localStorage.removeItem('senhasExame');
        localStorage.removeItem('senhasTotal');
        localStorage.setItem('senhasArray', JSON.stringify(this.senhasArray));
    }
}