
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { FollowUpDailyMaintenance } from 'app/shared/models/follow-up-daily-maintenance';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { FollowUpDailyMaintenanceService } from '../shared/follow-up-daily-maintenance.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-follow-up-daily-maintenance-edit',
  templateUrl: './follow-up-daily-maintenance-edit.component.html',
  styleUrls: ['./follow-up-daily-maintenance-edit.component.scss'],
  providers: []
})

export class FollowUpDailyMaintenanceEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedFollowUpDailyMaintenance: FollowUpDailyMaintenance;
  followUpDailyMaintenanceForm: FormGroup;
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
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedFollowUpDailyMaintenanceDialog: any,
    @Optional() public dialogRef: MatDialogRef<FollowUpDailyMaintenanceEditComponent>,
    public followUpDailyMaintenanceService: FollowUpDailyMaintenanceService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFollowUpDailyMaintenance = new FollowUpDailyMaintenance();
    this.selectedFollowUpDailyMaintenance = this.selectedFollowUpDailyMaintenanceDialog.data || this.selectedFollowUpDailyMaintenance;

    
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
      
  id : [this.selectedFollowUpDailyMaintenance.id],
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
    this.followUpDailyMaintenanceService.update(this.followUpDailyMaintenanceForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.followUpDailyMaintenanceService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.followUpDailyMaintenanceForm.get(name);
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.areasService = new LookupService('areas', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}
