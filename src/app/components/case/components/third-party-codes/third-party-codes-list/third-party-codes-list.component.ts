
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { ThirdPartyCodes } from 'app/shared/models/third-party-codes';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ThirdPartyCodesService } from '../shared/third-party-codes.service';
import { ThirdPartyCodesEditComponent } from '../third-party-codes-edit/third-party-codes-edit.component';
import { ThirdPartyCodesNewComponent } from '../third-party-codes-new/third-party-codes-new.component';
import { ThirdPartyCodesViewComponent } from '../third-party-codes-view/third-party-codes-view.component';

@Component({
  selector: 'app-third-party-codes-list',
  templateUrl: './third-party-codes-list.component.html',
  styleUrls: ['./third-party-codes-list.component.scss'],
  providers: []
})

export class ThirdPartyCodesListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedThirdPartyCodes: ThirdPartyCodes;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'الكود', field: 'code' }),
	new GridColumnOptions({ headerName: 'الاسم', field: 'name' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ThirdPartyCodesViewComponent,
    editDialogClassType: ThirdPartyCodesEditComponent,
    newDialogClassType: ThirdPartyCodesNewComponent,
  });
    constructor(
        injector: Injector,
        public thirdPartyCodesService: ThirdPartyCodesService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedThirdPartyCodes = new ThirdPartyCodes();

    

    this.searchForm = this.formBuilder.group({
     	code : [],
	name : []
    });

     
  }

  getThirdPartyCodesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ThirdPartyCodes[]> => {
    return this.thirdPartyCodesService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.thirdPartyCodesService.delete(param.data.id)
      .pipe(take(1))
      .subscribe(() => this.grid.refreshData());
  }

  onBeginSearch(): void {
    this.grid.beginSearch(this.searchForm.value);
  }

  onCreate(): void {
    this.router.navigate(['new'], {relativeTo: this.activatedRoute});
  }

  getControls(name: string) {
    return this.searchForm.get(name);
  }

  initializeLookupServices() {
    
  }
}

