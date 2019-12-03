
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { CompleteTitlesOfEducationalBuildings } from 'app/shared/models/complete-titles-of-educational-buildings';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { CompleteTitlesOfEducationalBuildingsService } from '../shared/complete-titles-of-educational-buildings.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-complete-titles-of-educational-buildings-view',
  templateUrl: './complete-titles-of-educational-buildings-view.component.html',
  styleUrls: ['./complete-titles-of-educational-buildings-view.component.scss'],
  providers: []
})

export class CompleteTitlesOfEducationalBuildingsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCompleteTitlesOfEducationalBuildings: CompleteTitlesOfEducationalBuildings;
  completeTitlesOfEducationalBuildingsForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCompleteTitlesOfEducationalBuildingsDialog: any,
    @Optional() public dialogRef: MatDialogRef<CompleteTitlesOfEducationalBuildingsViewComponent>,
    public completeTitlesOfEducationalBuildingsService: CompleteTitlesOfEducationalBuildingsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCompleteTitlesOfEducationalBuildings = this.selectedCompleteTitlesOfEducationalBuildingsDialog.data || this.selectedCompleteTitlesOfEducationalBuildings;

    

    this.completeTitlesOfEducationalBuildingsForm = this.formBuilder.group({
      
  buildingCode : [this.selectedCompleteTitlesOfEducationalBuildings.buildingCode],
  schoolAddress : [this.selectedCompleteTitlesOfEducationalBuildings.schoolAddress]
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
    return this.completeTitlesOfEducationalBuildingsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.completeTitlesOfEducationalBuildingsForm.controls)) {
      this.completeTitlesOfEducationalBuildingsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

