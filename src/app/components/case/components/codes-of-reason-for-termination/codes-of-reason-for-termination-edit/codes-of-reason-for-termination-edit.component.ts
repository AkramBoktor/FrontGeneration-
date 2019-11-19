
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { CodesOfReasonForTermination } from 'app/shared/models/codes-of-reason-for-termination';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { CodesOfReasonForTerminationService } from '../shared/codes-of-reason-for-termination.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-codes-of-reason-for-termination-edit',
  templateUrl: './codes-of-reason-for-termination-edit.component.html',
  styleUrls: ['./codes-of-reason-for-termination-edit.component.scss'],
  providers: []
})

export class CodesOfReasonForTerminationEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCodesOfReasonForTermination: CodesOfReasonForTermination;
  codesOfReasonForTerminationForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCodesOfReasonForTerminationDialog: any,
    @Optional() public dialogRef: MatDialogRef<CodesOfReasonForTerminationEditComponent>,
    public codesOfReasonForTerminationService: CodesOfReasonForTerminationService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCodesOfReasonForTermination = new CodesOfReasonForTermination();
    this.selectedCodesOfReasonForTermination = this.selectedCodesOfReasonForTerminationDialog.data || this.selectedCodesOfReasonForTermination;

    

    this.codesOfReasonForTerminationForm = this.formBuilder.group({
      
  id : [this.selectedCodesOfReasonForTermination.id],
  code : [this.selectedCodesOfReasonForTermination.code, [ Validators.required ]],
  name : [this.selectedCodesOfReasonForTermination.name, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.codesOfReasonForTerminationService.update(this.codesOfReasonForTerminationForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.codesOfReasonForTerminationService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.codesOfReasonForTerminationForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
