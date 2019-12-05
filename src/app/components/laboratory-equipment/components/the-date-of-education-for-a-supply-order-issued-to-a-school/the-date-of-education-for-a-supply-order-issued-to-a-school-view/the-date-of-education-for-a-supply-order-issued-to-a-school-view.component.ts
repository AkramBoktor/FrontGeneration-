
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { TheDateOfEducationForASupplyOrderIssuedToASchool } from 'app/shared/models/the-date-of-education-for-a-supply-order-issued-to-a-school';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { TheDateOfEducationForASupplyOrderIssuedToASchoolService } from '../shared/the-date-of-education-for-a-supply-order-issued-to-a-school.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-the-date-of-education-for-a-supply-order-issued-to-a-school-view',
  templateUrl: './the-date-of-education-for-a-supply-order-issued-to-a-school-view.component.html',
  styleUrls: ['./the-date-of-education-for-a-supply-order-issued-to-a-school-view.component.scss'],
  providers: []
})

export class TheDateOfEducationForASupplyOrderIssuedToASchoolViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTheDateOfEducationForASupplyOrderIssuedToASchool: TheDateOfEducationForASupplyOrderIssuedToASchool;
  theDateOfEducationForASupplyOrderIssuedToASchoolForm: FormGroup;

  private processingTypesService: LookupService;
private offeringTypesService: LookupService;
private offeringMethodsService: LookupService;
private constructionTypesService: LookupService;

  
processingTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
offeringMethodSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTheDateOfEducationForASupplyOrderIssuedToASchoolDialog: any,
    @Optional() public dialogRef: MatDialogRef<TheDateOfEducationForASupplyOrderIssuedToASchoolViewComponent>,
    public theDateOfEducationForASupplyOrderIssuedToASchoolService: TheDateOfEducationForASupplyOrderIssuedToASchoolService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTheDateOfEducationForASupplyOrderIssuedToASchool = this.selectedTheDateOfEducationForASupplyOrderIssuedToASchoolDialog.data || this.selectedTheDateOfEducationForASupplyOrderIssuedToASchool;

    
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
      
  yearPlan : [this.selectedTheDateOfEducationForASupplyOrderIssuedToASchool.yearPlan],
  bidNumber : [this.selectedTheDateOfEducationForASupplyOrderIssuedToASchool.bidNumber],
  orderNumber : [this.selectedTheDateOfEducationForASupplyOrderIssuedToASchool.orderNumber],
  supplyOrderDate : [this.selectedTheDateOfEducationForASupplyOrderIssuedToASchool.supplyOrderDate],
  constructionPlanYear : [this.selectedTheDateOfEducationForASupplyOrderIssuedToASchool.constructionPlanYear],
  buildingName : [this.selectedTheDateOfEducationForASupplyOrderIssuedToASchool.buildingName],
  annexNumber : [this.selectedTheDateOfEducationForASupplyOrderIssuedToASchool.annexNumber],
  campanyName : [this.selectedTheDateOfEducationForASupplyOrderIssuedToASchool.campanyName],
  deliveryDate : [this.selectedTheDateOfEducationForASupplyOrderIssuedToASchool.deliveryDate],
  processingType : [this.selectedTheDateOfEducationForASupplyOrderIssuedToASchool.processingType],
  offeringType : [this.selectedTheDateOfEducationForASupplyOrderIssuedToASchool.offeringType],
  offeringMethod : [this.selectedTheDateOfEducationForASupplyOrderIssuedToASchool.offeringMethod],
  constructionType : [this.selectedTheDateOfEducationForASupplyOrderIssuedToASchool.constructionType]
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
    return this.theDateOfEducationForASupplyOrderIssuedToASchoolForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.theDateOfEducationForASupplyOrderIssuedToASchoolForm.controls)) {
      this.theDateOfEducationForASupplyOrderIssuedToASchoolForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.offeringMethodsService = new LookupService('offeringmethods', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
}

