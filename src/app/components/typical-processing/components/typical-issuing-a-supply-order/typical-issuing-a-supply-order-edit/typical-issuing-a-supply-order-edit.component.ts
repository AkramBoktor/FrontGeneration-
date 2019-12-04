
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TypicalIssuingASupplyOrder } from 'app/shared/models/typical-issuing-a-supply-order';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { TypicalIssuingASupplyOrderService } from '../shared/typical-issuing-a-supply-order.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-typical-issuing-a-supply-order-edit',
  templateUrl: './typical-issuing-a-supply-order-edit.component.html',
  styleUrls: ['./typical-issuing-a-supply-order-edit.component.scss'],
  providers: []
})

export class TypicalIssuingASupplyOrderEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTypicalIssuingASupplyOrder: TypicalIssuingASupplyOrder;
  typicalIssuingASupplyOrderForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private constructionTypesService: LookupService;
private offeringTypesService: LookupService;
private processingTypesService: LookupService;
private offeringMethodsService: LookupService;
private fundingTypesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
processingTypeSelectOptions: MaterialSelectOptions;
offeringMethodSelectOptions: MaterialSelectOptions;
typeOfFundingSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringMethod', { static: true }) OfferingMethodSelectComponent: MaterialSelectComponent;
	@ViewChild('typeOfFunding', { static: true }) TypeOfFundingSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTypicalIssuingASupplyOrderDialog: any,
    @Optional() public dialogRef: MatDialogRef<TypicalIssuingASupplyOrderEditComponent>,
    public typicalIssuingASupplyOrderService: TypicalIssuingASupplyOrderService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTypicalIssuingASupplyOrder = new TypicalIssuingASupplyOrder();
    this.selectedTypicalIssuingASupplyOrder = this.selectedTypicalIssuingASupplyOrderDialog.data || this.selectedTypicalIssuingASupplyOrder;

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
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

	this.offeringMethodSelectOptions = new MaterialSelectOptions({
	 data: this.offeringMethodsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'طريقة الطرح',
	});

	this.typeOfFundingSelectOptions = new MaterialSelectOptions({
	 data: this.fundingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التمويل',
	});


    this.typicalIssuingASupplyOrderForm = this.formBuilder.group({
      
  id : [this.selectedTypicalIssuingASupplyOrder.id],
  quantity : [this.selectedTypicalIssuingASupplyOrder.quantity, [ ]],
  listName : [this.selectedTypicalIssuingASupplyOrder.listName, [ ]],
  companyName : [this.selectedTypicalIssuingASupplyOrder.companyName, [ ]],
  number : [this.selectedTypicalIssuingASupplyOrder.number, [ ]],
  yearPlan : [this.selectedTypicalIssuingASupplyOrder.yearPlan, [ ]],
  bidNumber : [this.selectedTypicalIssuingASupplyOrder.bidNumber, [ ]],
  buildingName : [this.selectedTypicalIssuingASupplyOrder.buildingName, [ ]],
  orderType : [this.selectedTypicalIssuingASupplyOrder.orderType, [ ]],
  supplyOrderDate : [this.selectedTypicalIssuingASupplyOrder.supplyOrderDate, [ ]],
  orderNumber : [this.selectedTypicalIssuingASupplyOrder.orderNumber, [ ]],
  constructionPlanYear : [this.selectedTypicalIssuingASupplyOrder.constructionPlanYear, [ ]],
  constructionType : [this.selectedTypicalIssuingASupplyOrder.constructionType, [ ]],
  offeringType : [this.selectedTypicalIssuingASupplyOrder.offeringType, [ Validators.required ]],
  processingType : [this.selectedTypicalIssuingASupplyOrder.processingType, [ ]],
  offeringMethod : [this.selectedTypicalIssuingASupplyOrder.offeringMethod, [ Validators.required ]],
  typeOfFunding : [this.selectedTypicalIssuingASupplyOrder.typeOfFunding, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.typicalIssuingASupplyOrderService.update(this.typicalIssuingASupplyOrderForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.typicalIssuingASupplyOrderService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.typicalIssuingASupplyOrderForm.get(name);
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.processingTypesService = new LookupService('processingtypes', this.http);
this.offeringMethodsService = new LookupService('offeringmethods', this.http);
this.fundingTypesService = new LookupService('fundingtypes', this.http);
  }
}
