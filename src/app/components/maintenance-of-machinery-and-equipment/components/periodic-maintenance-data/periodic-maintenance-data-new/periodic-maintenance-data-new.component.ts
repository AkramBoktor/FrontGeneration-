
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { PeriodicMaintenanceData } from 'app/shared/models/periodic-maintenance-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PeriodicMaintenanceDataService } from '../shared/periodic-maintenance-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-periodic-maintenance-data-new',
  templateUrl: './periodic-maintenance-data-new.component.html',
  styleUrls: ['./periodic-maintenance-data-new.component.scss'],
  providers: [
    ]
})

export class PeriodicMaintenanceDataNewComponent extends AppBaseComponent implements OnInit {
  periodicMaintenanceDataForm: FormGroup;
  @Input() selectedPeriodicMaintenanceData: PeriodicMaintenanceData;
  errorMessages: FormControlError[] = [
        
  ];

  private buildingTypesService: LookupService;
private workshopNumbersService: LookupService;
private maintenanceStatusesService: LookupService;

  
buildingTypeSelectOptions: MaterialSelectOptions;
workshopNumberSelectOptions: MaterialSelectOptions;
maintenanceStatusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('buildingType', { static: true }) BuildingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('workshopNumber', { static: true }) WorkshopNumberSelectComponent: MaterialSelectComponent;
	@ViewChild('maintenanceStatus', { static: true }) MaintenanceStatusSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<PeriodicMaintenanceDataNewComponent>,
    public periodicMaintenanceDataService: PeriodicMaintenanceDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPeriodicMaintenanceData = new PeriodicMaintenanceData();

    
	this.buildingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.buildingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المبنى',
	});

	this.workshopNumberSelectOptions = new MaterialSelectOptions({
	 data: this.workshopNumbersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم الورشه',
	});

	this.maintenanceStatusSelectOptions = new MaterialSelectOptions({
	 data: this.maintenanceStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الصيانه',
	});


    this.periodicMaintenanceDataForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedPeriodicMaintenanceData.buildingCode, [ Validators.required ]],
  dateofMaintenancePlan : [this.selectedPeriodicMaintenanceData.dateofMaintenancePlan, [ Validators.required ]],
  dateofActualMaintenance : [this.selectedPeriodicMaintenanceData.dateofActualMaintenance, [ Validators.required ]],
  buildingType : [this.selectedPeriodicMaintenanceData.buildingType, [ Validators.required ]],
  workshopNumber : [this.selectedPeriodicMaintenanceData.workshopNumber, [ Validators.required ]],
  maintenanceStatus : [this.selectedPeriodicMaintenanceData.maintenanceStatus, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.periodicMaintenanceDataService.create(this.periodicMaintenanceDataForm.value)
        .pipe(switchMap(x => {
			return this.periodicMaintenanceDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.periodicMaintenanceDataForm.get(name);
    }

  initializeLookupServices() {
    this.buildingTypesService = new LookupService('buildingtypes', this.http);
this.workshopNumbersService = new LookupService('workshopnumbers', this.http);
this.maintenanceStatusesService = new LookupService('maintenancestatuses', this.http);
  }
 }
