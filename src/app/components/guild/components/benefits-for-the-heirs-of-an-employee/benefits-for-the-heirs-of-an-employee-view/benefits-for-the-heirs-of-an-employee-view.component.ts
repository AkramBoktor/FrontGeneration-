
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { BenefitsForTheHeirsOfAnEmployee } from 'app/shared/models/benefits-for-the-heirs-of-an-employee';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { BenefitsForTheHeirsOfAnEmployeeService } from '../shared/benefits-for-the-heirs-of-an-employee.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-benefits-for-the-heirs-of-an-employee-view',
  templateUrl: './benefits-for-the-heirs-of-an-employee-view.component.html',
  styleUrls: ['./benefits-for-the-heirs-of-an-employee-view.component.scss'],
  providers: []
})

export class BenefitsForTheHeirsOfAnEmployeeViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBenefitsForTheHeirsOfAnEmployee: BenefitsForTheHeirsOfAnEmployee;
  benefitsForTheHeirsOfAnEmployeeForm: FormGroup;

  private subsidyTypesService: LookupService;

  
subsidyTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBenefitsForTheHeirsOfAnEmployeeDialog: any,
    @Optional() public dialogRef: MatDialogRef<BenefitsForTheHeirsOfAnEmployeeViewComponent>,
    public benefitsForTheHeirsOfAnEmployeeService: BenefitsForTheHeirsOfAnEmployeeService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBenefitsForTheHeirsOfAnEmployee = this.selectedBenefitsForTheHeirsOfAnEmployeeDialog.data || this.selectedBenefitsForTheHeirsOfAnEmployee;

    
	this.subsidyTypeSelectOptions = new MaterialSelectOptions({
	 data: this.subsidyTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' نوع الاعانة',
	});


    this.benefitsForTheHeirsOfAnEmployeeForm = this.formBuilder.group({
      
  checkNumber : [this.selectedBenefitsForTheHeirsOfAnEmployee.checkNumber],
  checkDate : [this.selectedBenefitsForTheHeirsOfAnEmployee.checkDate],
  checkAmount : [this.selectedBenefitsForTheHeirsOfAnEmployee.checkAmount],
  employeeCode : [this.selectedBenefitsForTheHeirsOfAnEmployee.employeeCode],
  subsidyAmount : [this.selectedBenefitsForTheHeirsOfAnEmployee.subsidyAmount],
  heirCheckNo : [this.selectedBenefitsForTheHeirsOfAnEmployee.heirCheckNo],
  heirCheckDate : [this.selectedBenefitsForTheHeirsOfAnEmployee.heirCheckDate],
  heirName : [this.selectedBenefitsForTheHeirsOfAnEmployee.heirName],
  amount : [this.selectedBenefitsForTheHeirsOfAnEmployee.amount],
  subsidyType : [this.selectedBenefitsForTheHeirsOfAnEmployee.subsidyType]
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
    return this.benefitsForTheHeirsOfAnEmployeeForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.benefitsForTheHeirsOfAnEmployeeForm.controls)) {
      this.benefitsForTheHeirsOfAnEmployeeForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.subsidyTypesService = new LookupService('subsidytypes', this.http);
  }
}

