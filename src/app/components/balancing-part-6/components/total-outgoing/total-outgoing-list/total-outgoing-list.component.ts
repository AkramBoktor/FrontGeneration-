
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { TotalOutgoing } from 'app/shared/models/total-outgoing';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TotalOutgoingEditComponent } from '../total-outgoing-edit/total-outgoing-edit.component';
import { TotalOutgoingNewComponent } from '../total-outgoing-new/total-outgoing-new.component';
import { TotalOutgoingViewComponent } from '../total-outgoing-view/total-outgoing-view.component';
import { TotalOutgoingService } from '../shared/total-outgoing.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-total-outgoing-list',
  templateUrl: './total-outgoing-list.component.html',
  styleUrls: ['./total-outgoing-list.component.scss'],
  providers: []
})

export class TotalOutgoingListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
	{
	 errorName: 'minLength',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	}
      ];
  

  

  

  
  @Input() selectedTotalOutgoing: TotalOutgoing;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المدرسة', field: 'schoolNumber' }),
	new GridColumnOptions({ headerName: 'اسم المدرسة', field: 'schoolName' }),
	new GridColumnOptions({ headerName: 'المقاول', field: 'contractor' }),
	new GridColumnOptions({ headerName: 'اسم المقاول', field: 'contractorNmae' }),
	new GridColumnOptions({ headerName: 'رقم المناقصة', field: 'bidNumber' }),
	new GridColumnOptions({ headerName: 'جملة المنصرف', field: 'totalOutgoing' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: TotalOutgoingViewComponent,
    editDialogClassType: TotalOutgoingEditComponent,
    newDialogClassType: TotalOutgoingNewComponent,
  });
    constructor(
        injector: Injector,
        public totalOutgoingService: TotalOutgoingService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedTotalOutgoing = new TotalOutgoing();

    

    this.searchForm = this.formBuilder.group({
     	schoolNumber : [],
	contractor : [],
	bidNumber : [],
	totalOutgoing : []
    });

     
  }

  getTotalOutgoingPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<TotalOutgoing[]> => {
    return this.totalOutgoingService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.totalOutgoingService.delete(param.data.id)
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

