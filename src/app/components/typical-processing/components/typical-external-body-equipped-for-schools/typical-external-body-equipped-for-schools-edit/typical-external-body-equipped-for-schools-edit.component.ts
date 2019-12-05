
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TypicalExternalBodyEquippedForSchools } from 'app/shared/models/typical-external-body-equipped-for-schools';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { TypicalExternalBodyEquippedForSchoolsService } from '../shared/typical-external-body-equipped-for-schools.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-typical-external-body-equipped-for-schools-edit',
  templateUrl: './typical-external-body-equipped-for-schools-edit.component.html',
  styleUrls: ['./typical-external-body-equipped-for-schools-edit.component.scss'],
  providers: []
})

export class TypicalExternalBodyEquippedForSchoolsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTypicalExternalBodyEquippedForSchools: TypicalExternalBodyEquippedForSchools;
  typicalExternalBodyEquippedForSchoolsForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTypicalExternalBodyEquippedForSchoolsDialog: any,
    @Optional() public dialogRef: MatDialogRef<TypicalExternalBodyEquippedForSchoolsEditComponent>,
    public typicalExternalBodyEquippedForSchoolsService: TypicalExternalBodyEquippedForSchoolsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTypicalExternalBodyEquippedForSchools = new TypicalExternalBodyEquippedForSchools();
    this.selectedTypicalExternalBodyEquippedForSchools = this.selectedTypicalExternalBodyEquippedForSchoolsDialog.data || this.selectedTypicalExternalBodyEquippedForSchools;

    

    this.typicalExternalBodyEquippedForSchoolsForm = this.formBuilder.group({
      
  id : [this.selectedTypicalExternalBodyEquippedForSchools.id],
  supplierName : [this.selectedTypicalExternalBodyEquippedForSchools.supplierName, [ ]],
  supplierCode : [this.selectedTypicalExternalBodyEquippedForSchools.supplierCode, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.typicalExternalBodyEquippedForSchoolsService.update(this.typicalExternalBodyEquippedForSchoolsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.typicalExternalBodyEquippedForSchoolsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.typicalExternalBodyEquippedForSchoolsForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
