
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ApprovalType } from 'app/shared/models/approval-type';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ApprovalTypeEditComponent } from '../approval-type-edit/approval-type-edit.component';
import { ApprovalTypeNewComponent } from '../approval-type-new/approval-type-new.component';
import { ApprovalTypeViewComponent } from '../approval-type-view/approval-type-view.component';
import { ApprovalTypeService } from '../shared/approval-type.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-approval-type-list',
  templateUrl: './approval-type-list.component.html',
  styleUrls: ['./approval-type-list.component.scss'],
  providers: []
})

export class ApprovalTypeListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedApprovalType: ApprovalType;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموافقه', field: 'approvalCode' }),
	new GridColumnOptions({ headerName: 'اسم الموافقه', field: 'approvalName' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ApprovalTypeViewComponent,
    editDialogClassType: ApprovalTypeEditComponent,
    newDialogClassType: ApprovalTypeNewComponent,
  });
    constructor(
        injector: Injector,
        public approvalTypeService: ApprovalTypeService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedApprovalType = new ApprovalType();

    

    this.searchForm = this.formBuilder.group({
     	approvalCode : [],
	approvalName : []
    });

     
  }

  getApprovalTypePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ApprovalType[]> => {
    return this.approvalTypeService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.approvalTypeService.delete(param.data.id)
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

