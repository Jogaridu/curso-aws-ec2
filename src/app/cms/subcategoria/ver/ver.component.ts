import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { UtilsService } from 'src/services/utils.service';

@Component({
    selector: 'app-ver',
    templateUrl: './ver.component.html',
    styleUrls: ['./ver.component.scss']
})
export class VerComponent implements OnInit {

    @Output() listar: any = new EventEmitter<any>();

    dropdownList = [];
    dropdownSettings: IDropdownSettings = {
        idField: 'id',
        textField: 'nome',
        selectAllText: 'Todos',
        unSelectAllText: 'Desmarcar todos'
    };

    // Formulário
    public dados: any = {
        status: '',
        tipo: '',
        categorias: []
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

    async ngAfterViewInit() {

        const dados: any = await this.api.get('subcategorias', {
            id: this.utils.getStorage('cms_conteudo_id')
        });

        const categorias: any = (await this.api.get('categorias'));

        this.dropdownList = categorias;

        this.dados['nome'] = dados['subcategorias']['nome'];
        this.dados['status'] = dados['subcategorias']['status'];
        this.dados['categorias'] = dados['categorias'];
        this.imagem = dados['subcategorias']['imagem'] == '' ? '/assets/images/sem_imagem.png' : dados['subcategorias']['imagem'];

    }

    async atualizar() {

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

        if (this.dados['categorias'].length == 0) {

            this.errorForm['categorias'] = true;
            this.msgErrorForm['categorias'] = "*Campo obrigatório";
            this.utils.exibirToast('erro', 'Preencha todos os campos obrigatórios.');
            return false;

        }

        if (dadosVazios.length != 0) {

            this.utils.exibirToast('erro', 'Preencha todos os campos obrigatórios.');
            return false;

        }

        const formData = new FormData();

        if (this.imagem == '/assets/images/sem_imagem.png' && this.dados['tipo'] != 'Pessoas') {

            this.utils.exibirToast('erro', 'Imagem é obrigatório.');
            return false;

        }

        if (this.imagemFiles != '') {

            formData.append('imagem', this.imagemFiles);

        }

        formData.append('nome', this.dados['nome']);
        formData.append('categorias', JSON.stringify(this.dados['categorias']));
        formData.append('status', this.dados['status']);

        this.carregando = true;

        const retorno: any = await this.api.put('subcategorias', formData)

        this.carregando = false;

        if (!retorno['erro']) {

            this.utils.exibirToast('sucesso', 'Sub-categoria atualizada com sucesso!', 'Sucesso');

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
