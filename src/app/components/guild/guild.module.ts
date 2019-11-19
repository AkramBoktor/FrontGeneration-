
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuildRoutingModule } from './guild.routing.module';
import { GuildComponent } from './guild.component';

@NgModule({
  declarations: [GuildComponent],
  imports: [
    GuildRoutingModule,
    CommonModule,
  ]
})
export class GuildModule { }

