
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ContinuityDataForAuthorityEmployee } from 'app/shared/models/continuity-data-for-authority-employee';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ContinuityDataForAuthorityEmployeeService } from '../shared/continuity-data-for-authority-employee.service';

@Component({
  selector: 'app-continuity-data-for-authority-employee-view',
  templateUrl: './continuity-data-for-authority-employee-view.component.html',
  styleUrls: ['./continuity-data-for-authority-employee-view.component.scss'],
  providers: []
})

export class ContinuityDataForAuthorityEmployeeViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedContinuityDataForAuthorityEmployee: ContinuityDataForAuthorityEmployee;
  continuityDataForAuthorityEmployeeForm: FormGroup;

  private centralDepartmentsService: LookupService;
private subDepartmentsService: LookupService;

  
centralAdministrationSelectOptions: MaterialSelectOptions;
subAdministrationSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedContinuityDataForAuthorityEmployeeDialog: any,
    @Optional() public dialogRef: MatDialogRef<ContinuityDataForAuthorityEmployeeViewComponent>,
    public continuityDataForAuthorityEmployeeService: ContinuityDataForAuthorityEmployeeService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedContinuityDataForAuthorityEmployee = this.selectedContinuityDataForAuthorityEmployeeDialog.data || this.selectedContinuityDataForAuthorityEmployee;

    
	this.centralAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.centralDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره المركزيه',
	});

	this.subAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة الفرعية',
	});


    this.continuityDataForAuthorityEmployeeForm = this.formBuilder.group({
      
  continueDay : [this.selectedContinuityDataForAuthorityEmployee.continueDay],
  employeeCode : [this.selectedContinuityDataForAuthorityEmployee.employeeCode],
  centralAdministration : [this.selectedContinuityDataForAuthorityEmployee.centralAdministration],
  subAdministration : [this.selectedContinuityDataForAuthorityEmployee.subAdministration]
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
    return this.continuityDataForAuthorityEmployeeForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.continuityDataForAuthorityEmployeeForm.controls)) {
      this.continuityDataForAuthorityEmployeeForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
  }
}

