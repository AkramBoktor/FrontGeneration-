
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { TheDateOfEducationForASupplyOrderIssuedToASchool } from 'app/shared/models/the-date-of-education-for-a-supply-order-issued-to-a-school';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TheDateOfEducationForASupplyOrderIssuedToASchoolService } from '../shared/the-date-of-education-for-a-supply-order-issued-to-a-school.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-the-date-of-education-for-a-supply-order-issued-to-a-school-new',
  templateUrl: './the-date-of-education-for-a-supply-order-issued-to-a-school-new.component.html',
  styleUrls: ['./the-date-of-education-for-a-supply-order-issued-to-a-school-new.component.scss'],
  providers: [
    ]
})

export class TheDateOfEducationForASupplyOrderIssuedToASchoolNewComponent extends AppBaseComponent implements OnInit {
  theDateOfEducationForASupplyOrderIssuedToASchoolForm: FormGroup;
  @Input() selectedTheDateOfEducationForASupplyOrderIssuedToASchool: TheDateOfEducationForASupplyOrderIssuedToASchool;
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
    @Optional() public dialogRef: MatDialogRef<TheDateOfEducationForASupplyOrderIssuedToASchoolNewComponent>,
    public theDateOfEducationForASupplyOrderIssuedToASchoolService: TheDateOfEducationForASupplyOrderIssuedToASchoolService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTheDateOfEducationForASupplyOrderIssuedToASchool = new TheDateOfEducationForASupplyOrderIssuedToASchool();

    
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


    this.theDateOfEducationForASupplyOrderIssuedToASchoolForm = this.formBuilder.group({
     
  id : [0],
  yearPlan : [this.selectedTheDateOfEducationForASupplyOrderIssuedToASchool.yearPlan, [ ]],
  bidNumber : [this.selectedTheDateOfEducationForASupplyOrderIssuedToASchool.bidNumber, [ ]],
  orderNumber : [this.selectedTheDateOfEducationForASupplyOrderIssuedToASchool.orderNumber, [ ]],
  supplyOrderDate : [this.selectedTheDateOfEducationForASupplyOrderIssuedToASchool.supplyOrderDate, [ ]],
  constructionPlanYear : [this.selectedTheDateOfEducationForASupplyOrderIssuedToASchool.constructionPlanYear, [ ]],
  buildingName : [this.selectedTheDateOfEducationForASupplyOrderIssuedToASchool.buildingName, [ ]],
  annexNumber : [this.selectedTheDateOfEducationForASupplyOrderIssuedToASchool.annexNumber, [ ]],
  campanyName : [this.selectedTheDateOfEducationForASupplyOrderIssuedToASchool.campanyName, [ ]],
  deliveryDate : [this.selectedTheDateOfEducationForASupplyOrderIssuedToASchool.deliveryDate, [ ]],
  processingType : [this.selectedTheDateOfEducationForASupplyOrderIssuedToASchool.processingType, [ ]],
  offeringType : [this.selectedTheDateOfEducationForASupplyOrderIssuedToASchool.offeringType, [ ]],
  offeringMethod : [this.selectedTheDateOfEducationForASupplyOrderIssuedToASchool.offeringMethod, [ ]],
  constructionType : [this.selectedTheDateOfEducationForASupplyOrderIssuedToASchool.constructionType, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.theDateOfEducationForASupplyOrderIssuedToASchoolService.create(this.theDateOfEducationForASupplyOrderIssuedToASchoolForm.value)
        .pipe(switchMap(x => {
			return this.theDateOfEducationForASupplyOrderIssuedToASchoolService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.theDateOfEducationForASupplyOrderIssuedToASchoolForm.get(name);
    }

  initializeLookupServices() {
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.offeringMethodsService = new LookupService('offeringmethods', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
 }
