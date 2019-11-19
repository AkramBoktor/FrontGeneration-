
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ReturnOfCustodyOfAnEmployee } from 'app/shared/models/return-of-custody-of-an-employee';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ReturnOfCustodyOfAnEmployeeService } from '../shared/return-of-custody-of-an-employee.service';

@Component({
  selector: 'app-return-of-custody-of-an-employee-view',
  templateUrl: './return-of-custody-of-an-employee-view.component.html',
  styleUrls: ['./return-of-custody-of-an-employee-view.component.scss'],
  providers: []
})

export class ReturnOfCustodyOfAnEmployeeViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedReturnOfCustodyOfAnEmployee: ReturnOfCustodyOfAnEmployee;
  returnOfCustodyOfAnEmployeeForm: FormGroup;

  private itemStatusesService: LookupService;

  
itemConditionSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedReturnOfCustodyOfAnEmployeeDialog: any,
    @Optional() public dialogRef: MatDialogRef<ReturnOfCustodyOfAnEmployeeViewComponent>,
    public returnOfCustodyOfAnEmployeeService: ReturnOfCustodyOfAnEmployeeService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedReturnOfCustodyOfAnEmployee = this.selectedReturnOfCustodyOfAnEmployeeDialog.data || this.selectedReturnOfCustodyOfAnEmployee;

    
	this.itemConditionSelectOptions = new MaterialSelectOptions({
	 data: this.itemStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الصنف ',
	});


    this.returnOfCustodyOfAnEmployeeForm = this.formBuilder.group({
      
  storeNumber : [this.selectedReturnOfCustodyOfAnEmployee.storeNumber],
  employeeCode : [this.selectedReturnOfCustodyOfAnEmployee.employeeCode],
  itemNo : [this.selectedReturnOfCustodyOfAnEmployee.itemNo],
  authorizationNumber : [this.selectedReturnOfCustodyOfAnEmployee.authorizationNumber],
  exchangeDate : [this.selectedReturnOfCustodyOfAnEmployee.exchangeDate],
  quantityExchange : [this.selectedReturnOfCustodyOfAnEmployee.quantityExchange],
  returnDate : [this.selectedReturnOfCustodyOfAnEmployee.returnDate],
  addPermissionNumber : [this.selectedReturnOfCustodyOfAnEmployee.addPermissionNumber],
  returnQuantity : [this.selectedReturnOfCustodyOfAnEmployee.returnQuantity],
  itemCode : [this.selectedReturnOfCustodyOfAnEmployee.itemCode],
  productName : [this.selectedReturnOfCustodyOfAnEmployee.productName],
  quantity : [this.selectedReturnOfCustodyOfAnEmployee.quantity],
  price : [this.selectedReturnOfCustodyOfAnEmployee.price],
  itemCondition : [this.selectedReturnOfCustodyOfAnEmployee.itemCondition],
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
    return this.returnOfCustodyOfAnEmployeeForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.returnOfCustodyOfAnEmployeeForm.controls)) {
      this.returnOfCustodyOfAnEmployeeForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.itemStatusesService = new LookupService('itemstatuses', this.http);
this.itemStatusesService = new LookupService('itemstatuses', this.http);
  }
}

