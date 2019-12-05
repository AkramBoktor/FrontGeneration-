
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { IssuingASupplyOrderForASchool } from 'app/shared/models/issuing-a-supply-order-for-a-school';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { IssuingASupplyOrderForASchoolService } from '../shared/issuing-a-supply-order-for-a-school.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-issuing-a-supply-order-for-a-school-new',
  templateUrl: './issuing-a-supply-order-for-a-school-new.component.html',
  styleUrls: ['./issuing-a-supply-order-for-a-school-new.component.scss'],
  providers: [
    ]
})

export class IssuingASupplyOrderForASchoolNewComponent extends AppBaseComponent implements OnInit {
  issuingASupplyOrderForASchoolForm: FormGroup;
  @Input() selectedIssuingASupplyOrderForASchool: IssuingASupplyOrderForASchool;
  errorMessages: FormControlError[] = [
        
  ];

  private processingTypesService: LookupService;
private offeringTypesService: LookupService;
private offeringMethodsService: LookupService;
private constructionTypesService: LookupService;

  
processingTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
offeringMethodSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringMethod', { static: true }) OfferingMethodSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<IssuingASupplyOrderForASchoolNewComponent>,
    public issuingASupplyOrderForASchoolService: IssuingASupplyOrderForASchoolService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedIssuingASupplyOrderForASchool = new IssuingASupplyOrderForASchool();

    
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


    this.issuingASupplyOrderForASchoolForm = this.formBuilder.group({
     
  id : [0],
  yearPlan : [this.selectedIssuingASupplyOrderForASchool.yearPlan, [ ]],
  bidNumber : [this.selectedIssuingASupplyOrderForASchool.bidNumber, [ ]],
  orderNumber : [this.selectedIssuingASupplyOrderForASchool.orderNumber, [ ]],
  supplyOrderDate : [this.selectedIssuingASupplyOrderForASchool.supplyOrderDate, [ ]],
  orderType : [this.selectedIssuingASupplyOrderForASchool.orderType, [ ]],
  constructionPlanYear : [this.selectedIssuingASupplyOrderForASchool.constructionPlanYear, [ ]],
  buildingName : [this.selectedIssuingASupplyOrderForASchool.buildingName, [ ]],
  number : [this.selectedIssuingASupplyOrderForASchool.number, [ ]],
  companyName : [this.selectedIssuingASupplyOrderForASchool.companyName, [ ]],
  listName : [this.selectedIssuingASupplyOrderForASchool.listName, [ ]],
  quantity : [this.selectedIssuingASupplyOrderForASchool.quantity, [ ]],
  processingType : [this.selectedIssuingASupplyOrderForASchool.processingType, [ ]],
  offeringType : [this.selectedIssuingASupplyOrderForASchool.offeringType, [ Validators.required ]],
  offeringMethod : [this.selectedIssuingASupplyOrderForASchool.offeringMethod, [ Validators.required ]],
  constructionType : [this.selectedIssuingASupplyOrderForASchool.constructionType, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.issuingASupplyOrderForASchoolService.create(this.issuingASupplyOrderForASchoolForm.value)
        .pipe(switchMap(x => {
			return this.issuingASupplyOrderForASchoolService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.issuingASupplyOrderForASchoolForm.get(name);
    }

  initializeLookupServices() {
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.offeringMethodsService = new LookupService('offeringmethods', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
 }
