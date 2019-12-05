
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GeneralDepartmentOfThePlanAndFollowup } from 'app/shared/models/general-department-of-the-plan-and-followup';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { GeneralDepartmentOfThePlanAndFollowupService } from '../shared/general-department-of-the-plan-and-followup.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-general-department-of-the-plan-and-followup-view',
  templateUrl: './general-department-of-the-plan-and-followup-view.component.html',
  styleUrls: ['./general-department-of-the-plan-and-followup-view.component.scss'],
  providers: []
})

export class GeneralDepartmentOfThePlanAndFollowupViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedGeneralDepartmentOfThePlanAndFollowup: GeneralDepartmentOfThePlanAndFollowup;
  generalDepartmentOfThePlanAndFollowupForm: FormGroup;

  private governoratesService: LookupService;
private componentCodesService: LookupService;

  
governorateCodeSelectOptions: MaterialSelectOptions;
componentCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedGeneralDepartmentOfThePlanAndFollowupDialog: any,
    @Optional() public dialogRef: MatDialogRef<GeneralDepartmentOfThePlanAndFollowupViewComponent>,
    public generalDepartmentOfThePlanAndFollowupService: GeneralDepartmentOfThePlanAndFollowupService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedGeneralDepartmentOfThePlanAndFollowup = this.selectedGeneralDepartmentOfThePlanAndFollowupDialog.data || this.selectedGeneralDepartmentOfThePlanAndFollowup;

    
	this.governorateCodeSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المحافظه',
	});

	this.componentCodeSelectOptions = new MaterialSelectOptions({
	 data: this.componentCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رمز المكون',
	});


    this.generalDepartmentOfThePlanAndFollowupForm = this.formBuilder.group({
      
  yearPlan : [this.selectedGeneralDepartmentOfThePlanAndFollowup.yearPlan],
  projectode : [this.selectedGeneralDepartmentOfThePlanAndFollowup.projectode],
  sourceCode : [this.selectedGeneralDepartmentOfThePlanAndFollowup.sourceCode],
  creditValue : [this.selectedGeneralDepartmentOfThePlanAndFollowup.creditValue],
  governorateCode : [this.selectedGeneralDepartmentOfThePlanAndFollowup.governorateCode],
  componentCode : [this.selectedGeneralDepartmentOfThePlanAndFollowup.componentCode]
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
    return this.generalDepartmentOfThePlanAndFollowupForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.generalDepartmentOfThePlanAndFollowupForm.controls)) {
      this.generalDepartmentOfThePlanAndFollowupForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.componentCodesService = new LookupService('componentcodes', this.http);
  }
}

