
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { NumberToCreateID } from 'app/shared/models/number-to-create-id';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { NumberToCreateIDService } from '../shared/number-to-create-id.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-number-to-create-id-edit',
  templateUrl: './number-to-create-id-edit.component.html',
  styleUrls: ['./number-to-create-id-edit.component.scss'],
  providers: []
})

export class NumberToCreateIDEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedNumberToCreateID: NumberToCreateID;
  numberToCreateIDForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedNumberToCreateIDDialog: any,
    @Optional() public dialogRef: MatDialogRef<NumberToCreateIDEditComponent>,
    public numberToCreateIDService: NumberToCreateIDService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedNumberToCreateID = new NumberToCreateID();
    this.selectedNumberToCreateID = this.selectedNumberToCreateIDDialog.data || this.selectedNumberToCreateID;

    

    this.numberToCreateIDForm = this.formBuilder.group({
      
  id : [this.selectedNumberToCreateID.id],
  number : [this.selectedNumberToCreateID.number, [ Validators.required ]],
  checkDigit : [this.selectedNumberToCreateID.checkDigit, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.numberToCreateIDService.update(this.numberToCreateIDForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.numberToCreateIDService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.numberToCreateIDForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
