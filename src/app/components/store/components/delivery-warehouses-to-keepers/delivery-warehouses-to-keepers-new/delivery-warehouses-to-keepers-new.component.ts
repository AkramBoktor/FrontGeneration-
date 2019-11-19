
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { DeliveryWarehousesToKeepers } from 'app/shared/models/delivery-warehouses-to-keepers';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DeliveryWarehousesToKeepersService } from '../shared/delivery-warehouses-to-keepers.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-delivery-warehouses-to-keepers-new',
  templateUrl: './delivery-warehouses-to-keepers-new.component.html',
  styleUrls: ['./delivery-warehouses-to-keepers-new.component.scss'],
  providers: [
    ]
})

export class DeliveryWarehousesToKeepersNewComponent extends AppBaseComponent implements OnInit {
  deliveryWarehousesToKeepersForm: FormGroup;
  @Input() selectedDeliveryWarehousesToKeepers: DeliveryWarehousesToKeepers;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<DeliveryWarehousesToKeepersNewComponent>,
    public deliveryWarehousesToKeepersService: DeliveryWarehousesToKeepersService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDeliveryWarehousesToKeepers = new DeliveryWarehousesToKeepers();

    

    this.deliveryWarehousesToKeepersForm = this.formBuilder.group({
     
  id : [0],
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
    this.deliveryWarehousesToKeepersService.create(this.deliveryWarehousesToKeepersForm.value)
        .pipe(switchMap(x => {
			return this.deliveryWarehousesToKeepersService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.deliveryWarehousesToKeepersForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
