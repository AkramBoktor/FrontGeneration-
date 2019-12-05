
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ExternalBodiesEquippedForSchools } from 'app/shared/models/external-bodies-equipped-for-schools';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ExternalBodiesEquippedForSchoolsService } from '../shared/external-bodies-equipped-for-schools.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-external-bodies-equipped-for-schools-edit',
  templateUrl: './external-bodies-equipped-for-schools-edit.component.html',
  styleUrls: ['./external-bodies-equipped-for-schools-edit.component.scss'],
  providers: []
})

export class ExternalBodiesEquippedForSchoolsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedExternalBodiesEquippedForSchools: ExternalBodiesEquippedForSchools;
  externalBodiesEquippedForSchoolsForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedExternalBodiesEquippedForSchoolsDialog: any,
    @Optional() public dialogRef: MatDialogRef<ExternalBodiesEquippedForSchoolsEditComponent>,
    public externalBodiesEquippedForSchoolsService: ExternalBodiesEquippedForSchoolsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExternalBodiesEquippedForSchools = new ExternalBodiesEquippedForSchools();
    this.selectedExternalBodiesEquippedForSchools = this.selectedExternalBodiesEquippedForSchoolsDialog.data || this.selectedExternalBodiesEquippedForSchools;

    

    this.externalBodiesEquippedForSchoolsForm = this.formBuilder.group({
      
  id : [this.selectedExternalBodiesEquippedForSchools.id],
  supplierCode : [this.selectedExternalBodiesEquippedForSchools.supplierCode, [ ]],
  supplierName : [this.selectedExternalBodiesEquippedForSchools.supplierName, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.externalBodiesEquippedForSchoolsService.update(this.externalBodiesEquippedForSchoolsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.externalBodiesEquippedForSchoolsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.externalBodiesEquippedForSchoolsForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
