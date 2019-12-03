
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FactoryNameForOrder } from 'app/shared/models/factory-name-for-order';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FactoryNameForOrderService } from '../shared/factory-name-for-order.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-factory-name-for-order-new',
  templateUrl: './factory-name-for-order-new.component.html',
  styleUrls: ['./factory-name-for-order-new.component.scss'],
  providers: [
    ]
})

export class FactoryNameForOrderNewComponent extends AppBaseComponent implements OnInit {
  factoryNameForOrderForm: FormGroup;
  @Input() selectedFactoryNameForOrder: FactoryNameForOrder;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<FactoryNameForOrderNewComponent>,
    public factoryNameForOrderService: FactoryNameForOrderService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFactoryNameForOrder = new FactoryNameForOrder();

    

    this.factoryNameForOrderForm = this.formBuilder.group({
     
  id : [0],
  orderNumber : [this.selectedFactoryNameForOrder.orderNumber, [ Validators.required ]],
  factoryName : [this.selectedFactoryNameForOrder.factoryName, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.factoryNameForOrderService.create(this.factoryNameForOrderForm.value)
        .pipe(switchMap(x => {
			return this.factoryNameForOrderService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.factoryNameForOrderForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
