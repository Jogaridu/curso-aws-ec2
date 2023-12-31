import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { UtilsService } from 'src/services/utils.service';

@Component({
    selector: 'app-cadastrar',
    templateUrl: './cadastrar.component.html',
    styleUrls: ['./cadastrar.component.scss']
})
export class CadastrarComponent implements OnInit {

    @Output() listar: any = new EventEmitter<any>();

    // Formulário
    public dados: any = {
        status: '',
        tipo: ''
    };
    public errorForm: any = {};
    public msgErrorForm: any = {};
    public imagem: any = '/assets/images/sem_imagem.png';
    private imagemFiles: any = '';
    public carregando: boolean = false;

    constructor(
        private utils: UtilsService,
        private elementRef: ElementRef,
        private api: ApiService
    ) { }

    ngOnInit(): void {
    }

    async cadastrar() {

        const inputs = ['row-nome', 'row-status'];

        const dadosVazios = await this.utils.verificaCamposVazios(
            this.dados,
            inputs,
            true,
            this.elementRef
        );

        inputs.forEach((input: any) => {

            let campo = input.replace("row-", "");

            if (dadosVazios.find((el: any) => el == campo)) {

                this.errorForm[campo] = true;
                this.msgErrorForm[campo] = "*Campo obrigatório";

            } else {

                this.errorForm[campo] = false;

            }

        });

        if (dadosVazios.length != 0) {

            this.utils.exibirToast('erro', 'Preencha todos os campos obrigatórios.');
            return false;

        }

        const formData = new FormData();

        if (this.imagem == '/assets/images/sem_imagem.png' && this.dados['tipo'] != 'Pessoas') {

            this.utils.exibirToast('erro', 'Imagem é obrigatório.');
            return false;

        }

        formData.append('imagem', this.imagemFiles);
        formData.append('nome', this.dados['nome']);
        formData.append('status', this.dados['status']);

        this.carregando = true;

        const retorno: any = await this.api.post('subcategorias', formData)

        this.carregando = false;

        if (!retorno['erro']) {

            this.utils.exibirToast('sucesso', 'Sub-categoria cadastrada com sucesso!', 'Sucesso');

        } else {

            this.utils.exibirToast('erro', retorno['erro'], 'Oops...');
            return;

        }

        this.listar.emit();
        return true;

    }

    carregarImagem(evento: any) {

        const file: File = evento.files[0];
        const reader = new FileReader();

        this.imagemFiles = file;

        reader.onload = () => {
            this.imagem = reader.result;
        }

        reader.readAsDataURL(file)

    }

}
