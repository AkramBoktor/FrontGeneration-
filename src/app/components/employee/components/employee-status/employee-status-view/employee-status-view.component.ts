
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EmployeeStatus } from 'app/shared/models/employee-status';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EmployeeStatusService } from '../shared/employee-status.service';

@Component({
  selector: 'app-employee-status-view',
  templateUrl: './employee-status-view.component.html',
  styleUrls: ['./employee-status-view.component.scss'],
  providers: []
})

export class EmployeeStatusViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEmployeeStatus: EmployeeStatus;
  employeeStatusForm: FormGroup;

  private employeeStatusesService: LookupService;

  
statusSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEmployeeStatusDialog: any,
    @Optional() public dialogRef: MatDialogRef<EmployeeStatusViewComponent>,
    public employeeStatusService: EmployeeStatusService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeeStatus = this.selectedEmployeeStatusDialog.data || this.selectedEmployeeStatus;

    
	this.statusSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' الحالة',
	});


    this.employeeStatusForm = this.formBuilder.group({
      
  employeeCode : [this.selectedEmployeeStatus.employeeCode],
  statusStartDate : [this.selectedEmployeeStatus.statusStartDate],
  status : [this.selectedEmployeeStatus.status]
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
    return this.employeeStatusForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.employeeStatusForm.controls)) {
      this.employeeStatusForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.employeeStatusesService = new LookupService('employeestatuses', this.http);
  }
}

