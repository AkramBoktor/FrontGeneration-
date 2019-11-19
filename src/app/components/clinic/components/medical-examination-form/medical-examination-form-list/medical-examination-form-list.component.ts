
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MedicalExaminationForm } from 'app/shared/models/medical-examination-form';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { MedicalExaminationFormEditComponent } from '../medical-examination-form-edit/medical-examination-form-edit.component';
import { MedicalExaminationFormNewComponent } from '../medical-examination-form-new/medical-examination-form-new.component';
import { MedicalExaminationFormViewComponent } from '../medical-examination-form-view/medical-examination-form-view.component';
import { MedicalExaminationFormService } from '../shared/medical-examination-form.service';

@Component({
  selector: 'app-medical-examination-form-list',
  templateUrl: './medical-examination-form-list.component.html',
  styleUrls: ['./medical-examination-form-list.component.scss'],
  providers: []
})

export class MedicalExaminationFormListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private diseasesTypesService: LookupService;
private detectionTypesService: LookupService;

  
diseaseCodeSelectOptions: MaterialSelectOptions;
examinationTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('diseaseCode', { static: true }) DiseaseCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('examinationType', { static: true }) ExaminationTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedMedicalExaminationForm: MedicalExaminationForm;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'التشخيص', field: 'diagnosis' }),
	new GridColumnOptions({ headerName: 'اسم المرض', field: 'diseaseName' }),
	new GridColumnOptions({ headerName: 'تاريخ الكشف', field: 'examinationDate' }),
	new GridColumnOptions({ headerName: 'اسم المريض', field: 'patientName' }),
	new GridColumnOptions({ headerName: 'رقم الموظف المريض', field: 'emloyeeCode' }),
	new GridColumnOptions({ headerName: 'رقم الموظف الطبيب', field: 'doctorCode' }),
	new GridColumnOptions({ headerName: 'اسم الموظف الطبيب', field: 'doctorName' }),
	new GridColumnOptions({ headerName: 'رقم المرض', field: 'diseaseCode' }),
	new GridColumnOptions({ headerName: 'نوع الكشف', field: 'examinationType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: MedicalExaminationFormViewComponent,
    editDialogClassType: MedicalExaminationFormEditComponent,
    newDialogClassType: MedicalExaminationFormNewComponent,
  });
    constructor(
        injector: Injector,
        public medicalExaminationFormService: MedicalExaminationFormService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedMedicalExaminationForm = new MedicalExaminationForm();

    
	this.diseaseCodeSelectOptions = new MaterialSelectOptions({
	 data: this.diseasesTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم المرض',
	});

	this.examinationTypeSelectOptions = new MaterialSelectOptions({
	 data: this.detectionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الكشف',
	});


    this.searchForm = this.formBuilder.group({
     	patientCode : [],
	doctorCode : [],
	diseaseCode : [],
	examinationType : []
    });

     
  }

  getMedicalExaminationFormPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<MedicalExaminationForm[]> => {
    return this.medicalExaminationFormService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.medicalExaminationFormService.delete(param.data.id)
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
    this.diseasesTypesService = new LookupService('diseasestypes', this.http);
this.detectionTypesService = new LookupService('detectiontypes', this.http);
  }
}

