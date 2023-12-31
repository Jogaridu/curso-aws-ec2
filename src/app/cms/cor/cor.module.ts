import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarComponent } from './listar/listar.component';
import { CorComponent } from './cor.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { VerComponent } from './ver/ver.component';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';



@NgModule({
    declarations: [CorComponent, ListarComponent, CadastrarComponent, VerComponent],
    imports: [
        CommonModule,
        FormsModule,
        ColorPickerModule
    ]
})
export class CorModule { }
