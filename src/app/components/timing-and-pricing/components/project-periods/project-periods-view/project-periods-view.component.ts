
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ProjectPeriods } from 'app/shared/models/project-periods';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ProjectPeriodsService } from '../shared/project-periods.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-project-periods-view',
  templateUrl: './project-periods-view.component.html',
  styleUrls: ['./project-periods-view.component.scss'],
  providers: []
})

export class ProjectPeriodsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedProjectPeriods: ProjectPeriods;
  projectPeriodsForm: FormGroup;

  private governoratesService: LookupService;
private offeringTypesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedProjectPeriodsDialog: any,
    @Optional() public dialogRef: MatDialogRef<ProjectPeriodsViewComponent>,
    public projectPeriodsService: ProjectPeriodsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedProjectPeriods = this.selectedProjectPeriodsDialog.data || this.selectedProjectPeriods;

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.projectPeriodsForm = this.formBuilder.group({
      
  buildingCode : [this.selectedProjectPeriods.buildingCode],
  buildingName : [this.selectedProjectPeriods.buildingName],
  bidNumber : [this.selectedProjectPeriods.bidNumber],
  contractorCode : [this.selectedProjectPeriods.contractorCode],
  contractorName : [this.selectedProjectPeriods.contractorName],
  engineerCode : [this.selectedProjectPeriods.engineerCode],
  engineerName : [this.selectedProjectPeriods.engineerName],
  siteDeliveryDate : [this.selectedProjectPeriods.siteDeliveryDate],
  executionDuration : [this.selectedProjectPeriods.executionDuration],
  extensionTimes : [this.selectedProjectPeriods.extensionTimes],
  referenceNumber : [this.selectedProjectPeriods.referenceNumber],
  referencesName : [this.selectedProjectPeriods.referencesName],
  extensionDays : [this.selectedProjectPeriods.extensionDays],
  beganStopDate : [this.selectedProjectPeriods.beganStopDate],
  governorate : [this.selectedProjectPeriods.governorate],
  offeringType : [this.selectedProjectPeriods.offeringType]
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
    return this.projectPeriodsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.projectPeriodsForm.controls)) {
      this.projectPeriodsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}

