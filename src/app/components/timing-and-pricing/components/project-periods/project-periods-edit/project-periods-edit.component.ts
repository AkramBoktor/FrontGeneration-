
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ProjectPeriods } from 'app/shared/models/project-periods';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ProjectPeriodsService } from '../shared/project-periods.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-project-periods-edit',
  templateUrl: './project-periods-edit.component.html',
  styleUrls: ['./project-periods-edit.component.scss'],
  providers: []
})

export class ProjectPeriodsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedProjectPeriods: ProjectPeriods;
  projectPeriodsForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private offeringTypesService: LookupService;
private governoratesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;
governorateSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedProjectPeriodsDialog: any,
    @Optional() public dialogRef: MatDialogRef<ProjectPeriodsEditComponent>,
    public projectPeriodsService: ProjectPeriodsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedProjectPeriods = new ProjectPeriods();
    this.selectedProjectPeriods = this.selectedProjectPeriodsDialog.data || this.selectedProjectPeriods;

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});


    this.projectPeriodsForm = this.formBuilder.group({
      
  id : [this.selectedProjectPeriods.id],
  buildingCode : [this.selectedProjectPeriods.buildingCode, [ Validators.required ]],
  referencesName : [this.selectedProjectPeriods.referencesName, [ ]],
  referenceNumber : [this.selectedProjectPeriods.referenceCode, [ Validators.required ]],
  extensionTimes : [this.selectedProjectPeriods.extensionTimes, [ ]],
  siteDeliveryDate : [this.selectedProjectPeriods.siteDeliveryDate, [ ]],
  engineerName : [this.selectedProjectPeriods.engineerName, [ ]],
  engineerCode : [this.selectedProjectPeriods.engineerCode, [ ]],
  contractorName : [this.selectedProjectPeriods.contractorName, [ ]],
  contractorCode : [this.selectedProjectPeriods.contractorCode, [ ]],
  bidNumber : [this.selectedProjectPeriods.bidNumber, [ ]],
  buildingName : [this.selectedProjectPeriods.buildingName, [ ]],
  extensionDays : [this.selectedProjectPeriods.extensionDays, [ Validators.required ]],
  beganStopDate : [this.selectedProjectPeriods.beganStopDate, [ Validators.required ]],
  executionDuration : [this.selectedProjectPeriods.executionDuration, [ ]],
  offeringType : [this.selectedProjectPeriods.offeringType, [ ]],
  governorate : [this.selectedProjectPeriods.governorate, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.projectPeriodsService.update(this.projectPeriodsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.projectPeriodsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.projectPeriodsForm.get(name);
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.governoratesService = new LookupService('governorates', this.http);
  }
}
