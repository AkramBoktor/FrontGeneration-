
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { BenefitsForTheHeirsOfAnEmployee } from 'app/shared/models/benefits-for-the-heirs-of-an-employee';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { BenefitsForTheHeirsOfAnEmployeeService } from '../shared/benefits-for-the-heirs-of-an-employee.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-benefits-for-the-heirs-of-an-employee-edit',
  templateUrl: './benefits-for-the-heirs-of-an-employee-edit.component.html',
  styleUrls: ['./benefits-for-the-heirs-of-an-employee-edit.component.scss'],
  providers: []
})

export class BenefitsForTheHeirsOfAnEmployeeEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBenefitsForTheHeirsOfAnEmployee: BenefitsForTheHeirsOfAnEmployee;
  benefitsForTheHeirsOfAnEmployeeForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private subsidyTypesService: LookupService;

  
subsidyTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('subsidyType', { static: true }) SubsidyTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBenefitsForTheHeirsOfAnEmployeeDialog: any,
    @Optional() public dialogRef: MatDialogRef<BenefitsForTheHeirsOfAnEmployeeEditComponent>,
    public benefitsForTheHeirsOfAnEmployeeService: BenefitsForTheHeirsOfAnEmployeeService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBenefitsForTheHeirsOfAnEmployee = new BenefitsForTheHeirsOfAnEmployee();
    this.selectedBenefitsForTheHeirsOfAnEmployee = this.selectedBenefitsForTheHeirsOfAnEmployeeDialog.data || this.selectedBenefitsForTheHeirsOfAnEmployee;

    
	this.subsidyTypeSelectOptions = new MaterialSelectOptions({
	 data: this.subsidyTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' نوع الاعانة',
	});


    this.benefitsForTheHeirsOfAnEmployeeForm = this.formBuilder.group({
      
  id : [this.selectedBenefitsForTheHeirsOfAnEmployee.id],
  checkNumber : [this.selectedBenefitsForTheHeirsOfAnEmployee.checkNumber, [ Validators.required ]],
  checkDate : [this.selectedBenefitsForTheHeirsOfAnEmployee.checkDate, [ ]],
  checkAmount : [this.selectedBenefitsForTheHeirsOfAnEmployee.checkAmount, [ Validators.required ]],
  employeeCode : [this.selectedBenefitsForTheHeirsOfAnEmployee.employeeCode, [ Validators.required ]],
  subsidyAmount : [this.selectedBenefitsForTheHeirsOfAnEmployee.subsidyAmount, [ Validators.required ]],
  heirCheckNo : [this.selectedBenefitsForTheHeirsOfAnEmployee.heirCheckNo, [ Validators.required ]],
  heirCheckDate : [this.selectedBenefitsForTheHeirsOfAnEmployee.heirCheckDate, [ Validators.required ]],
  heirName : [this.selectedBenefitsForTheHeirsOfAnEmployee.heirName, [ Validators.required ]],
  amount : [this.selectedBenefitsForTheHeirsOfAnEmployee.amount, [ Validators.required ]],
  subsidyType : [this.selectedBenefitsForTheHeirsOfAnEmployee.subsidyType, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.benefitsForTheHeirsOfAnEmployeeService.update(this.benefitsForTheHeirsOfAnEmployeeForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.benefitsForTheHeirsOfAnEmployeeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.benefitsForTheHeirsOfAnEmployeeForm.get(name);
  }

  initializeLookupServices() {
    this.subsidyTypesService = new LookupService('subsidytypes', this.http);
  }
}
