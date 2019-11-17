
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostOfficesRoutingModule } from './post-offices.routing.module';
import { PostOfficesComponent } from './post-offices.component';

@NgModule({
  declarations: [PostOfficesComponent],
  imports: [
    PostOfficesRoutingModule,
    CommonModule,
  ]
})
export class PostOfficesModule { }

