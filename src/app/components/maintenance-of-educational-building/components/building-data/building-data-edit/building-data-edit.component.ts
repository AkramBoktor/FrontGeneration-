
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { BuildingData } from 'app/shared/models/building-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { BuildingDataService } from '../shared/building-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-building-data-edit',
  templateUrl: './building-data-edit.component.html',
  styleUrls: ['./building-data-edit.component.scss'],
  providers: []
})

export class BuildingDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBuildingData: BuildingData;
  buildingDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBuildingDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<BuildingDataEditComponent>,
    public buildingDataService: BuildingDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBuildingData = new BuildingData();
    this.selectedBuildingData = this.selectedBuildingDataDialog.data || this.selectedBuildingData;

    

    this.buildingDataForm = this.formBuilder.group({
      
  id : [this.selectedBuildingData.id],
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
    this.buildingDataService.update(this.buildingDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.buildingDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.buildingDataForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
