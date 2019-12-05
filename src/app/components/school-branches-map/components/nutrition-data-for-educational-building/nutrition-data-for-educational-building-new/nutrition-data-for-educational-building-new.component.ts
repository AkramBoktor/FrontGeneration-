
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { NutritionDataForEducationalBuilding } from 'app/shared/models/nutrition-data-for-educational-building';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { NutritionDataForEducationalBuildingService } from '../shared/nutrition-data-for-educational-building.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-nutrition-data-for-educational-building-new',
  templateUrl: './nutrition-data-for-educational-building-new.component.html',
  styleUrls: ['./nutrition-data-for-educational-building-new.component.scss'],
  providers: [
    ]
})

export class NutritionDataForEducationalBuildingNewComponent extends AppBaseComponent implements OnInit {
  nutritionDataForEducationalBuildingForm: FormGroup;
  @Input() selectedNutritionDataForEducationalBuilding: NutritionDataForEducationalBuilding;
  errorMessages: FormControlError[] = [
        
  ];

  private yesOrNosService: LookupService;

  
thereIsNutritionSelectOptions: MaterialSelectOptions;

  
	@ViewChild('thereIsNutrition', { static: true }) ThereIsNutritionSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<NutritionDataForEducationalBuildingNewComponent>,
    public nutritionDataForEducationalBuildingService: NutritionDataForEducationalBuildingService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedNutritionDataForEducationalBuilding = new NutritionDataForEducationalBuilding();

    
	this.thereIsNutritionSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'يوجد تغذيه',
	});


    this.nutritionDataForEducationalBuildingForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedNutritionDataForEducationalBuilding.buildingCode, [ Validators.required ]],
  thereIsNutrition : [this.selectedNutritionDataForEducationalBuilding.thereIsNutrition, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.nutritionDataForEducationalBuildingService.create(this.nutritionDataForEducationalBuildingForm.value)
        .pipe(switchMap(x => {
			return this.nutritionDataForEducationalBuildingService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.nutritionDataForEducationalBuildingForm.get(name);
    }

  initializeLookupServices() {
    this.yesOrNosService = new LookupService('yesornos', this.http);
  }
 }
