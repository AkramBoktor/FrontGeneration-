
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { InternationalCooperationComponent } from './international-cooperation.component';


const routes: Routes = [
  {
    path: '',
    component: InternationalCooperationComponent,
  },
  
  
{
    path: 'grant-information', loadChildren: './components/grant-information/grant-information.module#GrantInformationModule',
    data: {
      moduleName: 'GrantInformation'
    },
},

{
    path: 'grant-codes', loadChildren: './components/grant-codes/grant-codes.module#GrantCodesModule',
    data: {
      moduleName: 'GrantCodes'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class InternationalCooperationRoutingModule {
}

