
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TemporarySeizureData } from 'app/shared/models/temporary-seizure-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { TemporarySeizureDataService } from '../shared/temporary-seizure-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-temporary-seizure-data-edit',
  templateUrl: './temporary-seizure-data-edit.component.html',
  styleUrls: ['./temporary-seizure-data-edit.component.scss'],
  providers: []
})

export class TemporarySeizureDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTemporarySeizureData: TemporarySeizureData;
  temporarySeizureDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTemporarySeizureDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<TemporarySeizureDataEditComponent>,
    public temporarySeizureDataService: TemporarySeizureDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTemporarySeizureData = new TemporarySeizureData();
    this.selectedTemporarySeizureData = this.selectedTemporarySeizureDataDialog.data || this.selectedTemporarySeizureData;

    

    this.temporarySeizureDataForm = this.formBuilder.group({
      
  id : [this.selectedTemporarySeizureData.id],
  schoolNumber : [this.selectedTemporarySeizureData.schoolNumber, [ Validators.required ]],
  temporarySeizureNumber : [this.selectedTemporarySeizureData.temporarySeizureNumber, [ Validators.required ]],
  dateOfTemporarySeizure : [this.selectedTemporarySeizureData.dateOfTemporarySeizure, [ Validators.required ]],
  numberOfPublicationsInEgyptianFacts : [this.selectedTemporarySeizureData.numberOfPublicationsInEgyptianFacts, [ Validators.required ]],
  dateOfPublicationInTheEgyptianFacts : [this.selectedTemporarySeizureData.dateOfPublicationInTheEgyptianFacts, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.temporarySeizureDataService.update(this.temporarySeizureDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.temporarySeizureDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.temporarySeizureDataForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
