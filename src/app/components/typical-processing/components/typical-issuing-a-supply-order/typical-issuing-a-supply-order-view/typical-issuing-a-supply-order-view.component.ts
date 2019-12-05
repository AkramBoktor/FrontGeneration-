
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { TypicalIssuingASupplyOrder } from 'app/shared/models/typical-issuing-a-supply-order';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { TypicalIssuingASupplyOrderService } from '../shared/typical-issuing-a-supply-order.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-typical-issuing-a-supply-order-view',
  templateUrl: './typical-issuing-a-supply-order-view.component.html',
  styleUrls: ['./typical-issuing-a-supply-order-view.component.scss'],
  providers: []
})

export class TypicalIssuingASupplyOrderViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTypicalIssuingASupplyOrder: TypicalIssuingASupplyOrder;
  typicalIssuingASupplyOrderForm: FormGroup;

  private processingTypesService: LookupService;
private offeringTypesService: LookupService;
private offeringMethodsService: LookupService;
private constructionTypesService: LookupService;
private fundingTypesService: LookupService;

  
processingTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
offeringMethodSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
typeOfFundingSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTypicalIssuingASupplyOrderDialog: any,
    @Optional() public dialogRef: MatDialogRef<TypicalIssuingASupplyOrderViewComponent>,
    public typicalIssuingASupplyOrderService: TypicalIssuingASupplyOrderService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTypicalIssuingASupplyOrder = this.selectedTypicalIssuingASupplyOrderDialog.data || this.selectedTypicalIssuingASupplyOrder;

    
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

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.typeOfFundingSelectOptions = new MaterialSelectOptions({
	 data: this.fundingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التمويل',
	});


    this.typicalIssuingASupplyOrderForm = this.formBuilder.group({
      
  orderNumber : [this.selectedTypicalIssuingASupplyOrder.orderNumber],
  supplyOrderDate : [this.selectedTypicalIssuingASupplyOrder.supplyOrderDate],
  orderType : [this.selectedTypicalIssuingASupplyOrder.orderType],
  yearPlan : [this.selectedTypicalIssuingASupplyOrder.yearPlan],
  constructionPlanYear : [this.selectedTypicalIssuingASupplyOrder.constructionPlanYear],
  buildingName : [this.selectedTypicalIssuingASupplyOrder.buildingName],
  quantity : [this.selectedTypicalIssuingASupplyOrder.quantity],
  listName : [this.selectedTypicalIssuingASupplyOrder.listName],
  companyName : [this.selectedTypicalIssuingASupplyOrder.companyName],
  number : [this.selectedTypicalIssuingASupplyOrder.number],
  bidNumber : [this.selectedTypicalIssuingASupplyOrder.bidNumber],
  processingType : [this.selectedTypicalIssuingASupplyOrder.processingType],
  offeringType : [this.selectedTypicalIssuingASupplyOrder.offeringType],
  offeringMethod : [this.selectedTypicalIssuingASupplyOrder.offeringMethod],
  constructionType : [this.selectedTypicalIssuingASupplyOrder.constructionType],
  typeOfFunding : [this.selectedTypicalIssuingASupplyOrder.typeOfFunding]
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
    return this.typicalIssuingASupplyOrderForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.typicalIssuingASupplyOrderForm.controls)) {
      this.typicalIssuingASupplyOrderForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.offeringMethodsService = new LookupService('offeringmethods', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.fundingTypesService = new LookupService('fundingtypes', this.http);
  }
}

