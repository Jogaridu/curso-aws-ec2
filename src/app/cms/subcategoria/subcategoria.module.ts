import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarComponent } from './listar/listar.component';
import { SubcategoriaComponent } from './subcategoria.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { VerComponent } from './ver/ver.component';
import { FormsModule } from '@angular/forms';



@NgModule({
    declarations: [SubcategoriaComponent, ListarComponent, CadastrarComponent, VerComponent],
    imports: [
        CommonModule,
        FormsModule,
        NgMultiSelectDropDownModule.forRoot(),
    ]
})
export class SubcategoriaModule { }
