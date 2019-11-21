
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { SchoolData } from 'app/shared/models/school-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { SchoolDataService } from '../shared/school-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-school-data-view',
  templateUrl: './school-data-view.component.html',
  styleUrls: ['./school-data-view.component.scss'],
  providers: []
})

export class SchoolDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSchoolData: SchoolData;
  schoolDataForm: FormGroup;

  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;
private dependencyCodesService: LookupService;
private educationalLevelsService: LookupService;
private educationTypesService: LookupService;
private usagePeriodNumbersService: LookupService;

  
regionalCenterCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
dependencyCodeSelectOptions: MaterialSelectOptions;
phaseCodeSelectOptions: MaterialSelectOptions;
educationQualityCodeSelectOptions: MaterialSelectOptions;
periodsOfUseNumberSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSchoolDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<SchoolDataViewComponent>,
    public schoolDataService: SchoolDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSchoolData = this.selectedSchoolDataDialog.data || this.selectedSchoolData;

    
	this.regionalCenterCodeSelectOptions = new MaterialSelectOptions({
	 data: this.regionalCenterCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المركز الاقليمي',
	});

	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.dependencyCodeSelectOptions = new MaterialSelectOptions({
	 data: this.dependencyCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود التبعية',
	});

	this.phaseCodeSelectOptions = new MaterialSelectOptions({
	 data: this.educationalLevelsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المرحلة',
	});

	this.educationQualityCodeSelectOptions = new MaterialSelectOptions({
	 data: this.educationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود نوعية التعليم',
	});

	this.periodsOfUseNumberSelectOptions = new MaterialSelectOptions({
	 data: this.usagePeriodNumbersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'عدد فترات الاستخدام',
	});


    this.schoolDataForm = this.formBuilder.group({
      
  buildingCode : [this.selectedSchoolData.buildingCode],
  regionalCenterCode : [this.selectedSchoolData.regionalCenterCode],
  branchCode : [this.selectedSchoolData.branchCode],
  dependencyCode : [this.selectedSchoolData.dependencyCode],
  phaseCode : [this.selectedSchoolData.phaseCode],
  educationQualityCode : [this.selectedSchoolData.educationQualityCode],
  periodsOfUseNumber : [this.selectedSchoolData.periodsOfUseNumber]
      });

    this.disableControls();
  }

  onConfirm() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  getErrorMessage = (formCtrl: AbstractControl) => {
    const errorMessages: FormControlError[] = [
          
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.schoolDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.schoolDataForm.controls)) {
      this.schoolDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.dependencyCodesService = new LookupService('dependencycodes', this.http);
this.educationalLevelsService = new LookupService('educationallevels', this.http);
this.educationTypesService = new LookupService('educationtypes', this.http);
this.usagePeriodNumbersService = new LookupService('usageperiodnumbers', this.http);
  }
}

