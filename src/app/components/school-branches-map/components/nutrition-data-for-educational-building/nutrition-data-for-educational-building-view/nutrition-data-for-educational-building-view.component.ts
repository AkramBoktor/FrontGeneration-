
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { NutritionDataForEducationalBuilding } from 'app/shared/models/nutrition-data-for-educational-building';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { NutritionDataForEducationalBuildingService } from '../shared/nutrition-data-for-educational-building.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-nutrition-data-for-educational-building-view',
  templateUrl: './nutrition-data-for-educational-building-view.component.html',
  styleUrls: ['./nutrition-data-for-educational-building-view.component.scss'],
  providers: []
})

export class NutritionDataForEducationalBuildingViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedNutritionDataForEducationalBuilding: NutritionDataForEducationalBuilding;
  nutritionDataForEducationalBuildingForm: FormGroup;

  private yesOrNosService: LookupService;

  
thereIsNutritionSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedNutritionDataForEducationalBuildingDialog: any,
    @Optional() public dialogRef: MatDialogRef<NutritionDataForEducationalBuildingViewComponent>,
    public nutritionDataForEducationalBuildingService: NutritionDataForEducationalBuildingService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedNutritionDataForEducationalBuilding = this.selectedNutritionDataForEducationalBuildingDialog.data || this.selectedNutritionDataForEducationalBuilding;

    
	this.thereIsNutritionSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'يوجد تغذيه',
	});


    this.nutritionDataForEducationalBuildingForm = this.formBuilder.group({
      
  buildingCode : [this.selectedNutritionDataForEducationalBuilding.buildingCode],
  thereIsNutrition : [this.selectedNutritionDataForEducationalBuilding.thereIsNutrition]
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
    return this.nutritionDataForEducationalBuildingForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.nutritionDataForEducationalBuildingForm.controls)) {
      this.nutritionDataForEducationalBuildingForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.yesOrNosService = new LookupService('yesornos', this.http);
  }
}

