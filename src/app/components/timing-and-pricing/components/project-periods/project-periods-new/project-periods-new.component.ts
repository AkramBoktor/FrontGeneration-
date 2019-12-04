
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ProjectPeriods } from 'app/shared/models/project-periods';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ProjectPeriodsService } from '../shared/project-periods.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-project-periods-new',
  templateUrl: './project-periods-new.component.html',
  styleUrls: ['./project-periods-new.component.scss'],
  providers: [
    ]
})

export class ProjectPeriodsNewComponent extends AppBaseComponent implements OnInit {
  projectPeriodsForm: FormGroup;
  @Input() selectedProjectPeriods: ProjectPeriods;
  errorMessages: FormControlError[] = [
        
  ];

  private governoratesService: LookupService;
private offeringTypesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ProjectPeriodsNewComponent>,
    public projectPeriodsService: ProjectPeriodsService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedProjectPeriods = new ProjectPeriods();

    
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
     
  id : [0],
  buildingCode : [this.selectedProjectPeriods.buildingCode, [ Validators.required ]],
  buildingName : [this.selectedProjectPeriods.buildingName, [ ]],
  bidNumber : [this.selectedProjectPeriods.bidNumber, [ ]],
  contractorCode : [this.selectedProjectPeriods.contractorCode, [ ]],
  contractorName : [this.selectedProjectPeriods.contractorName, [ ]],
  engineerCode : [this.selectedProjectPeriods.engineerCode, [ ]],
  engineerName : [this.selectedProjectPeriods.engineerName, [ ]],
  siteDeliveryDate : [this.selectedProjectPeriods.siteDeliveryDate, [ ]],
  executionDuration : [this.selectedProjectPeriods.executionDuration, [ ]],
  referenceCode : [this.selectedProjectPeriods.referenceCode, [ Validators.required ]],
  referencesName : [this.selectedProjectPeriods.referencesName, [ ]],
  extensionDays : [this.selectedProjectPeriods.extensionDays, [ Validators.required ]],
  beganStopDate : [this.selectedProjectPeriods.beganStopDate, [ Validators.required ]],
  extensionTimes : [this.selectedProjectPeriods.extensionTimes, [ ]],
  governorate : [this.selectedProjectPeriods.governorate, [ ]],
  offeringType : [this.selectedProjectPeriods.offeringType, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.projectPeriodsService.create(this.projectPeriodsForm.value)
        .pipe(switchMap(x => {
			return this.projectPeriodsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.projectPeriodsForm.get(name);
    }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
 }
