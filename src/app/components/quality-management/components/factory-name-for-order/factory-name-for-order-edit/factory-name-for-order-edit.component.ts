
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { FactoryNameForOrder } from 'app/shared/models/factory-name-for-order';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { FactoryNameForOrderService } from '../shared/factory-name-for-order.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-factory-name-for-order-edit',
  templateUrl: './factory-name-for-order-edit.component.html',
  styleUrls: ['./factory-name-for-order-edit.component.scss'],
  providers: []
})

export class FactoryNameForOrderEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedFactoryNameForOrder: FactoryNameForOrder;
  factoryNameForOrderForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedFactoryNameForOrderDialog: any,
    @Optional() public dialogRef: MatDialogRef<FactoryNameForOrderEditComponent>,
    public factoryNameForOrderService: FactoryNameForOrderService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFactoryNameForOrder = new FactoryNameForOrder();
    this.selectedFactoryNameForOrder = this.selectedFactoryNameForOrderDialog.data || this.selectedFactoryNameForOrder;

    

    this.factoryNameForOrderForm = this.formBuilder.group({
      
  id : [this.selectedFactoryNameForOrder.id],
  orderNumber : [this.selectedFactoryNameForOrder.orderNumber, [ Validators.required ]],
  factoryName : [this.selectedFactoryNameForOrder.factoryName, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.factoryNameForOrderService.update(this.factoryNameForOrderForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.factoryNameForOrderService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.factoryNameForOrderForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
