
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { IncentiveBonus } from 'app/shared/models/incentive-bonus';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { IncentiveBonusService } from '../shared/incentive-bonus.service';


@Component({
  selector: 'app-incentive-bonus-new',
  templateUrl: './incentive-bonus-new.component.html',
  styleUrls: ['./incentive-bonus-new.component.scss'],
  providers: [
    ]
})

export class IncentiveBonusNewComponent extends AppBaseComponent implements OnInit {
  incentiveBonusForm: FormGroup;
  @Input() selectedIncentiveBonus: IncentiveBonus;
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
    @Optional() public dialogRef: MatDialogRef<IncentiveBonusNewComponent>,
    public incentiveBonusService: IncentiveBonusService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedIncentiveBonus = new IncentiveBonus();

    
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
     
  id : [0],
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
    this.incentiveBonusService.create(this.incentiveBonusForm.value)
        .pipe(switchMap(x => {
			return this.incentiveBonusService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
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
