
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DataEntryForm129Corrections } from 'app/shared/models/data-entry-form-129-corrections';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { DataEntryForm129CorrectionsService } from '../shared/data-entry-form-129-corrections.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-data-entry-form-129-corrections-edit',
  templateUrl: './data-entry-form-129-corrections-edit.component.html',
  styleUrls: ['./data-entry-form-129-corrections-edit.component.scss'],
  providers: []
})

export class DataEntryForm129CorrectionsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataEntryForm129Corrections: DataEntryForm129Corrections;
  dataEntryForm129CorrectionsForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataEntryForm129CorrectionsDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataEntryForm129CorrectionsEditComponent>,
    public dataEntryForm129CorrectionsService: DataEntryForm129CorrectionsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataEntryForm129Corrections = new DataEntryForm129Corrections();
    this.selectedDataEntryForm129Corrections = this.selectedDataEntryForm129CorrectionsDialog.data || this.selectedDataEntryForm129Corrections;

    

    this.dataEntryForm129CorrectionsForm = this.formBuilder.group({
      
  id : [this.selectedDataEntryForm129Corrections.id],
  correctionNumber : [this.selectedDataEntryForm129Corrections.correctionNumber, [ Validators.required ]],
  month : [this.selectedDataEntryForm129Corrections.month, [ Validators.required ]],
  incomingNumber : [this.selectedDataEntryForm129Corrections.incomingNumber, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.dataEntryForm129CorrectionsService.update(this.dataEntryForm129CorrectionsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.dataEntryForm129CorrectionsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.dataEntryForm129CorrectionsForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
