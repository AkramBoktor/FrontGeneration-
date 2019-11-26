
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AssayUnctionsOfItemsAndElementsOfTheProjectComponent } from './assay-unctions-of-items-and-elements-of-the-project.component';


const routes: Routes = [
  {
    path: '',
    component: AssayUnctionsOfItemsAndElementsOfTheProjectComponent,
  },
  
{
    path: 'data-element-of-basic-item', loadChildren: './components/data-element-of-basic-item/data-element-of-basic-item.module#DataElementOfBasicItemModule',
    data: {
      moduleName: 'DataElementOfBasicItem'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AssayUnctionsOfItemsAndElementsOfTheProjectRoutingModule {
}

