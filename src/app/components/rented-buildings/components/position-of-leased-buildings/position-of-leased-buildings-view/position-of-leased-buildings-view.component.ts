
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { PositionOfLeasedBuildings } from 'app/shared/models/position-of-leased-buildings';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { PositionOfLeasedBuildingsService } from '../shared/position-of-leased-buildings.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-position-of-leased-buildings-view',
  templateUrl: './position-of-leased-buildings-view.component.html',
  styleUrls: ['./position-of-leased-buildings-view.component.scss'],
  providers: []
})

export class PositionOfLeasedBuildingsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPositionOfLeasedBuildings: PositionOfLeasedBuildings;
  positionOfLeasedBuildingsForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPositionOfLeasedBuildingsDialog: any,
    @Optional() public dialogRef: MatDialogRef<PositionOfLeasedBuildingsViewComponent>,
    public positionOfLeasedBuildingsService: PositionOfLeasedBuildingsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPositionOfLeasedBuildings = this.selectedPositionOfLeasedBuildingsDialog.data || this.selectedPositionOfLeasedBuildings;

    

    this.positionOfLeasedBuildingsForm = this.formBuilder.group({
      
  iD : [this.selectedPositionOfLeasedBuildings.iD],
  situation : [this.selectedPositionOfLeasedBuildings.situation]
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
    return this.positionOfLeasedBuildingsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.positionOfLeasedBuildingsForm.controls)) {
      this.positionOfLeasedBuildingsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

