
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ReturnOfCustodyOfAnEmployee } from 'app/shared/models/return-of-custody-of-an-employee';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { ReturnOfCustodyOfAnEmployeeService } from '../shared/return-of-custody-of-an-employee.service';




@Component({
  selector: 'app-return-of-custody-of-an-employee-edit',
  templateUrl: './return-of-custody-of-an-employee-edit.component.html',
  styleUrls: ['./return-of-custody-of-an-employee-edit.component.scss'],
  providers: []
})

export class ReturnOfCustodyOfAnEmployeeEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedReturnOfCustodyOfAnEmployee: ReturnOfCustodyOfAnEmployee;
  returnOfCustodyOfAnEmployeeForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private itemStatusesService: LookupService;

  
itemConditionSelectOptions: MaterialSelectOptions;

  
	@ViewChild('itemCondition', { static: true }) ItemConditionSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedReturnOfCustodyOfAnEmployeeDialog: any,
    @Optional() public dialogRef: MatDialogRef<ReturnOfCustodyOfAnEmployeeEditComponent>,
    public returnOfCustodyOfAnEmployeeService: ReturnOfCustodyOfAnEmployeeService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedReturnOfCustodyOfAnEmployee = new ReturnOfCustodyOfAnEmployee();
    this.selectedReturnOfCustodyOfAnEmployee = this.selectedReturnOfCustodyOfAnEmployeeDialog.data || this.selectedReturnOfCustodyOfAnEmployee;

    
	this.itemConditionSelectOptions = new MaterialSelectOptions({
	 data: this.itemStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الصنف ',
	});


    this.returnOfCustodyOfAnEmployeeForm = this.formBuilder.group({
      
  id : [this.selectedReturnOfCustodyOfAnEmployee.id],
  storeNumber : [this.selectedReturnOfCustodyOfAnEmployee.storeNumber, [ Validators.required ]],
  employeeCode : [this.selectedReturnOfCustodyOfAnEmployee.employeeCode, [ Validators.required ]],
  itemNo : [this.selectedReturnOfCustodyOfAnEmployee.itemNo, [ Validators.required ]],
  itemCondition : [this.selectedReturnOfCustodyOfAnEmployee.itemCondition, [ ]],
  authorizationNumber : [this.selectedReturnOfCustodyOfAnEmployee.authorizationNumber, [ ]],
  exchangeDate : [this.selectedReturnOfCustodyOfAnEmployee.exchangeDate, [ ]],
  quantityExchange : [this.selectedReturnOfCustodyOfAnEmployee.quantityExchange, [ ]],
  returnDate : [this.selectedReturnOfCustodyOfAnEmployee.returnDate, [ Validators.required ]],
  addPermissionNumber : [this.selectedReturnOfCustodyOfAnEmployee.addPermissionNumber, [ Validators.required ]],
  returnQuantity : [this.selectedReturnOfCustodyOfAnEmployee.returnQuantity, [ Validators.required ]],
  itemCode : [this.selectedReturnOfCustodyOfAnEmployee.itemCode, [ Validators.required ]],
  productName : [this.selectedReturnOfCustodyOfAnEmployee.productName, [ ]],
  quantity : [this.selectedReturnOfCustodyOfAnEmployee.quantity, [ ]],
  price : [this.selectedReturnOfCustodyOfAnEmployee.price, [ ]],
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.returnOfCustodyOfAnEmployeeService.update(this.returnOfCustodyOfAnEmployeeForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.returnOfCustodyOfAnEmployeeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.returnOfCustodyOfAnEmployeeForm.get(name);
  }

  initializeLookupServices() {
    this.itemStatusesService = new LookupService('itemstatuses', this.http);
  }
}
