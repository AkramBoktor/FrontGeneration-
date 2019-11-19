
import { Component, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { EmployeeInsuranceNumber } from 'app/shared/models/employee-insurance-number';
import { switchMap } from 'rxjs/operators';
import { EmployeeInsuranceNumberService } from '../shared/employee-insurance-number.service';


@Component({
  selector: 'app-employee-insurance-number-new',
  templateUrl: './employee-insurance-number-new.component.html',
  styleUrls: ['./employee-insurance-number-new.component.scss'],
  providers: [
    ]
})

export class EmployeeInsuranceNumberNewComponent extends AppBaseComponent implements OnInit {
  employeeInsuranceNumberForm: FormGroup;
  @Input() selectedEmployeeInsuranceNumber: EmployeeInsuranceNumber;
  errorMessages: FormControlError[] = [
        
	{
	 errorName: 'minLength',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	},
	{
	 errorName: 'max',
	 errorMessage: 'لا يمكن ان يزيد عن 10'
	},
	{
	 errorName: 'min',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	}
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<EmployeeInsuranceNumberNewComponent>,
    public employeeInsuranceNumberService: EmployeeInsuranceNumberService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeeInsuranceNumber = new EmployeeInsuranceNumber();

    

    this.employeeInsuranceNumberForm = this.formBuilder.group({
     
  id : [0],
  employeeCode : [this.selectedEmployeeInsuranceNumber.employeeCode, [ Validators.required,Validators.minLength(1) ]],
  insuranceNumber : [this.selectedEmployeeInsuranceNumber.insuranceNumber, [ Validators.required,Validators.max(10),Validators.min(1) ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.employeeInsuranceNumberService.create(this.employeeInsuranceNumberForm.value)
        .pipe(switchMap(x => {
			return this.employeeInsuranceNumberService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.employeeInsuranceNumberForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
