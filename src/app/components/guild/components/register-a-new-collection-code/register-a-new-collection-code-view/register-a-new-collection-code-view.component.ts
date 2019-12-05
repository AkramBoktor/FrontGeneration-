
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { RegisterANewCollectionCode } from 'app/shared/models/register-a-new-collection-code';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { RegisterANewCollectionCodeService } from '../shared/register-a-new-collection-code.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-register-a-new-collection-code-view',
  templateUrl: './register-a-new-collection-code-view.component.html',
  styleUrls: ['./register-a-new-collection-code-view.component.scss'],
  providers: []
})

export class RegisterANewCollectionCodeViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRegisterANewCollectionCode: RegisterANewCollectionCode;
  registerANewCollectionCodeForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRegisterANewCollectionCodeDialog: any,
    @Optional() public dialogRef: MatDialogRef<RegisterANewCollectionCodeViewComponent>,
    public registerANewCollectionCodeService: RegisterANewCollectionCodeService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRegisterANewCollectionCode = this.selectedRegisterANewCollectionCodeDialog.data || this.selectedRegisterANewCollectionCode;

    

    this.registerANewCollectionCodeForm = this.formBuilder.group({
      
  collectionCode : [this.selectedRegisterANewCollectionCode.collectionCode],
  collectionAmount : [this.selectedRegisterANewCollectionCode.collectionAmount],
  collectionName : [this.selectedRegisterANewCollectionCode.collectionName]
      });

    this.disableControls();
  }

  onConfirm() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  getErrorMessage = (formCtrl: AbstractControl) => {
    const errorMessages: FormControlError[] = [
          
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.registerANewCollectionCodeForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.registerANewCollectionCodeForm.controls)) {
      this.registerANewCollectionCodeForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

