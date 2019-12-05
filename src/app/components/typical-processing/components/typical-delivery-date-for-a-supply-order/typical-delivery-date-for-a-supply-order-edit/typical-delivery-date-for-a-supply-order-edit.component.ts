
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TypicalDeliveryDateForASupplyOrder } from 'app/shared/models/typical-delivery-date-for-a-supply-order';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { TypicalDeliveryDateForASupplyOrderService } from '../shared/typical-delivery-date-for-a-supply-order.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-typical-delivery-date-for-a-supply-order-edit',
  templateUrl: './typical-delivery-date-for-a-supply-order-edit.component.html',
  styleUrls: ['./typical-delivery-date-for-a-supply-order-edit.component.scss'],
  providers: []
})

export class TypicalDeliveryDateForASupplyOrderEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTypicalDeliveryDateForASupplyOrder: TypicalDeliveryDateForASupplyOrder;
  typicalDeliveryDateForASupplyOrderForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private constructionTypesService: LookupService;
private processingTypesService: LookupService;
private offeringTypesService: LookupService;
private offeringMethodsService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
processingTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
offeringMethodSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringMethod', { static: true }) OfferingMethodSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTypicalDeliveryDateForASupplyOrderDialog: any,
    @Optional() public dialogRef: MatDialogRef<TypicalDeliveryDateForASupplyOrderEditComponent>,
    public typicalDeliveryDateForASupplyOrderService: TypicalDeliveryDateForASupplyOrderService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTypicalDeliveryDateForASupplyOrder = new TypicalDeliveryDateForASupplyOrder();
    this.selectedTypicalDeliveryDateForASupplyOrder = this.selectedTypicalDeliveryDateForASupplyOrderDialog.data || this.selectedTypicalDeliveryDateForASupplyOrder;

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.processingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.processingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التجهيز',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.offeringMethodSelectOptions = new MaterialSelectOptions({
	 data: this.offeringMethodsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'طريقة الطرح',
	});


    this.typicalDeliveryDateForASupplyOrderForm = this.formBuilder.group({
      
  id : [this.selectedTypicalDeliveryDateForASupplyOrder.id],
  yearPlan : [this.selectedTypicalDeliveryDateForASupplyOrder.yearPlan, [ ]],
  bidNumber : [this.selectedTypicalDeliveryDateForASupplyOrder.bidNumber, [ ]],
  deliveryDate : [this.selectedTypicalDeliveryDateForASupplyOrder.deliveryDate, [ ]],
  campanyName : [this.selectedTypicalDeliveryDateForASupplyOrder.campanyName, [ ]],
  annexNumber : [this.selectedTypicalDeliveryDateForASupplyOrder.annexNumber, [ ]],
  buildingName : [this.selectedTypicalDeliveryDateForASupplyOrder.buildingName, [ ]],
  constructionPlanYear : [this.selectedTypicalDeliveryDateForASupplyOrder.constructionPlanYear, [ ]],
  supplyOrderDate : [this.selectedTypicalDeliveryDateForASupplyOrder.supplyOrderDate, [ ]],
  orderNumber : [this.selectedTypicalDeliveryDateForASupplyOrder.orderNumber, [ ]],
  constructionType : [this.selectedTypicalDeliveryDateForASupplyOrder.constructionType, [ ]],
  processingType : [this.selectedTypicalDeliveryDateForASupplyOrder.processingType, [ ]],
  offeringType : [this.selectedTypicalDeliveryDateForASupplyOrder.offeringType, [ ]],
  offeringMethod : [this.selectedTypicalDeliveryDateForASupplyOrder.offeringMethod, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.typicalDeliveryDateForASupplyOrderService.update(this.typicalDeliveryDateForASupplyOrderForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.typicalDeliveryDateForASupplyOrderService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.typicalDeliveryDateForASupplyOrderForm.get(name);
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.processingTypesService = new LookupService('processingtypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.offeringMethodsService = new LookupService('offeringmethods', this.http);
  }
}
