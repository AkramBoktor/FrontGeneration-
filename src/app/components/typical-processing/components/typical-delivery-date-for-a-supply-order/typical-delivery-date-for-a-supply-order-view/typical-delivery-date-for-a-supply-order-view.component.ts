
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { TypicalDeliveryDateForASupplyOrder } from 'app/shared/models/typical-delivery-date-for-a-supply-order';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { TypicalDeliveryDateForASupplyOrderService } from '../shared/typical-delivery-date-for-a-supply-order.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-typical-delivery-date-for-a-supply-order-view',
  templateUrl: './typical-delivery-date-for-a-supply-order-view.component.html',
  styleUrls: ['./typical-delivery-date-for-a-supply-order-view.component.scss'],
  providers: []
})

export class TypicalDeliveryDateForASupplyOrderViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTypicalDeliveryDateForASupplyOrder: TypicalDeliveryDateForASupplyOrder;
  typicalDeliveryDateForASupplyOrderForm: FormGroup;

  private constructionTypesService: LookupService;
private offeringMethodsService: LookupService;
private offeringTypesService: LookupService;
private processingTypesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
offeringMethodSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
processingTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTypicalDeliveryDateForASupplyOrderDialog: any,
    @Optional() public dialogRef: MatDialogRef<TypicalDeliveryDateForASupplyOrderViewComponent>,
    public typicalDeliveryDateForASupplyOrderService: TypicalDeliveryDateForASupplyOrderService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTypicalDeliveryDateForASupplyOrder = this.selectedTypicalDeliveryDateForASupplyOrderDialog.data || this.selectedTypicalDeliveryDateForASupplyOrder;

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.offeringMethodSelectOptions = new MaterialSelectOptions({
	 data: this.offeringMethodsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'طريقة الطرح',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.processingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.processingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التجهيز',
	});


    this.typicalDeliveryDateForASupplyOrderForm = this.formBuilder.group({
      
  deliveryDate : [this.selectedTypicalDeliveryDateForASupplyOrder.deliveryDate],
  campanyName : [this.selectedTypicalDeliveryDateForASupplyOrder.campanyName],
  annexNumber : [this.selectedTypicalDeliveryDateForASupplyOrder.annexNumber],
  buildingName : [this.selectedTypicalDeliveryDateForASupplyOrder.buildingName],
  constructionPlanYear : [this.selectedTypicalDeliveryDateForASupplyOrder.constructionPlanYear],
  supplyOrderDate : [this.selectedTypicalDeliveryDateForASupplyOrder.supplyOrderDate],
  orderNumber : [this.selectedTypicalDeliveryDateForASupplyOrder.orderNumber],
  bidNumber : [this.selectedTypicalDeliveryDateForASupplyOrder.bidNumber],
  yearPlan : [this.selectedTypicalDeliveryDateForASupplyOrder.yearPlan],
  constructionType : [this.selectedTypicalDeliveryDateForASupplyOrder.constructionType],
  offeringMethod : [this.selectedTypicalDeliveryDateForASupplyOrder.offeringMethod],
  offeringType : [this.selectedTypicalDeliveryDateForASupplyOrder.offeringType],
  processingType : [this.selectedTypicalDeliveryDateForASupplyOrder.processingType]
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
    return this.typicalDeliveryDateForASupplyOrderForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.typicalDeliveryDateForASupplyOrderForm.controls)) {
      this.typicalDeliveryDateForASupplyOrderForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.offeringMethodsService = new LookupService('offeringmethods', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.processingTypesService = new LookupService('processingtypes', this.http);
  }
}

