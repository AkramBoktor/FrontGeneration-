
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicRelationsComponent } from './public-relations.component';


const routes: Routes = [
  {
    path: '',
    component: PublicRelationsComponent,
  },

  
{
    path: 'basic-data-logging', loadChildren: './components/basic-data-logging/basic-data-logging.module#BasicDataLoggingModule',
    data: {
      moduleName: 'BasicDataLogging'
    },
},

{
    path: 'chairman-visa', loadChildren: './components/chairman-visa/chairman-visa.module#ChairmanVisaModule',
    data: {
      moduleName: 'ChairmanVisa'
    },
},

{
    path: 'followup-request-to-new-agency', loadChildren: './components/followup-request-to-new-agency/followup-request-to-new-agency.module#FollowupRequestToNewAgencyModule',
    data: {
      moduleName: 'FollowupRequestToNewAgency'
    },
},

{
    path: 'respond-to-visa', loadChildren: './components/respond-to-visa/respond-to-visa.module#RespondToVisaModule',
    data: {
      moduleName: 'RespondToVisa'
    },
},

{
    path: 'authority-response-to-newspaper', loadChildren: './components/authority-response-to-newspaper/authority-response-to-newspaper.module#AuthorityResponseToNewspaperModule',
    data: {
      moduleName: 'AuthorityResponseToNewspaper'
    },
},


];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class PublicRelationsRoutingModule {
}

