
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FollowUpDailyMaintenance } from 'app/shared/models/follow-up-daily-maintenance';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { FollowUpDailyMaintenanceService } from '../shared/follow-up-daily-maintenance.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-follow-up-daily-maintenance-view',
  templateUrl: './follow-up-daily-maintenance-view.component.html',
  styleUrls: ['./follow-up-daily-maintenance-view.component.scss'],
  providers: []
})

export class FollowUpDailyMaintenanceViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedFollowUpDailyMaintenance: FollowUpDailyMaintenance;
  followUpDailyMaintenanceForm: FormGroup;

  private branchCodesService: LookupService;
private areasService: LookupService;
private constructionTypesService: LookupService;
private offeringTypesService: LookupService;

  
branchNumberSelectOptions: MaterialSelectOptions;
regionCodeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedFollowUpDailyMaintenanceDialog: any,
    @Optional() public dialogRef: MatDialogRef<FollowUpDailyMaintenanceViewComponent>,
    public followUpDailyMaintenanceService: FollowUpDailyMaintenanceService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  buildingNumber : [this.selectedFollowUpDailyMaintenance.buildingNumber],
  yearPlan : [this.selectedFollowUpDailyMaintenance.yearPlan],
  implementationDuration : [this.selectedFollowUpDailyMaintenance.implementationDuration],
  plannerDeliveryDate : [this.selectedFollowUpDailyMaintenance.plannerDeliveryDate],
  physicaldeliveryDate : [this.selectedFollowUpDailyMaintenance.physicaldeliveryDate],
  bidNumber : [this.selectedFollowUpDailyMaintenance.bidNumber],
  dateLastFollow : [this.selectedFollowUpDailyMaintenance.dateLastFollow],
  supervisingEngineer : [this.selectedFollowUpDailyMaintenance.supervisingEngineer],
  completionRate : [this.selectedFollowUpDailyMaintenance.completionRate],
  delayReason : [this.selectedFollowUpDailyMaintenance.delayReason],
  primaryDeliveryDate : [this.selectedFollowUpDailyMaintenance.primaryDeliveryDate],
  finalDeliveryDate : [this.selectedFollowUpDailyMaintenance.finalDeliveryDate],
  branchNumber : [this.selectedFollowUpDailyMaintenance.branchNumber],
  regionCode : [this.selectedFollowUpDailyMaintenance.regionCode],
  constructionType : [this.selectedFollowUpDailyMaintenance.constructionType],
  offeringType : [this.selectedFollowUpDailyMaintenance.offeringType]
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
    return this.followUpDailyMaintenanceForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.followUpDailyMaintenanceForm.controls)) {
      this.followUpDailyMaintenanceForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.areasService = new LookupService('areas', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}

