
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { EmploymentForPrivateSchool } from 'app/shared/models/employment-for-private-school';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { EmploymentForPrivateSchoolService } from '../shared/employment-for-private-school.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-employment-for-private-school-view',
  templateUrl: './employment-for-private-school-view.component.html',
  styleUrls: ['./employment-for-private-school-view.component.scss'],
  providers: []
})

export class EmploymentForPrivateSchoolViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEmploymentForPrivateSchool: EmploymentForPrivateSchool;
  employmentForPrivateSchoolForm: FormGroup;

  private operationTypesService: LookupService;
private dependencyCodesService: LookupService;
private educationalLevelsService: LookupService;

  
operationTypeSelectOptions: MaterialSelectOptions;
schoolDependencySelectOptions: MaterialSelectOptions;
phaseCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEmploymentForPrivateSchoolDialog: any,
    @Optional() public dialogRef: MatDialogRef<EmploymentForPrivateSchoolViewComponent>,
    public employmentForPrivateSchoolService: EmploymentForPrivateSchoolService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmploymentForPrivateSchool = this.selectedEmploymentForPrivateSchoolDialog.data || this.selectedEmploymentForPrivateSchool;

    
	this.operationTypeSelectOptions = new MaterialSelectOptions({
	 data: this.operationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التشغيل',
	});

	this.schoolDependencySelectOptions = new MaterialSelectOptions({
	 data: this.dependencyCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'تبعية مدرسة خ',
	});

	this.phaseCodeSelectOptions = new MaterialSelectOptions({
	 data: this.educationalLevelsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المرحلة',
	});


    this.employmentForPrivateSchoolForm = this.formBuilder.group({
      
  schoolCode : [this.selectedEmploymentForPrivateSchool.schoolCode],
  approvalDate : [this.selectedEmploymentForPrivateSchool.approvalDate],
  operationDate : [this.selectedEmploymentForPrivateSchool.operationDate],
  notes : [this.selectedEmploymentForPrivateSchool.notes],
  classesNumber : [this.selectedEmploymentForPrivateSchool.classesNumber],
  operationType : [this.selectedEmploymentForPrivateSchool.operationType],
  schoolDependency : [this.selectedEmploymentForPrivateSchool.schoolDependency],
  phaseCode : [this.selectedEmploymentForPrivateSchool.phaseCode]
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
    return this.employmentForPrivateSchoolForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.employmentForPrivateSchoolForm.controls)) {
      this.employmentForPrivateSchoolForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.operationTypesService = new LookupService('operationtypes', this.http);
this.dependencyCodesService = new LookupService('dependencycodes', this.http);
this.educationalLevelsService = new LookupService('educationallevels', this.http);
  }
}

