
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { DeliveryWarehousesToKeepers } from 'app/shared/models/delivery-warehouses-to-keepers';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DeliveryWarehousesToKeepersService } from '../shared/delivery-warehouses-to-keepers.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-delivery-warehouses-to-keepers-view',
  templateUrl: './delivery-warehouses-to-keepers-view.component.html',
  styleUrls: ['./delivery-warehouses-to-keepers-view.component.scss'],
  providers: []
})

export class DeliveryWarehousesToKeepersViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDeliveryWarehousesToKeepers: DeliveryWarehousesToKeepers;
  deliveryWarehousesToKeepersForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDeliveryWarehousesToKeepersDialog: any,
    @Optional() public dialogRef: MatDialogRef<DeliveryWarehousesToKeepersViewComponent>,
    public deliveryWarehousesToKeepersService: DeliveryWarehousesToKeepersService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDeliveryWarehousesToKeepers = this.selectedDeliveryWarehousesToKeepersDialog.data || this.selectedDeliveryWarehousesToKeepers;

    

    this.deliveryWarehousesToKeepersForm = this.formBuilder.group({
      
  storeNumber : [this.selectedDeliveryWarehousesToKeepers.storeNumber],
  currentStorekeeper : [this.selectedDeliveryWarehousesToKeepers.currentStorekeeper],
  receivedDate : [this.selectedDeliveryWarehousesToKeepers.receivedDate],
  employeeCode : [this.selectedDeliveryWarehousesToKeepers.employeeCode],
  deliveryDate : [this.selectedDeliveryWarehousesToKeepers.deliveryDate]
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
    return this.deliveryWarehousesToKeepersForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.deliveryWarehousesToKeepersForm.controls)) {
      this.deliveryWarehousesToKeepersForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

