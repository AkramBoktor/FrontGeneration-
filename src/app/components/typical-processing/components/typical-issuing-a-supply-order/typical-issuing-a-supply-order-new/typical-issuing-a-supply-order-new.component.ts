
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { TypicalIssuingASupplyOrder } from 'app/shared/models/typical-issuing-a-supply-order';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TypicalIssuingASupplyOrderService } from '../shared/typical-issuing-a-supply-order.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-typical-issuing-a-supply-order-new',
  templateUrl: './typical-issuing-a-supply-order-new.component.html',
  styleUrls: ['./typical-issuing-a-supply-order-new.component.scss'],
  providers: [
    ]
})

export class TypicalIssuingASupplyOrderNewComponent extends AppBaseComponent implements OnInit {
  typicalIssuingASupplyOrderForm: FormGroup;
  @Input() selectedTypicalIssuingASupplyOrder: TypicalIssuingASupplyOrder;
  errorMessages: FormControlError[] = [
        
  ];

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

  
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringMethod', { static: true }) OfferingMethodSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('typeOfFunding', { static: true }) TypeOfFundingSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<TypicalIssuingASupplyOrderNewComponent>,
    public typicalIssuingASupplyOrderService: TypicalIssuingASupplyOrderService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTypicalIssuingASupplyOrder = new TypicalIssuingASupplyOrder();

    
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
     
  id : [0],
  orderNumber : [this.selectedTypicalIssuingASupplyOrder.orderNumber, [ ]],
  supplyOrderDate : [this.selectedTypicalIssuingASupplyOrder.supplyOrderDate, [ ]],
  orderType : [this.selectedTypicalIssuingASupplyOrder.orderType, [ ]],
  yearPlan : [this.selectedTypicalIssuingASupplyOrder.yearPlan, [ ]],
  constructionPlanYear : [this.selectedTypicalIssuingASupplyOrder.constructionPlanYear, [ ]],
  buildingName : [this.selectedTypicalIssuingASupplyOrder.buildingName, [ ]],
  quantity : [this.selectedTypicalIssuingASupplyOrder.quantity, [ ]],
  listName : [this.selectedTypicalIssuingASupplyOrder.listName, [ ]],
  companyName : [this.selectedTypicalIssuingASupplyOrder.companyName, [ ]],
  number : [this.selectedTypicalIssuingASupplyOrder.number, [ ]],
  bidNumber : [this.selectedTypicalIssuingASupplyOrder.bidNumber, [ ]],
  processingType : [this.selectedTypicalIssuingASupplyOrder.processingType, [ ]],
  offeringType : [this.selectedTypicalIssuingASupplyOrder.offeringType, [ Validators.required ]],
  offeringMethod : [this.selectedTypicalIssuingASupplyOrder.offeringMethod, [ Validators.required ]],
  constructionType : [this.selectedTypicalIssuingASupplyOrder.constructionType, [ ]],
  typeOfFunding : [this.selectedTypicalIssuingASupplyOrder.typeOfFunding, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.typicalIssuingASupplyOrderService.create(this.typicalIssuingASupplyOrderForm.value)
        .pipe(switchMap(x => {
			return this.typicalIssuingASupplyOrderService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.typicalIssuingASupplyOrderForm.get(name);
    }

  initializeLookupServices() {
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.offeringMethodsService = new LookupService('offeringmethods', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.fundingTypesService = new LookupService('fundingtypes', this.http);
  }
 }
