
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FollowUpDailyMaintenance } from 'app/shared/models/follow-up-daily-maintenance';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FollowUpDailyMaintenanceService } from '../shared/follow-up-daily-maintenance.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-follow-up-daily-maintenance-new',
  templateUrl: './follow-up-daily-maintenance-new.component.html',
  styleUrls: ['./follow-up-daily-maintenance-new.component.scss'],
  providers: [
    ]
})

export class FollowUpDailyMaintenanceNewComponent extends AppBaseComponent implements OnInit {
  followUpDailyMaintenanceForm: FormGroup;
  @Input() selectedFollowUpDailyMaintenance: FollowUpDailyMaintenance;
  errorMessages: FormControlError[] = [
        
  ];

  private branchCodesService: LookupService;
private areasService: LookupService;
private constructionTypesService: LookupService;
private offeringTypesService: LookupService;

  
branchNumberSelectOptions: MaterialSelectOptions;
regionCodeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchNumber', { static: true }) BranchNumberSelectComponent: MaterialSelectComponent;
	@ViewChild('regionCode', { static: true }) RegionCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<FollowUpDailyMaintenanceNewComponent>,
    public followUpDailyMaintenanceService: FollowUpDailyMaintenanceService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFollowUpDailyMaintenance = new FollowUpDailyMaintenance();

    
	this.branchNumberSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم الفرع',
	});

	this.regionCodeSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: '  رقم المنطقه ',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' نوع  الانشاء',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' نوع الطرح',
	});


    this.followUpDailyMaintenanceForm = this.formBuilder.group({
     
  id : [0],
  buildingNumber : [this.selectedFollowUpDailyMaintenance.buildingNumber, [ Validators.required ]],
  yearPlan : [this.selectedFollowUpDailyMaintenance.yearPlan, [ Validators.required ]],
  implementationDuration : [this.selectedFollowUpDailyMaintenance.implementationDuration, [ Validators.required ]],
  plannerDeliveryDate : [this.selectedFollowUpDailyMaintenance.plannerDeliveryDate, [ Validators.required ]],
  physicaldeliveryDate : [this.selectedFollowUpDailyMaintenance.physicaldeliveryDate, [ Validators.required ]],
  bidNumber : [this.selectedFollowUpDailyMaintenance.bidNumber, [ Validators.required ]],
  dateLastFollow : [this.selectedFollowUpDailyMaintenance.dateLastFollow, [ Validators.required ]],
  supervisingEngineer : [this.selectedFollowUpDailyMaintenance.supervisingEngineer, [ Validators.required ]],
  completionRate : [this.selectedFollowUpDailyMaintenance.completionRate, [ Validators.required ]],
  delayReason : [this.selectedFollowUpDailyMaintenance.delayReason, [ Validators.required ]],
  primaryDeliveryDate : [this.selectedFollowUpDailyMaintenance.primaryDeliveryDate, [ Validators.required ]],
  finalDeliveryDate : [this.selectedFollowUpDailyMaintenance.finalDeliveryDate, [ Validators.required ]],
  branchNumber : [this.selectedFollowUpDailyMaintenance.branchNumber, [ Validators.required ]],
  regionCode : [this.selectedFollowUpDailyMaintenance.regionCode, [ Validators.required ]],
  constructionType : [this.selectedFollowUpDailyMaintenance.constructionType, [ Validators.required ]],
  offeringType : [this.selectedFollowUpDailyMaintenance.offeringType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.followUpDailyMaintenanceService.create(this.followUpDailyMaintenanceForm.value)
        .pipe(switchMap(x => {
			return this.followUpDailyMaintenanceService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.followUpDailyMaintenanceForm.get(name);
    }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.areasService = new LookupService('areas', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
 }
