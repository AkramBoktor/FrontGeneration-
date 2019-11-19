
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { VacationEmployee } from 'app/shared/models/vacation-employee';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { VacationEmployeeService } from '../shared/vacation-employee.service';

@Component({
  selector: 'app-vacation-employee-view',
  templateUrl: './vacation-employee-view.component.html',
  styleUrls: ['./vacation-employee-view.component.scss'],
  providers: []
})

export class VacationEmployeeViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedVacationEmployee: VacationEmployee;
  vacationEmployeeForm: FormGroup;

  private centralDepartmentsService: LookupService;
private subDepartmentsService: LookupService;
private vacationTypesService: LookupService;

  
centralAdministrationSelectOptions: MaterialSelectOptions;
subAdministrationSelectOptions: MaterialSelectOptions;
vacationsTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedVacationEmployeeDialog: any,
    @Optional() public dialogRef: MatDialogRef<VacationEmployeeViewComponent>,
    public vacationEmployeeService: VacationEmployeeService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedVacationEmployee = this.selectedVacationEmployeeDialog.data || this.selectedVacationEmployee;

    
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

	this.vacationsTypeSelectOptions = new MaterialSelectOptions({
	 data: this.vacationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الاجازة',
	});


    this.vacationEmployeeForm = this.formBuilder.group({
      
  employeeCode : [this.selectedVacationEmployee.employeeCode],
  employeeName : [this.selectedVacationEmployee.employeeName],
  regularPreviousVacations : [this.selectedVacationEmployee.regularPreviousVacations],
  regularBalance : [this.selectedVacationEmployee.regularBalance],
  casualBalance : [this.selectedVacationEmployee.casualBalance],
  fromDate : [this.selectedVacationEmployee.fromDate],
  toDate : [this.selectedVacationEmployee.toDate],
  permission : [this.selectedVacationEmployee.permission],
  decisionNumber : [this.selectedVacationEmployee.decisionNumber],
  decisionDate : [this.selectedVacationEmployee.decisionDate],
  implementationDuration : [this.selectedVacationEmployee.implementationDuration],
  centralAdministration : [this.selectedVacationEmployee.centralAdministration],
  subAdministration : [this.selectedVacationEmployee.subAdministration],
  vacationsType : [this.selectedVacationEmployee.vacationsType]
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
    return this.vacationEmployeeForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.vacationEmployeeForm.controls)) {
      this.vacationEmployeeForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.vacationTypesService = new LookupService('vacationtypes', this.http);
  }
}

