
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { TypicalDeliveryDateForASupplyOrder } from 'app/shared/models/typical-delivery-date-for-a-supply-order';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TypicalDeliveryDateForASupplyOrderService } from '../shared/typical-delivery-date-for-a-supply-order.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-typical-delivery-date-for-a-supply-order-new',
  templateUrl: './typical-delivery-date-for-a-supply-order-new.component.html',
  styleUrls: ['./typical-delivery-date-for-a-supply-order-new.component.scss'],
  providers: [
    ]
})

export class TypicalDeliveryDateForASupplyOrderNewComponent extends AppBaseComponent implements OnInit {
  typicalDeliveryDateForASupplyOrderForm: FormGroup;
  @Input() selectedTypicalDeliveryDateForASupplyOrder: TypicalDeliveryDateForASupplyOrder;
  errorMessages: FormControlError[] = [
        
  ];

  private constructionTypesService: LookupService;
private offeringMethodsService: LookupService;
private offeringTypesService: LookupService;
private processingTypesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
offeringMethodSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
processingTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringMethod', { static: true }) OfferingMethodSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<TypicalDeliveryDateForASupplyOrderNewComponent>,
    public typicalDeliveryDateForASupplyOrderService: TypicalDeliveryDateForASupplyOrderService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTypicalDeliveryDateForASupplyOrder = new TypicalDeliveryDateForASupplyOrder();

    
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
     
  id : [0],
  deliveryDate : [this.selectedTypicalDeliveryDateForASupplyOrder.deliveryDate, [ ]],
  campanyName : [this.selectedTypicalDeliveryDateForASupplyOrder.campanyName, [ ]],
  annexNumber : [this.selectedTypicalDeliveryDateForASupplyOrder.annexNumber, [ ]],
  buildingName : [this.selectedTypicalDeliveryDateForASupplyOrder.buildingName, [ ]],
  constructionPlanYear : [this.selectedTypicalDeliveryDateForASupplyOrder.constructionPlanYear, [ ]],
  supplyOrderDate : [this.selectedTypicalDeliveryDateForASupplyOrder.supplyOrderDate, [ ]],
  orderNumber : [this.selectedTypicalDeliveryDateForASupplyOrder.orderNumber, [ ]],
  bidNumber : [this.selectedTypicalDeliveryDateForASupplyOrder.bidNumber, [ ]],
  yearPlan : [this.selectedTypicalDeliveryDateForASupplyOrder.yearPlan, [ ]],
  constructionType : [this.selectedTypicalDeliveryDateForASupplyOrder.constructionType, [ ]],
  offeringMethod : [this.selectedTypicalDeliveryDateForASupplyOrder.offeringMethod, [ ]],
  offeringType : [this.selectedTypicalDeliveryDateForASupplyOrder.offeringType, [ ]],
  processingType : [this.selectedTypicalDeliveryDateForASupplyOrder.processingType, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.typicalDeliveryDateForASupplyOrderService.create(this.typicalDeliveryDateForASupplyOrderForm.value)
        .pipe(switchMap(x => {
			return this.typicalDeliveryDateForASupplyOrderService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.typicalDeliveryDateForASupplyOrderForm.get(name);
    }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.offeringMethodsService = new LookupService('offeringmethods', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.processingTypesService = new LookupService('processingtypes', this.http);
  }
 }
