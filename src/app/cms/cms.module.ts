import { SchematicModule } from './schematic/schematic.module';
import { CorModule } from './cor/cor.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestritoComponent } from './restrito/restrito.component';
import { FormsModule } from '@angular/forms';
import { CategoriaModule } from './categoria/categoria.module';
import { SubcategoriaModule } from './subcategoria/subcategoria.module';
@NgModule({
    declarations: [
        RestritoComponent,
    ],
    exports: [
        RestritoComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SchematicModule,
        CategoriaModule,
        CorModule,
        SubcategoriaModule,
    ],
})

export class CmsModule { }
