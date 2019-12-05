
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { GeneralDepartmentOfThePlanAndFollowup } from 'app/shared/models/general-department-of-the-plan-and-followup';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { GeneralDepartmentOfThePlanAndFollowupService } from '../shared/general-department-of-the-plan-and-followup.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-general-department-of-the-plan-and-followup-edit',
  templateUrl: './general-department-of-the-plan-and-followup-edit.component.html',
  styleUrls: ['./general-department-of-the-plan-and-followup-edit.component.scss'],
  providers: []
})

export class GeneralDepartmentOfThePlanAndFollowupEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedGeneralDepartmentOfThePlanAndFollowup: GeneralDepartmentOfThePlanAndFollowup;
  generalDepartmentOfThePlanAndFollowupForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private governoratesService: LookupService;
private componentCodesService: LookupService;

  
governorateCodeSelectOptions: MaterialSelectOptions;
componentCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorateCode', { static: true }) GovernorateCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('componentCode', { static: true }) ComponentCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedGeneralDepartmentOfThePlanAndFollowupDialog: any,
    @Optional() public dialogRef: MatDialogRef<GeneralDepartmentOfThePlanAndFollowupEditComponent>,
    public generalDepartmentOfThePlanAndFollowupService: GeneralDepartmentOfThePlanAndFollowupService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedGeneralDepartmentOfThePlanAndFollowup = new GeneralDepartmentOfThePlanAndFollowup();
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
      
  id : [this.selectedGeneralDepartmentOfThePlanAndFollowup.id],
  yearPlan : [this.selectedGeneralDepartmentOfThePlanAndFollowup.yearPlan, [ Validators.required ]],
  projectode : [this.selectedGeneralDepartmentOfThePlanAndFollowup.projectode, [ Validators.required ]],
  sourceCode : [this.selectedGeneralDepartmentOfThePlanAndFollowup.sourceCode, [ Validators.required ]],
  creditValue : [this.selectedGeneralDepartmentOfThePlanAndFollowup.creditValue, [ Validators.required ]],
  governorateCode : [this.selectedGeneralDepartmentOfThePlanAndFollowup.governorateCode, [ Validators.required ]],
  componentCode : [this.selectedGeneralDepartmentOfThePlanAndFollowup.componentCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.generalDepartmentOfThePlanAndFollowupService.update(this.generalDepartmentOfThePlanAndFollowupForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.generalDepartmentOfThePlanAndFollowupService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.generalDepartmentOfThePlanAndFollowupForm.get(name);
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.componentCodesService = new LookupService('componentcodes', this.http);
  }
}
