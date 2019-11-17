
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { IncentiveBonus } from 'app/shared/models/incentive-bonus';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { IncentiveBonusService } from '../shared/incentive-bonus.service';

@Component({
  selector: 'app-incentive-bonus-view',
  templateUrl: './incentive-bonus-view.component.html',
  styleUrls: ['./incentive-bonus-view.component.scss'],
  providers: []
})

export class IncentiveBonusViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedIncentiveBonus: IncentiveBonus;
  incentiveBonusForm: FormGroup;

  private functionalGroupsService: LookupService;
private jobTypesService: LookupService;
private financialDegreesService: LookupService;

  
jobGroupSelectOptions: MaterialSelectOptions;
jobTitleSelectOptions: MaterialSelectOptions;
financialDegreeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedIncentiveBonusDialog: any,
    @Optional() public dialogRef: MatDialogRef<IncentiveBonusViewComponent>,
    public incentiveBonusService: IncentiveBonusService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedIncentiveBonus = this.selectedIncentiveBonusDialog.data || this.selectedIncentiveBonus;

    
	this.jobGroupSelectOptions = new MaterialSelectOptions({
	 data: this.functionalGroupsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المجموعه الوظيفية',
	});

	this.jobTitleSelectOptions = new MaterialSelectOptions({
	 data: this.jobTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوظيفه',
	});

	this.financialDegreeSelectOptions = new MaterialSelectOptions({
	 data: this.financialDegreesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الدرجه الماليه',
	});


    this.incentiveBonusForm = this.formBuilder.group({
      
  employeeCode : [this.selectedIncentiveBonus.employeeCode],
  grantedYear : [this.selectedIncentiveBonus.grantedYear],
  decisionNumber : [this.selectedIncentiveBonus.decisionNumber],
  decisionDate : [this.selectedIncentiveBonus.decisionDate],
  committeeAcceptedDate : [this.selectedIncentiveBonus.committeeAcceptedDate],
  jobGroup : [this.selectedIncentiveBonus.jobGroup],
  jobTitle : [this.selectedIncentiveBonus.jobTitle],
  financialDegree : [this.selectedIncentiveBonus.financialDegree]
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
    return this.incentiveBonusForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.incentiveBonusForm.controls)) {
      this.incentiveBonusForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.functionalGroupsService = new LookupService('functionalgroups', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
this.financialDegreesService = new LookupService('financialdegrees', this.http);
  }
}

