
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { CompleteTitlesOfEducationalBuildings } from 'app/shared/models/complete-titles-of-educational-buildings';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { CompleteTitlesOfEducationalBuildingsService } from '../shared/complete-titles-of-educational-buildings.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-complete-titles-of-educational-buildings-edit',
  templateUrl: './complete-titles-of-educational-buildings-edit.component.html',
  styleUrls: ['./complete-titles-of-educational-buildings-edit.component.scss'],
  providers: []
})

export class CompleteTitlesOfEducationalBuildingsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCompleteTitlesOfEducationalBuildings: CompleteTitlesOfEducationalBuildings;
  completeTitlesOfEducationalBuildingsForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCompleteTitlesOfEducationalBuildingsDialog: any,
    @Optional() public dialogRef: MatDialogRef<CompleteTitlesOfEducationalBuildingsEditComponent>,
    public completeTitlesOfEducationalBuildingsService: CompleteTitlesOfEducationalBuildingsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCompleteTitlesOfEducationalBuildings = new CompleteTitlesOfEducationalBuildings();
    this.selectedCompleteTitlesOfEducationalBuildings = this.selectedCompleteTitlesOfEducationalBuildingsDialog.data || this.selectedCompleteTitlesOfEducationalBuildings;

    

    this.completeTitlesOfEducationalBuildingsForm = this.formBuilder.group({
      
  id : [this.selectedCompleteTitlesOfEducationalBuildings.id],
  buildingCode : [this.selectedCompleteTitlesOfEducationalBuildings.buildingCode, [ Validators.required ]],
  schoolAddress : [this.selectedCompleteTitlesOfEducationalBuildings.schoolAddress, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.completeTitlesOfEducationalBuildingsService.update(this.completeTitlesOfEducationalBuildingsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.completeTitlesOfEducationalBuildingsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.completeTitlesOfEducationalBuildingsForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
