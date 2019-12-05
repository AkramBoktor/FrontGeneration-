
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { MaintenanceOfEducationalBuildingsListOfReadyToilet } from 'app/shared/models/maintenance-of-educational-buildings-list-of-ready-toilet';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { MaintenanceOfEducationalBuildingsListOfReadyToiletService } from '../shared/maintenance-of-educational-buildings-list-of-ready-toilet.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-maintenance-of-educational-buildings-list-of-ready-toilet-new',
  templateUrl: './maintenance-of-educational-buildings-list-of-ready-toilet-new.component.html',
  styleUrls: ['./maintenance-of-educational-buildings-list-of-ready-toilet-new.component.scss'],
  providers: [
    ]
})

export class MaintenanceOfEducationalBuildingsListOfReadyToiletNewComponent extends AppBaseComponent implements OnInit {
  maintenanceOfEducationalBuildingsListOfReadyToiletForm: FormGroup;
  @Input() selectedMaintenanceOfEducationalBuildingsListOfReadyToilet: MaintenanceOfEducationalBuildingsListOfReadyToilet;
  errorMessages: FormControlError[] = [
        
  ];

  private governoratesService: LookupService;

  
fromGovernmentSelectOptions: MaterialSelectOptions;

  
	@ViewChild('fromGovernment', { static: true }) FromGovernmentSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<MaintenanceOfEducationalBuildingsListOfReadyToiletNewComponent>,
    public maintenanceOfEducationalBuildingsListOfReadyToiletService: MaintenanceOfEducationalBuildingsListOfReadyToiletService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMaintenanceOfEducationalBuildingsListOfReadyToilet = new MaintenanceOfEducationalBuildingsListOfReadyToilet();

    
	this.fromGovernmentSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظه ',
	});


    this.maintenanceOfEducationalBuildingsListOfReadyToiletForm = this.formBuilder.group({
     
  id : [0],
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
    this.maintenanceOfEducationalBuildingsListOfReadyToiletService.create(this.maintenanceOfEducationalBuildingsListOfReadyToiletForm.value)
        .pipe(switchMap(x => {
			return this.maintenanceOfEducationalBuildingsListOfReadyToiletService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.maintenanceOfEducationalBuildingsListOfReadyToiletForm.get(name);
    }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
  }
 }
