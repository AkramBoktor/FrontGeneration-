
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EmployeeBenefitsAfterCashingACheck } from 'app/shared/models/employee-benefits-after-cashing-a-check';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { EmployeeBenefitsAfterCashingACheckService } from '../shared/employee-benefits-after-cashing-a-check.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-employee-benefits-after-cashing-a-check-edit',
  templateUrl: './employee-benefits-after-cashing-a-check-edit.component.html',
  styleUrls: ['./employee-benefits-after-cashing-a-check-edit.component.scss'],
  providers: []
})

export class EmployeeBenefitsAfterCashingACheckEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEmployeeBenefitsAfterCashingACheck: EmployeeBenefitsAfterCashingACheck;
  employeeBenefitsAfterCashingACheckForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private subsidyTypesService: LookupService;

  
subsidyTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('subsidyType', { static: true }) SubsidyTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEmployeeBenefitsAfterCashingACheckDialog: any,
    @Optional() public dialogRef: MatDialogRef<EmployeeBenefitsAfterCashingACheckEditComponent>,
    public employeeBenefitsAfterCashingACheckService: EmployeeBenefitsAfterCashingACheckService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeeBenefitsAfterCashingACheck = new EmployeeBenefitsAfterCashingACheck();
    this.selectedEmployeeBenefitsAfterCashingACheck = this.selectedEmployeeBenefitsAfterCashingACheckDialog.data || this.selectedEmployeeBenefitsAfterCashingACheck;

    
	this.subsidyTypeSelectOptions = new MaterialSelectOptions({
	 data: this.subsidyTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' نوع الاعانة',
	});


    this.employeeBenefitsAfterCashingACheckForm = this.formBuilder.group({
      
  id : [this.selectedEmployeeBenefitsAfterCashingACheck.id],
  checkNumber : [this.selectedEmployeeBenefitsAfterCashingACheck.checkNumber, [ Validators.required ]],
  checkDate : [this.selectedEmployeeBenefitsAfterCashingACheck.checkDate, [ Validators.required ]],
  checkAmount : [this.selectedEmployeeBenefitsAfterCashingACheck.checkAmount, [ Validators.required ]],
  employeeCode : [this.selectedEmployeeBenefitsAfterCashingACheck.employeeCode, [ Validators.required ]],
  subsidyAmount : [this.selectedEmployeeBenefitsAfterCashingACheck.subsidyAmount, [ Validators.required ]],
  exchangeDate : [this.selectedEmployeeBenefitsAfterCashingACheck.exchangeDate, [ Validators.required ]],
  subsidyType : [this.selectedEmployeeBenefitsAfterCashingACheck.subsidyType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.employeeBenefitsAfterCashingACheckService.update(this.employeeBenefitsAfterCashingACheckForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.employeeBenefitsAfterCashingACheckService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.employeeBenefitsAfterCashingACheckForm.get(name);
  }

  initializeLookupServices() {
    this.subsidyTypesService = new LookupService('subsidytypes', this.http);
  }
}
