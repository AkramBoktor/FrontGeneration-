
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AddTheImplementationOfAirConditioningMaintenance } from 'app/shared/models/add-the-implementation-of-air-conditioning-maintenance';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { AddTheImplementationOfAirConditioningMaintenanceService } from '../shared/add-the-implementation-of-air-conditioning-maintenance.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-add-the-implementation-of-air-conditioning-maintenance-edit',
  templateUrl: './add-the-implementation-of-air-conditioning-maintenance-edit.component.html',
  styleUrls: ['./add-the-implementation-of-air-conditioning-maintenance-edit.component.scss'],
  providers: []
})

export class AddTheImplementationOfAirConditioningMaintenanceEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAddTheImplementationOfAirConditioningMaintenance: AddTheImplementationOfAirConditioningMaintenance;
  addTheImplementationOfAirConditioningMaintenanceForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private areasService: LookupService;
private laboratoryTypesService: LookupService;

  
regionSelectOptions: MaterialSelectOptions;
laboratoryTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('region', { static: true }) RegionSelectComponent: MaterialSelectComponent;
	@ViewChild('laboratoryType', { static: true }) LaboratoryTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAddTheImplementationOfAirConditioningMaintenanceDialog: any,
    @Optional() public dialogRef: MatDialogRef<AddTheImplementationOfAirConditioningMaintenanceEditComponent>,
    public addTheImplementationOfAirConditioningMaintenanceService: AddTheImplementationOfAirConditioningMaintenanceService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAddTheImplementationOfAirConditioningMaintenance = new AddTheImplementationOfAirConditioningMaintenance();
    this.selectedAddTheImplementationOfAirConditioningMaintenance = this.selectedAddTheImplementationOfAirConditioningMaintenanceDialog.data || this.selectedAddTheImplementationOfAirConditioningMaintenance;

    
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
      
  id : [this.selectedAddTheImplementationOfAirConditioningMaintenance.id],
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
    this.addTheImplementationOfAirConditioningMaintenanceService.update(this.addTheImplementationOfAirConditioningMaintenanceForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.addTheImplementationOfAirConditioningMaintenanceService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.addTheImplementationOfAirConditioningMaintenanceForm.get(name);
  }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
this.laboratoryTypesService = new LookupService('laboratorytypes', this.http);
  }
}
