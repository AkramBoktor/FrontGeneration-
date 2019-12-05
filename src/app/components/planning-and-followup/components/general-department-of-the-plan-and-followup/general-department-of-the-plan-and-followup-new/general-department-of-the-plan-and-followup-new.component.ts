
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GeneralDepartmentOfThePlanAndFollowup } from 'app/shared/models/general-department-of-the-plan-and-followup';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { GeneralDepartmentOfThePlanAndFollowupService } from '../shared/general-department-of-the-plan-and-followup.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-general-department-of-the-plan-and-followup-new',
  templateUrl: './general-department-of-the-plan-and-followup-new.component.html',
  styleUrls: ['./general-department-of-the-plan-and-followup-new.component.scss'],
  providers: [
    ]
})

export class GeneralDepartmentOfThePlanAndFollowupNewComponent extends AppBaseComponent implements OnInit {
  generalDepartmentOfThePlanAndFollowupForm: FormGroup;
  @Input() selectedGeneralDepartmentOfThePlanAndFollowup: GeneralDepartmentOfThePlanAndFollowup;
  errorMessages: FormControlError[] = [
        
  ];

  private governoratesService: LookupService;
private componentCodesService: LookupService;

  
governorateCodeSelectOptions: MaterialSelectOptions;
componentCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorateCode', { static: true }) GovernorateCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('componentCode', { static: true }) ComponentCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<GeneralDepartmentOfThePlanAndFollowupNewComponent>,
    public generalDepartmentOfThePlanAndFollowupService: GeneralDepartmentOfThePlanAndFollowupService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedGeneralDepartmentOfThePlanAndFollowup = new GeneralDepartmentOfThePlanAndFollowup();

    
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
     
  id : [0],
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
    this.generalDepartmentOfThePlanAndFollowupService.create(this.generalDepartmentOfThePlanAndFollowupForm.value)
        .pipe(switchMap(x => {
			return this.generalDepartmentOfThePlanAndFollowupService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.generalDepartmentOfThePlanAndFollowupForm.get(name);
    }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.componentCodesService = new LookupService('componentcodes', this.http);
  }
 }
