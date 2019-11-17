
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { CodesOfReasonForTermination } from 'app/shared/models/codes-of-reason-for-termination';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CodesOfReasonForTerminationEditComponent } from '../codes-of-reason-for-termination-edit/codes-of-reason-for-termination-edit.component';
import { CodesOfReasonForTerminationNewComponent } from '../codes-of-reason-for-termination-new/codes-of-reason-for-termination-new.component';
import { CodesOfReasonForTerminationViewComponent } from '../codes-of-reason-for-termination-view/codes-of-reason-for-termination-view.component';
import { CodesOfReasonForTerminationService } from '../shared/codes-of-reason-for-termination.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-codes-of-reason-for-termination-list',
  templateUrl: './codes-of-reason-for-termination-list.component.html',
  styleUrls: ['./codes-of-reason-for-termination-list.component.scss'],
  providers: []
})

export class CodesOfReasonForTerminationListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedCodesOfReasonForTermination: CodesOfReasonForTermination;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'الكود', field: 'code' }),
	new GridColumnOptions({ headerName: 'الاسم', field: 'name' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: CodesOfReasonForTerminationViewComponent,
    editDialogClassType: CodesOfReasonForTerminationEditComponent,
    newDialogClassType: CodesOfReasonForTerminationNewComponent,
  });
    constructor(
        injector: Injector,
        public codesOfReasonForTerminationService: CodesOfReasonForTerminationService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedCodesOfReasonForTermination = new CodesOfReasonForTermination();

    

    this.searchForm = this.formBuilder.group({
     	code : [],
	name : []
    });

     
  }

  getCodesOfReasonForTerminationPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<CodesOfReasonForTermination[]> => {
    return this.codesOfReasonForTerminationService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.codesOfReasonForTerminationService.delete(param.data.id)
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

