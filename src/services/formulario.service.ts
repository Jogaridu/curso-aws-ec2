import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class FormularioService {

    constructor() { }

    configurarCamposForm(dadosInput: Array<Object>) {

        let camposForm = [];

        dadosInput.forEach(input => {

            let config = {};

            camposForm.push();

        });
        // {
        //     nome: ['', Validators.required],
        //         dataNascimento: [''],
        //             genero: [''],
        //                 cpf: ['', Validators.required],
        //                     celular: ['', Validators.required],
        //                         email: ['', [Validators.required, Validators.email]],
        // }
    }

}
