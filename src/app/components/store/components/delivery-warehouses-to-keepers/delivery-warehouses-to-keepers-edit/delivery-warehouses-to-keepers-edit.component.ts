
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DeliveryWarehousesToKeepers } from 'app/shared/models/delivery-warehouses-to-keepers';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { DeliveryWarehousesToKeepersService } from '../shared/delivery-warehouses-to-keepers.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-delivery-warehouses-to-keepers-edit',
  templateUrl: './delivery-warehouses-to-keepers-edit.component.html',
  styleUrls: ['./delivery-warehouses-to-keepers-edit.component.scss'],
  providers: []
})

export class DeliveryWarehousesToKeepersEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDeliveryWarehousesToKeepers: DeliveryWarehousesToKeepers;
  deliveryWarehousesToKeepersForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDeliveryWarehousesToKeepersDialog: any,
    @Optional() public dialogRef: MatDialogRef<DeliveryWarehousesToKeepersEditComponent>,
    public deliveryWarehousesToKeepersService: DeliveryWarehousesToKeepersService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDeliveryWarehousesToKeepers = new DeliveryWarehousesToKeepers();
    this.selectedDeliveryWarehousesToKeepers = this.selectedDeliveryWarehousesToKeepersDialog.data || this.selectedDeliveryWarehousesToKeepers;

    

    this.deliveryWarehousesToKeepersForm = this.formBuilder.group({
      
  id : [this.selectedDeliveryWarehousesToKeepers.id],
  storeNumber : [this.selectedDeliveryWarehousesToKeepers.storeNumber, [ Validators.required ]],
  currentStorekeeper : [this.selectedDeliveryWarehousesToKeepers.currentStorekeeper, [ ]],
  receivedDate : [this.selectedDeliveryWarehousesToKeepers.receivedDate, [ ]],
  employeeCode : [this.selectedDeliveryWarehousesToKeepers.employeeCode, [ Validators.required ]],
  deliveryDate : [this.selectedDeliveryWarehousesToKeepers.deliveryDate, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.deliveryWarehousesToKeepersService.update(this.deliveryWarehousesToKeepersForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.deliveryWarehousesToKeepersService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.deliveryWarehousesToKeepersForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
