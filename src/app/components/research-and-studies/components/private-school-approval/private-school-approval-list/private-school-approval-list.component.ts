
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { PrivateSchoolApproval } from 'app/shared/models/private-school-approval';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PrivateSchoolApprovalEditComponent } from '../private-school-approval-edit/private-school-approval-edit.component';
import { PrivateSchoolApprovalNewComponent } from '../private-school-approval-new/private-school-approval-new.component';
import { PrivateSchoolApprovalViewComponent } from '../private-school-approval-view/private-school-approval-view.component';
import { PrivateSchoolApprovalService } from '../shared/private-school-approval.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-private-school-approval-list',
  templateUrl: './private-school-approval-list.component.html',
  styleUrls: ['./private-school-approval-list.component.scss'],
  providers: []
})

export class PrivateSchoolApprovalListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private governoratesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;

  
  @Input() selectedPrivateSchoolApproval: PrivateSchoolApproval;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود مدرسة مكملة', field: 'complementarySchoolCode' }),
	new GridColumnOptions({ headerName: 'كود المدرسة', field: 'schoolCode' }),
	new GridColumnOptions({ headerName: 'تاريخ الموافقة', field: 'approvalDate' }),
	new GridColumnOptions({ headerName: 'رقم الموافقة', field: 'approvalNumber' }),
	new GridColumnOptions({ headerName: 'نوع الموافقة', field: 'approvalType' }),
	new GridColumnOptions({ headerName: 'ملاحظات', field: 'notes' }),
	new GridColumnOptions({ headerName: 'م. موقع عام', field: 'generalSiteManager' }),
	new GridColumnOptions({ headerName: 'جهة الاعتماد', field: 'accreditationBody' }),
	new GridColumnOptions({ headerName: 'عدد الفصول', field: 'classesNumber' }),
	new GridColumnOptions({ headerName: 'StudentDensity الكثافة الطلابية', field: 'studentDensity' }),
	new GridColumnOptions({ headerName: 'اجمالي الطاقة الاستيعابية', field: 'totalCapacity' }),
	new GridColumnOptions({ headerName: 'المحافظة', field: 'governorate' }),
	new GridColumnOptions({ headerName: 'كود النوعية', field: 'qualityCode' }),
	new GridColumnOptions({ headerName: 'موقف الموافقة', field: 'approvalPosition' }),
	new GridColumnOptions({ headerName: 'تبعية مدرسة خ', field: 'schoolDependency' }),
	new GridColumnOptions({ headerName: 'كود المرحلة', field: 'phaseCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: PrivateSchoolApprovalViewComponent,
    editDialogClassType: PrivateSchoolApprovalEditComponent,
    newDialogClassType: PrivateSchoolApprovalNewComponent,
  });
    constructor(
        injector: Injector,
        public privateSchoolApprovalService: PrivateSchoolApprovalService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedPrivateSchoolApproval = new PrivateSchoolApproval();

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});


    this.searchForm = this.formBuilder.group({
     	schoolCode : [],
	governorate : []
    });

     
  }

  getPrivateSchoolApprovalsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<PrivateSchoolApproval[]> => {
    return this.privateSchoolApprovalService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.privateSchoolApprovalService.delete(param.data.id)
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
    this.governoratesService = new LookupService('governorates', this.http);
  }
}

