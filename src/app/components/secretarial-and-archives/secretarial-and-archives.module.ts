
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecretarialAndArchivesRoutingModule } from './secretarial-and-archives.routing.module';
import { SecretarialAndArchivesComponent } from './secretarial-and-archives.component';

@NgModule({
  declarations: [SecretarialAndArchivesComponent],
  imports: [
    SecretarialAndArchivesRoutingModule,
    CommonModule,
  ]
})
export class SecretarialAndArchivesModule { }

