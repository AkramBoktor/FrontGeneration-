
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { IssuingASupplyOrderForASchool } from 'app/shared/models/issuing-a-supply-order-for-a-school';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { IssuingASupplyOrderForASchoolService } from '../shared/issuing-a-supply-order-for-a-school.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-issuing-a-supply-order-for-a-school-view',
  templateUrl: './issuing-a-supply-order-for-a-school-view.component.html',
  styleUrls: ['./issuing-a-supply-order-for-a-school-view.component.scss'],
  providers: []
})

export class IssuingASupplyOrderForASchoolViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedIssuingASupplyOrderForASchool: IssuingASupplyOrderForASchool;
  issuingASupplyOrderForASchoolForm: FormGroup;

  private processingTypesService: LookupService;
private offeringTypesService: LookupService;
private offeringMethodsService: LookupService;
private constructionTypesService: LookupService;

  
processingTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
offeringMethodSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedIssuingASupplyOrderForASchoolDialog: any,
    @Optional() public dialogRef: MatDialogRef<IssuingASupplyOrderForASchoolViewComponent>,
    public issuingASupplyOrderForASchoolService: IssuingASupplyOrderForASchoolService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedIssuingASupplyOrderForASchool = this.selectedIssuingASupplyOrderForASchoolDialog.data || this.selectedIssuingASupplyOrderForASchool;

    
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
      
  yearPlan : [this.selectedIssuingASupplyOrderForASchool.yearPlan],
  bidNumber : [this.selectedIssuingASupplyOrderForASchool.bidNumber],
  orderNumber : [this.selectedIssuingASupplyOrderForASchool.orderNumber],
  supplyOrderDate : [this.selectedIssuingASupplyOrderForASchool.supplyOrderDate],
  orderType : [this.selectedIssuingASupplyOrderForASchool.orderType],
  constructionPlanYear : [this.selectedIssuingASupplyOrderForASchool.constructionPlanYear],
  buildingName : [this.selectedIssuingASupplyOrderForASchool.buildingName],
  number : [this.selectedIssuingASupplyOrderForASchool.number],
  companyName : [this.selectedIssuingASupplyOrderForASchool.companyName],
  listName : [this.selectedIssuingASupplyOrderForASchool.listName],
  quantity : [this.selectedIssuingASupplyOrderForASchool.quantity],
  processingType : [this.selectedIssuingASupplyOrderForASchool.processingType],
  offeringType : [this.selectedIssuingASupplyOrderForASchool.offeringType],
  offeringMethod : [this.selectedIssuingASupplyOrderForASchool.offeringMethod],
  constructionType : [this.selectedIssuingASupplyOrderForASchool.constructionType]
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
    return this.issuingASupplyOrderForASchoolForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.issuingASupplyOrderForASchoolForm.controls)) {
      this.issuingASupplyOrderForASchoolForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.offeringMethodsService = new LookupService('offeringmethods', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
}

