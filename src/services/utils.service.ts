import { ElementRef, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    constructor(
        private toastr: ToastrService,
        private router: Router
    ) { }

    abrirMenuMobile(element: any, main: any) {

        element.style.animation = 'none';
        element.offsetHeight;
        element.style.animation = null;

        if (!element.classList.contains('exibir-menu')) {

            element.classList.remove('esconder-menu');
            element.classList.add('exibir-menu');
            main.classList.add('desfocar');

        } else {

            element.classList.remove('exibir-menu');
            element.classList.add('esconder-menu');
            main.classList.remove('desfocar');

        }

    }

    async validaEmail(email: string): Promise<boolean> {

        const er = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2}/;

        if (er.exec(email)) {

            return true;

        }

        return false;

    }

    async verificaCamposVazios(
        objeto: any,
        campos: any,
        aplicarBorda = false,
        elementRef: any = false
    ): Promise<any> {

        const dados: any = [];
        const dadosVazios: any = [];
        let vazio = false;

        campos.forEach((campo: any) => {

            const nomeCampo = campo.replace('row-', '');

            if (
                !objeto.hasOwnProperty(nomeCampo) ||
                objeto[nomeCampo] == '' ||
                objeto[nomeCampo] == null
            ) {

                vazio = true;
                dadosVazios.push(nomeCampo);
                dados.push({ status: 'vazio', campo });

            } else {

                dados.push({ status: 'preenchidos', campo });

            }
        });

        if (aplicarBorda) {

            let res = false;

            dados.forEach((dado: any) => {

                if (dado.status == 'vazio')
                    res = true;

            });

            return dadosVazios;

        }

        return dados;

    }

    exibirToast(tipo: string, mensagem: string = '', titulo: string = '') {

        switch (tipo) {

            case 'sucesso':

                this.toastr.success(mensagem, titulo);
                break;

            case 'erro':

                this.toastr.error(mensagem, titulo);
                break;

            case 'aviso':

                this.toastr.warning(mensagem, titulo);
                break;

        }

    }

    navegar(url: string) {

        this.router.navigate([url]);

    }

    public limparString(texto: string) {
        return texto.replace(/[^A-Z0-9]+/gi, '');
    }

    public setStorage(key: string, valor: any) {
        localStorage.setItem(`lingemaderie.${key}`, JSON.stringify(valor));
    }

    public getStorage(key: string) {
        const dados: any = localStorage.getItem(`lingemaderie.${key}`);
        return JSON.parse(dados);
    }

    public getId() {
        const id = this.getStorage('cms_conteudo_id');
        return id ? id : false;
    }

    public removeStorage(key: string) {
        localStorage.removeItem(`lingemaderie.${key}`);
    }

    public checkStorage(key: string) {
        return (localStorage.getItem(`lingemaderie.${key}`)) ?? '' == ''
            ? false
            : true;
    }

}
