
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { InspectionForm } from 'app/shared/models/inspection-form';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { InspectionFormEditComponent } from '../inspection-form-edit/inspection-form-edit.component';
import { InspectionFormNewComponent } from '../inspection-form-new/inspection-form-new.component';
import { InspectionFormViewComponent } from '../inspection-form-view/inspection-form-view.component';
import { InspectionFormService } from '../shared/inspection-form.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-inspection-form-list',
  templateUrl: './inspection-form-list.component.html',
  styleUrls: ['./inspection-form-list.component.scss'],
  providers: []
})

export class InspectionFormListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private branchCodesService: LookupService;
private subDepartmentsService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedInspectionForm: InspectionForm;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: ' رقم المدرسه ', field: 'schoolNumber' }),
	new GridColumnOptions({ headerName: ' تاريخ التفتيش ', field: 'inspectionDate' }),
	new GridColumnOptions({ headerName: 'مدير المدرسه ', field: 'schoolManger' }),
	new GridColumnOptions({ headerName: 'عضو التفتيش عن الاداره التعلميه ', field: 'managementEducationInspectionMember' }),
	new GridColumnOptions({ headerName: ' اعتماد مدير الاداره التعلميه ', field: 'directorEducationalAdministrationAccreditation' }),
	new GridColumnOptions({ headerName: ' اعتماد مدير المنطقه ', field: 'arealAdministrationAccreditation' }),
	new GridColumnOptions({ headerName: ' كود الفرع  ', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'كود الاداره', field: 'administrationCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: InspectionFormViewComponent,
    editDialogClassType: InspectionFormEditComponent,
    newDialogClassType: InspectionFormNewComponent,
  });
    constructor(
        injector: Injector,
        public inspectionFormService: InspectionFormService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedInspectionForm = new InspectionForm();

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' كود الفرع  ',
	});

	this.administrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الاداره',
	});


    this.searchForm = this.formBuilder.group({
     	schoolNumber : [],
	inspectionDate : [],
	schoolManger : [],
	managementEducationInspectionMember : [],
	directorEducationalAdministrationAccreditation : [],
	arealAdministrationAccreditation : [],
	branchCode : [],
	administrationCode : []
    });

     
  }

  getInspectionFormPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<InspectionForm[]> => {
    return this.inspectionFormService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.inspectionFormService.delete(param.data.id)
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
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
  }
}

