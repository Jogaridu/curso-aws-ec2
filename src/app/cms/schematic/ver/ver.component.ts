import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { UtilsService } from 'src/services/utils.service';

import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import config from '../config-modulo.json';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormularioService } from 'src/services/formulario.service';

@Component({
    selector: 'app-ver',
    templateUrl: './ver.component.html',
    styleUrls: ['./ver.component.scss']
})
export class VerComponent implements OnInit {

    public config: any = config;

    @Output() listar: any = new EventEmitter<any>();

    // Caso exista select multiplo - REMOVER CASO NÃO USE
    dropdownList = [];
    dropdownSettings: IDropdownSettings = {
        "idField": "id",
        "textField": "nome",
        "selectAllText": "Todos",
        "unSelectAllText": "Desmarcar todos"
    };

    // Caso exista imagem - REMOVER CASO NÃO USE
    public imagem: any = '/assets/images/sem_imagem.png';
    private imagemFiles: any = '';

    // Formulário
    public dados: any = {
        status: '',
        tipo: '',
        subcategorias: []
    };

    public formulario: FormGroup;
    public controladores: any;

    public errorForm: any = {};
    public msgErrorForm: any = {};
    public carregando: boolean = false;
    private inputsObrigatorias: any;

    constructor(
        private utils: UtilsService,
        private api: ApiService,
        private form: FormularioService,
        private elementRef: ElementRef,
        private formBuilder: FormBuilder,
    ) {
        this.formulario = this.setupForm();
    }

    ngOnInit(): void { }

    async ngAfterViewInit() {

        const id = this.utils.getId();

        let dados: any = await this.api.get(config.nomeTabela, { id });

        config.dadosInputs.forEach(async (input: any) => {

            switch (input.tipo) {

                case 'select-mult':

                    if (input.dadosExternos) {

                        const opcoes: any = (await this.api.get(input.nomeTabela));
                        this.dropdownList = opcoes;
                        this.dados[input.nome] = dados['subcategorias'];


                    } else {

                        this.dropdownList = input.opcoes;

                    }
                    break;

                case 'image':

                    this.imagem = dados[input.nome] == '' ? '/assets/images/sem_imagem.png' : dados['categorias'][input.nome];
                    break;

                default:
                    this.dados[input.nome] = dados['categorias'][input.nome];

                    break;

            }

            if (input.obrigatorio) {

                this.inputsObrigatorias.push(`row-${input.nome}`);

            }

        });

        // this.dados['nome'] = dados['categorias']['nome'];
        // this.dados['tipo'] = dados['categorias']['tipo'];
        // this.dados['status'] = dados['categorias']['status'];
        // this.dados['subcategorias'] = dados['subcategorias'];
        // this.imagem = dados['categorias']['imagem'] == '' ? '/assets/images/sem_imagem.png' : dados['categorias']['imagem'];

    }

    setupForm(): FormGroup {

        const camposForm = this.form.configurarCamposForm(config.dadosInputs);

        const form: FormGroup = this.formBuilder.group({
            nome: ['lala', Validators.required],
            dataNascimento: [''],
            genero: [''],
            cpf: ['', Validators.required],
            celular: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
        });

        this.controladores = {
            nome: 'O nome',
            cpf: 'O CPF',
            celular: 'O celular',
            email: 'O e-mail',
        };

        return form;

    }

    async atualizar() {

        const dadosVazios = await this.utils.verificaCamposVazios(
            this.dados,
            this.inputsObrigatorias,
            true,
            this.elementRef
        );

        this.inputsObrigatorias.forEach((input: any) => {

            let campo = input.replace("row-", "");

            if (dadosVazios.find((el: any) => el == campo)) {

                this.errorForm[campo] = true;
                this.msgErrorForm[campo] = "*Campo obrigatório";

            } else {

                this.errorForm[campo] = false;

            }

        });

        if (this.dados['subcategorias'].length == 0) {

            this.errorForm['subcategorias'] = true;
            this.msgErrorForm['subcategorias'] = "*Campo obrigatório";
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
        formData.append('tipo', this.dados['tipo']);
        formData.append('subcategorias', JSON.stringify(this.dados['subcategorias']));
        formData.append('status', this.dados['status']);

        this.carregando = true;

        const retorno: any = await this.api.put('categorias', formData)

        this.carregando = false;

        if (!retorno['erro']) {

            this.utils.exibirToast('sucesso', 'Categoria atualizada com sucesso!', 'Sucesso');

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
