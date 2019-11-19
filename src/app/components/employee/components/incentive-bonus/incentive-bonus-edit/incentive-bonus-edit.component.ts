
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { IncentiveBonus } from 'app/shared/models/incentive-bonus';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { IncentiveBonusService } from '../shared/incentive-bonus.service';




@Component({
  selector: 'app-incentive-bonus-edit',
  templateUrl: './incentive-bonus-edit.component.html',
  styleUrls: ['./incentive-bonus-edit.component.scss'],
  providers: []
})

export class IncentiveBonusEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedIncentiveBonus: IncentiveBonus;
  incentiveBonusForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private functionalGroupsService: LookupService;
private jobTypesService: LookupService;
private financialDegreesService: LookupService;

  
jobGroupSelectOptions: MaterialSelectOptions;
jobTitleSelectOptions: MaterialSelectOptions;
financialDegreeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('jobGroup', { static: true }) JobGroupSelectComponent: MaterialSelectComponent;
	@ViewChild('jobTitle', { static: true }) JobTitleSelectComponent: MaterialSelectComponent;
	@ViewChild('financialDegree', { static: true }) FinancialDegreeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedIncentiveBonusDialog: any,
    @Optional() public dialogRef: MatDialogRef<IncentiveBonusEditComponent>,
    public incentiveBonusService: IncentiveBonusService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedIncentiveBonus = new IncentiveBonus();
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
      
  id : [this.selectedIncentiveBonus.id],
  employeeCode : [this.selectedIncentiveBonus.employeeCode, [ Validators.required ]],
  grantedYear : [this.selectedIncentiveBonus.grantedYear, [ Validators.required ]],
  decisionNumber : [this.selectedIncentiveBonus.decisionNumber, [ Validators.required ]],
  decisionDate : [this.selectedIncentiveBonus.decisionDate, [ Validators.required ]],
  committeeAcceptedDate : [this.selectedIncentiveBonus.committeeAcceptedDate, [ Validators.required ]],
  jobGroup : [this.selectedIncentiveBonus.jobGroup, [ ]],
  jobTitle : [this.selectedIncentiveBonus.jobTitle, [ ]],
  financialDegree : [this.selectedIncentiveBonus.financialDegree, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.incentiveBonusService.update(this.incentiveBonusForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.incentiveBonusService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.incentiveBonusForm.get(name);
  }

  initializeLookupServices() {
    this.functionalGroupsService = new LookupService('functionalgroups', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
this.financialDegreesService = new LookupService('financialdegrees', this.http);
  }
}
