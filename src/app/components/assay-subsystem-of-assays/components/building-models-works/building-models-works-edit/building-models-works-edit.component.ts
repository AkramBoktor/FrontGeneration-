
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { BuildingModelsWorks } from 'app/shared/models/building-models-works';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { BuildingModelsWorksService } from '../shared/building-models-works.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-building-models-works-edit',
  templateUrl: './building-models-works-edit.component.html',
  styleUrls: ['./building-models-works-edit.component.scss'],
  providers: []
})

export class BuildingModelsWorksEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBuildingModelsWorks: BuildingModelsWorks;
  buildingModelsWorksForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private workTypesService: LookupService;
private measurementUnitsService: LookupService;

  
workTypeSelectOptions: MaterialSelectOptions;
unitCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('workType', { static: true }) WorkTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('unitCode', { static: true }) UnitCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBuildingModelsWorksDialog: any,
    @Optional() public dialogRef: MatDialogRef<BuildingModelsWorksEditComponent>,
    public buildingModelsWorksService: BuildingModelsWorksService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBuildingModelsWorks = new BuildingModelsWorks();
    this.selectedBuildingModelsWorks = this.selectedBuildingModelsWorksDialog.data || this.selectedBuildingModelsWorks;

    
	this.workTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العمل',
	});

	this.unitCodeSelectOptions = new MaterialSelectOptions({
	 data: this.measurementUnitsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوحدة',
	});


    this.buildingModelsWorksForm = this.formBuilder.group({
      
  id : [this.selectedBuildingModelsWorks.id],
  modelCode : [this.selectedBuildingModelsWorks.modelCode, [ Validators.required ]],
  activityType : [this.selectedBuildingModelsWorks.activityType, [ Validators.required ]],
  itemCode : [this.selectedBuildingModelsWorks.itemCode, [ Validators.required ]],
  itemName : [this.selectedBuildingModelsWorks.itemName, [ ]],
  amount : [this.selectedBuildingModelsWorks.amount, [ Validators.required ]],
  workType : [this.selectedBuildingModelsWorks.workType, [ Validators.required ]],
  unitCode : [this.selectedBuildingModelsWorks.unitCode, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.buildingModelsWorksService.update(this.buildingModelsWorksForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.buildingModelsWorksService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.buildingModelsWorksForm.get(name);
  }

  initializeLookupServices() {
    this.workTypesService = new LookupService('worktypes', this.http);
this.measurementUnitsService = new LookupService('measurementunits', this.http);
  }
}
