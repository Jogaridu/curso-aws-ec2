import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from './cms/categoria/categoria.component';
import { CorComponent } from './cms/cor/cor.component';
import { RestritoComponent } from './cms/restrito/restrito.component';
import { SchematicComponent } from './cms/schematic/schematic.component';
import { SubcategoriaComponent } from './cms/subcategoria/subcategoria.component';

const routes: Routes = [
    {
        path: 'restrito',
        component: RestritoComponent
    },
    {
        path: 'categoria',
        component: SchematicComponent
    },
    {
        path: 'cor',
        component: CorComponent
    },
    {
        path: 'subcategoria',
        component: SubcategoriaComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
