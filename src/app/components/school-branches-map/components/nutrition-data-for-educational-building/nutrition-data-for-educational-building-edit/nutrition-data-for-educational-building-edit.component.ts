
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { NutritionDataForEducationalBuilding } from 'app/shared/models/nutrition-data-for-educational-building';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { NutritionDataForEducationalBuildingService } from '../shared/nutrition-data-for-educational-building.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-nutrition-data-for-educational-building-edit',
  templateUrl: './nutrition-data-for-educational-building-edit.component.html',
  styleUrls: ['./nutrition-data-for-educational-building-edit.component.scss'],
  providers: []
})

export class NutritionDataForEducationalBuildingEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedNutritionDataForEducationalBuilding: NutritionDataForEducationalBuilding;
  nutritionDataForEducationalBuildingForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private yesOrNosService: LookupService;

  
thereIsNutritionSelectOptions: MaterialSelectOptions;

  
	@ViewChild('thereIsNutrition', { static: true }) ThereIsNutritionSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedNutritionDataForEducationalBuildingDialog: any,
    @Optional() public dialogRef: MatDialogRef<NutritionDataForEducationalBuildingEditComponent>,
    public nutritionDataForEducationalBuildingService: NutritionDataForEducationalBuildingService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedNutritionDataForEducationalBuilding = new NutritionDataForEducationalBuilding();
    this.selectedNutritionDataForEducationalBuilding = this.selectedNutritionDataForEducationalBuildingDialog.data || this.selectedNutritionDataForEducationalBuilding;

    
	this.thereIsNutritionSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'يوجد تغذيه',
	});


    this.nutritionDataForEducationalBuildingForm = this.formBuilder.group({
      
  id : [this.selectedNutritionDataForEducationalBuilding.id],
  buildingCode : [this.selectedNutritionDataForEducationalBuilding.buildingCode, [ Validators.required ]],
  thereIsNutrition : [this.selectedNutritionDataForEducationalBuilding.thereIsNutrition, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.nutritionDataForEducationalBuildingService.update(this.nutritionDataForEducationalBuildingForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.nutritionDataForEducationalBuildingService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.nutritionDataForEducationalBuildingForm.get(name);
  }

  initializeLookupServices() {
    this.yesOrNosService = new LookupService('yesornos', this.http);
  }
}
