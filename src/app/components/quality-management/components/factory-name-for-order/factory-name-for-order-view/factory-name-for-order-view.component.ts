
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FactoryNameForOrder } from 'app/shared/models/factory-name-for-order';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { FactoryNameForOrderService } from '../shared/factory-name-for-order.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-factory-name-for-order-view',
  templateUrl: './factory-name-for-order-view.component.html',
  styleUrls: ['./factory-name-for-order-view.component.scss'],
  providers: []
})

export class FactoryNameForOrderViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedFactoryNameForOrder: FactoryNameForOrder;
  factoryNameForOrderForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedFactoryNameForOrderDialog: any,
    @Optional() public dialogRef: MatDialogRef<FactoryNameForOrderViewComponent>,
    public factoryNameForOrderService: FactoryNameForOrderService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFactoryNameForOrder = this.selectedFactoryNameForOrderDialog.data || this.selectedFactoryNameForOrder;

    

    this.factoryNameForOrderForm = this.formBuilder.group({
      
  orderNumber : [this.selectedFactoryNameForOrder.orderNumber],
  factoryName : [this.selectedFactoryNameForOrder.factoryName]
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
    return this.factoryNameForOrderForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.factoryNameForOrderForm.controls)) {
      this.factoryNameForOrderForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

