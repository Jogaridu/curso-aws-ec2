import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { UtilsService } from 'src/services/utils.service';
import { ApiService } from 'src/services/api.service';

@Component({
    selector: 'app-listar',
    templateUrl: './listar.component.html',
    styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

    @Output() ver: any = new EventEmitter<any>();
    public dadosCompletos: any;
    public dados: any;
    public semDados: boolean = false;
    public semFiltros: boolean = true;

    public filtros: any = {
        tipo: '',
        '=status': ''
    };

    constructor(
        private utils: UtilsService,
        private api: ApiService
    ) { }

    ngOnInit(): void { }

    async ngAfterViewInit() {
        const dados: any = await this.api.get('cores');
        this.dadosCompletos = dados;
        this.dados = dados;
        this.semDados = dados.length == 0;
    }

    verConteudo(id: string) {
        this.utils.setStorage('cms_conteudo_id', id);
        this.ver.emit();
    }

    filtrar() {

        this.dados = this.dadosCompletos.filter((dado: any) => {

            let [dadoValido, quantidadeParaValidar] = [0, 0];

            for (const key in this.filtros) {

                if (Object.prototype.hasOwnProperty.call(this.filtros, key) && this.filtros[key] != '') {
                    quantidadeParaValidar++;
                }

            }

            this.semFiltros = quantidadeParaValidar == 0;

            for (let key in this.filtros) {

                if (Object.prototype.hasOwnProperty.call(this.filtros, key) && this.filtros[key] != '') {

                    if (key.includes('=')) {

                        if (dado[key.replace('=', '')].toLowerCase() == this.filtros[key].toLowerCase()) {

                            dadoValido++

                        }

                    } else if (dado[key].toLowerCase().includes(this.filtros[key].toLowerCase())) {

                        dadoValido++;

                    }

                }

            }

            if (dadoValido == quantidadeParaValidar) {
                return dado;
            }

        });

        this.semDados = this.dados.length == 0;

    }

    limparFiltros() {

        this.filtros = {
            tipo: '',
            '=status': ''
        };

        this.semDados = false;
        this.semFiltros = true;
        this.dados = this.dadosCompletos;

    }
}
