
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { DataSpacesOfTheEducationalBuilding } from 'app/shared/models/data-spaces-of-the-educational-building';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DataSpacesOfTheEducationalBuildingService } from '../shared/data-spaces-of-the-educational-building.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-data-spaces-of-the-educational-building-view',
  templateUrl: './data-spaces-of-the-educational-building-view.component.html',
  styleUrls: ['./data-spaces-of-the-educational-building-view.component.scss'],
  providers: []
})

export class DataSpacesOfTheEducationalBuildingViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataSpacesOfTheEducationalBuilding: DataSpacesOfTheEducationalBuilding;
  dataSpacesOfTheEducationalBuildingForm: FormGroup;

  private branchCodesService: LookupService;

  
codeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataSpacesOfTheEducationalBuildingDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataSpacesOfTheEducationalBuildingViewComponent>,
    public dataSpacesOfTheEducationalBuildingService: DataSpacesOfTheEducationalBuildingService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataSpacesOfTheEducationalBuilding = this.selectedDataSpacesOfTheEducationalBuildingDialog.data || this.selectedDataSpacesOfTheEducationalBuilding;

    
	this.codeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود ',
	});


    this.dataSpacesOfTheEducationalBuildingForm = this.formBuilder.group({
      
  buildingCode : [this.selectedDataSpacesOfTheEducationalBuilding.buildingCode],
  extension : [this.selectedDataSpacesOfTheEducationalBuilding.extension],
  floor : [this.selectedDataSpacesOfTheEducationalBuilding.floor],
  spaceName : [this.selectedDataSpacesOfTheEducationalBuilding.spaceName],
  area : [this.selectedDataSpacesOfTheEducationalBuilding.area],
  series : [this.selectedDataSpacesOfTheEducationalBuilding.series],
  code : [this.selectedDataSpacesOfTheEducationalBuilding.code]
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
    return this.dataSpacesOfTheEducationalBuildingForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.dataSpacesOfTheEducationalBuildingForm.controls)) {
      this.dataSpacesOfTheEducationalBuildingForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
  }
}

