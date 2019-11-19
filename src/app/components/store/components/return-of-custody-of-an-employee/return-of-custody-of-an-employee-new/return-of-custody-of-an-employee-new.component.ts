
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ReturnOfCustodyOfAnEmployee } from 'app/shared/models/return-of-custody-of-an-employee';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { ReturnOfCustodyOfAnEmployeeService } from '../shared/return-of-custody-of-an-employee.service';


@Component({
  selector: 'app-return-of-custody-of-an-employee-new',
  templateUrl: './return-of-custody-of-an-employee-new.component.html',
  styleUrls: ['./return-of-custody-of-an-employee-new.component.scss'],
  providers: [
    ]
})

export class ReturnOfCustodyOfAnEmployeeNewComponent extends AppBaseComponent implements OnInit {
  returnOfCustodyOfAnEmployeeForm: FormGroup;
  @Input() selectedReturnOfCustodyOfAnEmployee: ReturnOfCustodyOfAnEmployee;
  errorMessages: FormControlError[] = [
        
  ];

  private itemStatusesService: LookupService;

  
itemConditionSelectOptions: MaterialSelectOptions;

  
	@ViewChild('itemCondition', { static: true }) ItemConditionSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ReturnOfCustodyOfAnEmployeeNewComponent>,
    public returnOfCustodyOfAnEmployeeService: ReturnOfCustodyOfAnEmployeeService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedReturnOfCustodyOfAnEmployee = new ReturnOfCustodyOfAnEmployee();

    
	this.itemConditionSelectOptions = new MaterialSelectOptions({
	 data: this.itemStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الصنف ',
	});
 

    this.returnOfCustodyOfAnEmployeeForm = this.formBuilder.group({
     
  id : [0],
  storeNumber : [this.selectedReturnOfCustodyOfAnEmployee.storeNumber, [ Validators.required ]],
  employeeCode : [this.selectedReturnOfCustodyOfAnEmployee.employeeCode, [ Validators.required ]],
  itemNo : [this.selectedReturnOfCustodyOfAnEmployee.itemNo, [ Validators.required ]],
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
  itemCondition : [this.selectedReturnOfCustodyOfAnEmployee.itemCondition, [ ]],
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.returnOfCustodyOfAnEmployeeService.create(this.returnOfCustodyOfAnEmployeeForm.value)
        .pipe(switchMap(x => {
			return this.returnOfCustodyOfAnEmployeeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.returnOfCustodyOfAnEmployeeForm.get(name);
    }

  initializeLookupServices() {
    this.itemStatusesService = new LookupService('itemstatuses', this.http);
this.itemStatusesService = new LookupService('itemstatuses', this.http);
  }
 }
