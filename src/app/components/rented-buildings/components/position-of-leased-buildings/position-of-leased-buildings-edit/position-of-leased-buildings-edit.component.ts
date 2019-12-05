
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { PositionOfLeasedBuildings } from 'app/shared/models/position-of-leased-buildings';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { PositionOfLeasedBuildingsService } from '../shared/position-of-leased-buildings.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-position-of-leased-buildings-edit',
  templateUrl: './position-of-leased-buildings-edit.component.html',
  styleUrls: ['./position-of-leased-buildings-edit.component.scss'],
  providers: []
})

export class PositionOfLeasedBuildingsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPositionOfLeasedBuildings: PositionOfLeasedBuildings;
  positionOfLeasedBuildingsForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPositionOfLeasedBuildingsDialog: any,
    @Optional() public dialogRef: MatDialogRef<PositionOfLeasedBuildingsEditComponent>,
    public positionOfLeasedBuildingsService: PositionOfLeasedBuildingsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPositionOfLeasedBuildings = new PositionOfLeasedBuildings();
    this.selectedPositionOfLeasedBuildings = this.selectedPositionOfLeasedBuildingsDialog.data || this.selectedPositionOfLeasedBuildings;

    

    this.positionOfLeasedBuildingsForm = this.formBuilder.group({
      
  id : [this.selectedPositionOfLeasedBuildings.id],
  iD : [this.selectedPositionOfLeasedBuildings.iD, [ Validators.required ]],
  situation : [this.selectedPositionOfLeasedBuildings.situation, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.positionOfLeasedBuildingsService.update(this.positionOfLeasedBuildingsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.positionOfLeasedBuildingsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.positionOfLeasedBuildingsForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
