
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { Promotion } from 'app/shared/models/promotion';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PromotionService } from '../shared/promotion.service';

@Component({
  selector: 'app-promotion-view',
  templateUrl: './promotion-view.component.html',
  styleUrls: ['./promotion-view.component.scss'],
  providers: []
})

export class PromotionViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPromotion: Promotion;
  promotionForm: FormGroup;

  private financialDegreesService: LookupService;
private jobTypesService: LookupService;
 

  
financialDegreeSelectOptions: MaterialSelectOptions;
jobTitleSelectOptions: MaterialSelectOptions;
preFinancialDegreeSelectOptions: MaterialSelectOptions;
previousJobTitleSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPromotionDialog: any,
    @Optional() public dialogRef: MatDialogRef<PromotionViewComponent>,
    public promotionService: PromotionService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPromotion = this.selectedPromotionDialog.data || this.selectedPromotion;

    
	this.financialDegreeSelectOptions = new MaterialSelectOptions({
	 data: this.financialDegreesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الدرجة المالية',
	});

	this.jobTitleSelectOptions = new MaterialSelectOptions({
	 data: this.jobTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوظيفة',
	});

	this.preFinancialDegreeSelectOptions = new MaterialSelectOptions({
	 data: this.financialDegreesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الدرجة المالية السابقة',
	});

	this.previousJobTitleSelectOptions = new MaterialSelectOptions({
	 data: this.jobTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوظيفة السابقة',
	});


    this.promotionForm = this.formBuilder.group({
      
  employeeCode : [this.selectedPromotion.employeeCode],
  promotionDate : [this.selectedPromotion.promotionDate],
  jobDate : [this.selectedPromotion.jobDate],
  previousJobDate : [this.selectedPromotion.previousJobDate],
  financialDegree : [this.selectedPromotion.financialDegree],
  jobTitle : [this.selectedPromotion.jobTitle],
  preFinancialDegree : [this.selectedPromotion.preFinancialDegree],
  previousJobTitle : [this.selectedPromotion.previousJobTitle]
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
    return this.promotionForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.promotionForm.controls)) {
      this.promotionForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.financialDegreesService = new LookupService('financialdegrees', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
this.financialDegreesService = new LookupService('financialdegrees', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
  }
}

