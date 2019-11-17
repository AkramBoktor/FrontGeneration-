import { Component, OnInit, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';

@Component({
  selector: 'app-lands-branches',
  templateUrl: './lands-branches.component.html',
  styleUrls: ['./lands-branches.component.scss']
})
export class LandsBranchesComponent extends AppBaseComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
   }
  ngOnInit() {
  }

}
