import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchematicComponent } from './schematic.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { ListarComponent } from './listar/listar.component';
import { VerComponent } from './ver/ver.component';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
    declarations: [SchematicComponent, ListarComponent, CadastrarComponent, VerComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgMultiSelectDropDownModule.forRoot(),
    ]
})
export class SchematicModule { }
