
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { EmployeeInsuranceNumber } from 'app/shared/models/employee-insurance-number';
import { switchMap } from 'rxjs/operators';
import { EmployeeInsuranceNumberService } from '../shared/employee-insurance-number.service';




@Component({
  selector: 'app-employee-insurance-number-edit',
  templateUrl: './employee-insurance-number-edit.component.html',
  styleUrls: ['./employee-insurance-number-edit.component.scss'],
  providers: []
})

export class EmployeeInsuranceNumberEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEmployeeInsuranceNumber: EmployeeInsuranceNumber;
  employeeInsuranceNumberForm: FormGroup;
  errorMessages: FormControlError[] = [
          
	{
	 errorName: 'minLength',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	},
	{
	 errorName: 'maxLength',
	 errorMessage: 'لا يمكن ان يزيد عن 10'
	},
	{
	 errorName: 'minLength',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	}
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEmployeeInsuranceNumberDialog: any,
    @Optional() public dialogRef: MatDialogRef<EmployeeInsuranceNumberEditComponent>,
    public employeeInsuranceNumberService: EmployeeInsuranceNumberService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeeInsuranceNumber = new EmployeeInsuranceNumber();
    this.selectedEmployeeInsuranceNumber = this.selectedEmployeeInsuranceNumberDialog.data || this.selectedEmployeeInsuranceNumber;

    

    this.employeeInsuranceNumberForm = this.formBuilder.group({
      
  id : [this.selectedEmployeeInsuranceNumber.id],
  employeeCode : [this.selectedEmployeeInsuranceNumber.employeeCode, [ Validators.required,Validators.minLength(1) ]],
  insuranceNumber : [this.selectedEmployeeInsuranceNumber.insuranceNumber, [ Validators.required,Validators.maxLength(10),Validators.minLength(1) ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.employeeInsuranceNumberService.update(this.employeeInsuranceNumberForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.employeeInsuranceNumberService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.employeeInsuranceNumberForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
