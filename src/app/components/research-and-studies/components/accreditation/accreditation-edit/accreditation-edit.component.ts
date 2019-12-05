
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { Accreditation } from 'app/shared/models/accreditation';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { AccreditationService } from '../shared/accreditation.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-accreditation-edit',
  templateUrl: './accreditation-edit.component.html',
  styleUrls: ['./accreditation-edit.component.scss'],
  providers: []
})

export class AccreditationEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAccreditation: Accreditation;
  accreditationForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAccreditationDialog: any,
    @Optional() public dialogRef: MatDialogRef<AccreditationEditComponent>,
    public accreditationService: AccreditationService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAccreditation = new Accreditation();
    this.selectedAccreditation = this.selectedAccreditationDialog.data || this.selectedAccreditation;

    

    this.accreditationForm = this.formBuilder.group({
      
  id : [this.selectedAccreditation.id],
  accreditationCode : [this.selectedAccreditation.accreditationCode, [ Validators.required ]],
  accreditationName : [this.selectedAccreditation.accreditationName, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.accreditationService.update(this.accreditationForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.accreditationService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.accreditationForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
