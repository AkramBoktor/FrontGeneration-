
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { PostOfficesComponent } from './post-offices.component';


const routes: Routes = [
  {
    path: '',
    component: PostOfficesComponent,
  },
  
{
    path: 'post-offices-screens', loadChildren: './components/post-offices-screens/post-offices-screens.module#PostOfficesScreensModule',
    data: {
      moduleName: 'PostOffices'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class PostOfficesRoutingModule {
}

