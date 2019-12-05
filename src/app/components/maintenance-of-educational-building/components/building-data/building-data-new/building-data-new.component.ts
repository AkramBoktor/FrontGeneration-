
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { BuildingData } from 'app/shared/models/building-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BuildingDataService } from '../shared/building-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-building-data-new',
  templateUrl: './building-data-new.component.html',
  styleUrls: ['./building-data-new.component.scss'],
  providers: [
    ]
})

export class BuildingDataNewComponent extends AppBaseComponent implements OnInit {
  buildingDataForm: FormGroup;
  @Input() selectedBuildingData: BuildingData;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<BuildingDataNewComponent>,
    public buildingDataService: BuildingDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBuildingData = new BuildingData();

    

    this.buildingDataForm = this.formBuilder.group({
     
  id : [0],
  actingEngineer : [this.selectedBuildingData.actingEngineer, [ Validators.required ]],
  sectorHead : [this.selectedBuildingData.sectorHead, [ Validators.required ]],
  maintenanceDepartmentHead : [this.selectedBuildingData.maintenanceDepartmentHead, [ Validators.required ]],
  areaManager : [this.selectedBuildingData.areaManager, [ Validators.required ]],
  followerEngineerOfficeBranch : [this.selectedBuildingData.followerEngineerOfficeBranch, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.buildingDataService.create(this.buildingDataForm.value)
        .pipe(switchMap(x => {
			return this.buildingDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.buildingDataForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
