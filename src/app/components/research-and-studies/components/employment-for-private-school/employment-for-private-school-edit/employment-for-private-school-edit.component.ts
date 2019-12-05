
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EmploymentForPrivateSchool } from 'app/shared/models/employment-for-private-school';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { EmploymentForPrivateSchoolService } from '../shared/employment-for-private-school.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-employment-for-private-school-edit',
  templateUrl: './employment-for-private-school-edit.component.html',
  styleUrls: ['./employment-for-private-school-edit.component.scss'],
  providers: []
})

export class EmploymentForPrivateSchoolEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEmploymentForPrivateSchool: EmploymentForPrivateSchool;
  employmentForPrivateSchoolForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private operationTypesService: LookupService;
private dependencyCodesService: LookupService;
private educationalLevelsService: LookupService;

  
operationTypeSelectOptions: MaterialSelectOptions;
schoolDependencySelectOptions: MaterialSelectOptions;
phaseCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('operationType', { static: true }) OperationTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('schoolDependency', { static: true }) SchoolDependencySelectComponent: MaterialSelectComponent;
	@ViewChild('phaseCode', { static: true }) PhaseCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEmploymentForPrivateSchoolDialog: any,
    @Optional() public dialogRef: MatDialogRef<EmploymentForPrivateSchoolEditComponent>,
    public employmentForPrivateSchoolService: EmploymentForPrivateSchoolService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmploymentForPrivateSchool = new EmploymentForPrivateSchool();
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
      
  id : [this.selectedEmploymentForPrivateSchool.id],
  schoolCode : [this.selectedEmploymentForPrivateSchool.schoolCode, [ Validators.required ]],
  approvalDate : [this.selectedEmploymentForPrivateSchool.approvalDate, [ Validators.required ]],
  operationDate : [this.selectedEmploymentForPrivateSchool.operationDate, [ Validators.required ]],
  notes : [this.selectedEmploymentForPrivateSchool.notes, [ Validators.required ]],
  classesNumber : [this.selectedEmploymentForPrivateSchool.classesNumber, [ Validators.required ]],
  operationType : [this.selectedEmploymentForPrivateSchool.operationType, [ Validators.required ]],
  schoolDependency : [this.selectedEmploymentForPrivateSchool.schoolDependency, [ Validators.required ]],
  phaseCode : [this.selectedEmploymentForPrivateSchool.phaseCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.employmentForPrivateSchoolService.update(this.employmentForPrivateSchoolForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.employmentForPrivateSchoolService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
	    }))
    .subscribe(
      (result) => {
          if (this.dialogRef)
          {
              this.dialogRef.close(true);
          }
    });
  }

  getControls(name: string) {
    return this.employmentForPrivateSchoolForm.get(name);
  }

  initializeLookupServices() {
    this.operationTypesService = new LookupService('operationtypes', this.http);
this.dependencyCodesService = new LookupService('dependencycodes', this.http);
this.educationalLevelsService = new LookupService('educationallevels', this.http);
  }
}
