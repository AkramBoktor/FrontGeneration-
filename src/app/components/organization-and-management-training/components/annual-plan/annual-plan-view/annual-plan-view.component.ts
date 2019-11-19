
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { AnnualPlan } from 'app/shared/models/annual-plan';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AnnualPlanService } from '../shared/annual-plan.service';

@Component({
  selector: 'app-annual-plan-view',
  templateUrl: './annual-plan-view.component.html',
  styleUrls: ['./annual-plan-view.component.scss'],
  providers: []
})

export class AnnualPlanViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAnnualPlan: AnnualPlan;
  annualPlanForm: FormGroup;

  private majorClassificationsService: LookupService;
private subClassificationsService: LookupService;
private sessionDestinationCodesService: LookupService;
private areasService: LookupService;

  
majorClassificationSelectOptions: MaterialSelectOptions;
subcategorySelectOptions: MaterialSelectOptions;
courseDestinationCodeSelectOptions: MaterialSelectOptions;
administrationOrRegionSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAnnualPlanDialog: any,
    @Optional() public dialogRef: MatDialogRef<AnnualPlanViewComponent>,
    public annualPlanService: AnnualPlanService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAnnualPlan = this.selectedAnnualPlanDialog.data || this.selectedAnnualPlan;

    
	this.majorClassificationSelectOptions = new MaterialSelectOptions({
	 data: this.majorClassificationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'تصنيف رئيسى',
	});

	this.subcategorySelectOptions = new MaterialSelectOptions({
	 data: this.subClassificationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'تصنيف فرعى',
	});

	this.courseDestinationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.sessionDestinationCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود جهه الدوره',
	});

	this.administrationOrRegionSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره او المنطقه',
	});


    this.annualPlanForm = this.formBuilder.group({
      
  trainingYear : [this.selectedAnnualPlan.trainingYear],
  courseCode : [this.selectedAnnualPlan.courseCode],
  serialSession : [this.selectedAnnualPlan.serialSession],
  candidatesNumber : [this.selectedAnnualPlan.candidatesNumber],
  majorClassification : [this.selectedAnnualPlan.majorClassification],
  subcategory : [this.selectedAnnualPlan.subcategory],
  courseDestinationCode : [this.selectedAnnualPlan.courseDestinationCode],
  administrationOrRegion : [this.selectedAnnualPlan.administrationOrRegion]
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
    return this.annualPlanForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.annualPlanForm.controls)) {
      this.annualPlanForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.majorClassificationsService = new LookupService('majorclassifications', this.http);
this.subClassificationsService = new LookupService('subclassifications', this.http);
this.sessionDestinationCodesService = new LookupService('sessiondestinationcodes', this.http);
this.areasService = new LookupService('areas', this.http);
  }
}

