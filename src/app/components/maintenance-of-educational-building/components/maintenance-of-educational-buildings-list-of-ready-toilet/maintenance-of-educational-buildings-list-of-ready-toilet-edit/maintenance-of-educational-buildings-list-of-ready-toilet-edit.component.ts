
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaintenanceOfEducationalBuildingsListOfReadyToilet } from 'app/shared/models/maintenance-of-educational-buildings-list-of-ready-toilet';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { MaintenanceOfEducationalBuildingsListOfReadyToiletService } from '../shared/maintenance-of-educational-buildings-list-of-ready-toilet.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-maintenance-of-educational-buildings-list-of-ready-toilet-edit',
  templateUrl: './maintenance-of-educational-buildings-list-of-ready-toilet-edit.component.html',
  styleUrls: ['./maintenance-of-educational-buildings-list-of-ready-toilet-edit.component.scss'],
  providers: []
})

export class MaintenanceOfEducationalBuildingsListOfReadyToiletEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedMaintenanceOfEducationalBuildingsListOfReadyToilet: MaintenanceOfEducationalBuildingsListOfReadyToilet;
  maintenanceOfEducationalBuildingsListOfReadyToiletForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private governoratesService: LookupService;

  
fromGovernmentSelectOptions: MaterialSelectOptions;

  
	@ViewChild('fromGovernment', { static: true }) FromGovernmentSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedMaintenanceOfEducationalBuildingsListOfReadyToiletDialog: any,
    @Optional() public dialogRef: MatDialogRef<MaintenanceOfEducationalBuildingsListOfReadyToiletEditComponent>,
    public maintenanceOfEducationalBuildingsListOfReadyToiletService: MaintenanceOfEducationalBuildingsListOfReadyToiletService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMaintenanceOfEducationalBuildingsListOfReadyToilet = new MaintenanceOfEducationalBuildingsListOfReadyToilet();
    this.selectedMaintenanceOfEducationalBuildingsListOfReadyToilet = this.selectedMaintenanceOfEducationalBuildingsListOfReadyToiletDialog.data || this.selectedMaintenanceOfEducationalBuildingsListOfReadyToilet;

    
	this.fromGovernmentSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظه ',
	});


    this.maintenanceOfEducationalBuildingsListOfReadyToiletForm = this.formBuilder.group({
      
  id : [this.selectedMaintenanceOfEducationalBuildingsListOfReadyToilet.id],
  orderDate : [this.selectedMaintenanceOfEducationalBuildingsListOfReadyToilet.orderDate, [ Validators.required ]],
  toiletCode : [this.selectedMaintenanceOfEducationalBuildingsListOfReadyToilet.toiletCode, [ Validators.required ]],
  fromSchool : [this.selectedMaintenanceOfEducationalBuildingsListOfReadyToilet.fromSchool, [ Validators.required ]],
  toSchool : [this.selectedMaintenanceOfEducationalBuildingsListOfReadyToilet.toSchool, [ Validators.required ]],
  fromGovernment : [this.selectedMaintenanceOfEducationalBuildingsListOfReadyToilet.fromGovernment, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.maintenanceOfEducationalBuildingsListOfReadyToiletService.update(this.maintenanceOfEducationalBuildingsListOfReadyToiletForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.maintenanceOfEducationalBuildingsListOfReadyToiletService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.maintenanceOfEducationalBuildingsListOfReadyToiletForm.get(name);
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
  }
}
