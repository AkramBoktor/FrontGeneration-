
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { RegisterANewCollectionCode } from 'app/shared/models/register-a-new-collection-code';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { RegisterANewCollectionCodeService } from '../shared/register-a-new-collection-code.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-register-a-new-collection-code-edit',
  templateUrl: './register-a-new-collection-code-edit.component.html',
  styleUrls: ['./register-a-new-collection-code-edit.component.scss'],
  providers: []
})

export class RegisterANewCollectionCodeEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRegisterANewCollectionCode: RegisterANewCollectionCode;
  registerANewCollectionCodeForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRegisterANewCollectionCodeDialog: any,
    @Optional() public dialogRef: MatDialogRef<RegisterANewCollectionCodeEditComponent>,
    public registerANewCollectionCodeService: RegisterANewCollectionCodeService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRegisterANewCollectionCode = new RegisterANewCollectionCode();
    this.selectedRegisterANewCollectionCode = this.selectedRegisterANewCollectionCodeDialog.data || this.selectedRegisterANewCollectionCode;

    

    this.registerANewCollectionCodeForm = this.formBuilder.group({
      
  id : [this.selectedRegisterANewCollectionCode.id],
  collectionCode : [this.selectedRegisterANewCollectionCode.collectionCode, [ Validators.required ]],
  collectionAmount : [this.selectedRegisterANewCollectionCode.collectionAmount, [ Validators.required ]],
  collectionName : [this.selectedRegisterANewCollectionCode.collectionName, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.registerANewCollectionCodeService.update(this.registerANewCollectionCodeForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.registerANewCollectionCodeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.registerANewCollectionCodeForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
