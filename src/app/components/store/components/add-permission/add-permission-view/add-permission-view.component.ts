
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { AddPermission } from 'app/shared/models/add-permission';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AddPermissionService } from '../shared/add-permission.service';

@Component({
  selector: 'app-add-permission-view',
  templateUrl: './add-permission-view.component.html',
  styleUrls: ['./add-permission-view.component.scss'],
  providers: []
})

export class AddPermissionViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAddPermission: AddPermission;
  addPermissionForm: FormGroup;

  private bondCodesService: LookupService;
private bondNumbersService: LookupService;
private gendersService: LookupService;
private itemStatusesService: LookupService;

  
bondCodeSelectOptions: MaterialSelectOptions;
bondNoSelectOptions: MaterialSelectOptions;
typeSelectOptions: MaterialSelectOptions;
conditionSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAddPermissionDialog: any,
    @Optional() public dialogRef: MatDialogRef<AddPermissionViewComponent>,
    public addPermissionService: AddPermissionService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAddPermission = this.selectedAddPermissionDialog.data || this.selectedAddPermission;

    
	this.bondCodeSelectOptions = new MaterialSelectOptions({
	 data: this.bondCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود السند',
	});

	this.bondNoSelectOptions = new MaterialSelectOptions({
	 data: this.bondNumbersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' رقم السند  ',
	});

	this.typeSelectOptions = new MaterialSelectOptions({
	 data: this.gendersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: '(نوع ( مستديم – مستهلك ',
	});

	this.conditionSelectOptions = new MaterialSelectOptions({
	 data: this.itemStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: '  (حالة ( جديد – مستعمل – كهنة – للاصلاح',
	});


    this.addPermissionForm = this.formBuilder.group({
      
  recipientStoreNumber : [this.selectedAddPermission.recipientStoreNumber],
  billNumber : [this.selectedAddPermission.billNumber],
  addPermissionNumber : [this.selectedAddPermission.addPermissionNumber],
  dateOfSupply : [this.selectedAddPermission.dateOfSupply],
  itemNo : [this.selectedAddPermission.itemNo],
  productName : [this.selectedAddPermission.productName],
  quantityBalance : [this.selectedAddPermission.quantityBalance],
  price : [this.selectedAddPermission.price],
  value : [this.selectedAddPermission.value],
  bondCode : [this.selectedAddPermission.bondCode],
  bondNo : [this.selectedAddPermission.bondNo],
  type : [this.selectedAddPermission.type],
  condition : [this.selectedAddPermission.condition]
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
    return this.addPermissionForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.addPermissionForm.controls)) {
      this.addPermissionForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.bondCodesService = new LookupService('bondcodes', this.http);
this.bondNumbersService = new LookupService('bondnumbers', this.http);
this.gendersService = new LookupService('genders', this.http);
this.itemStatusesService = new LookupService('itemstatuses', this.http);
  }
}

