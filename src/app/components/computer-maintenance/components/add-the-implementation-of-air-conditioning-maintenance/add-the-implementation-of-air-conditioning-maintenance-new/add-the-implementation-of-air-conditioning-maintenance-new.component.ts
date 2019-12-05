
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AddTheImplementationOfAirConditioningMaintenance } from 'app/shared/models/add-the-implementation-of-air-conditioning-maintenance';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AddTheImplementationOfAirConditioningMaintenanceService } from '../shared/add-the-implementation-of-air-conditioning-maintenance.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-add-the-implementation-of-air-conditioning-maintenance-new',
  templateUrl: './add-the-implementation-of-air-conditioning-maintenance-new.component.html',
  styleUrls: ['./add-the-implementation-of-air-conditioning-maintenance-new.component.scss'],
  providers: [
    ]
})

export class AddTheImplementationOfAirConditioningMaintenanceNewComponent extends AppBaseComponent implements OnInit {
  addTheImplementationOfAirConditioningMaintenanceForm: FormGroup;
  @Input() selectedAddTheImplementationOfAirConditioningMaintenance: AddTheImplementationOfAirConditioningMaintenance;
  errorMessages: FormControlError[] = [
        
  ];

  private areasService: LookupService;
private laboratoryTypesService: LookupService;

  
regionSelectOptions: MaterialSelectOptions;
laboratoryTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('region', { static: true }) RegionSelectComponent: MaterialSelectComponent;
	@ViewChild('laboratoryType', { static: true }) LaboratoryTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<AddTheImplementationOfAirConditioningMaintenanceNewComponent>,
    public addTheImplementationOfAirConditioningMaintenanceService: AddTheImplementationOfAirConditioningMaintenanceService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAddTheImplementationOfAirConditioningMaintenance = new AddTheImplementationOfAirConditioningMaintenance();

    
	this.regionSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المنطقه',
	});

	this.laboratoryTypeSelectOptions = new MaterialSelectOptions({
	 data: this.laboratoryTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المعمل',
	});


    this.addTheImplementationOfAirConditioningMaintenanceForm = this.formBuilder.group({
     
  id : [0],
  period : [this.selectedAddTheImplementationOfAirConditioningMaintenance.period, [ Validators.required ]],
  maintainer : [this.selectedAddTheImplementationOfAirConditioningMaintenance.maintainer, [ Validators.required ]],
  building : [this.selectedAddTheImplementationOfAirConditioningMaintenance.building, [ Validators.required ]],
  code : [this.selectedAddTheImplementationOfAirConditioningMaintenance.code, [ Validators.required ]],
  plannedDate : [this.selectedAddTheImplementationOfAirConditioningMaintenance.plannedDate, [ Validators.required ]],
  actualDate : [this.selectedAddTheImplementationOfAirConditioningMaintenance.actualDate, [ Validators.required ]],
  region : [this.selectedAddTheImplementationOfAirConditioningMaintenance.region, [ Validators.required ]],
  laboratoryType : [this.selectedAddTheImplementationOfAirConditioningMaintenance.laboratoryType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.addTheImplementationOfAirConditioningMaintenanceService.create(this.addTheImplementationOfAirConditioningMaintenanceForm.value)
        .pipe(switchMap(x => {
			return this.addTheImplementationOfAirConditioningMaintenanceService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.addTheImplementationOfAirConditioningMaintenanceForm.get(name);
    }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
this.laboratoryTypesService = new LookupService('laboratorytypes', this.http);
  }
 }
