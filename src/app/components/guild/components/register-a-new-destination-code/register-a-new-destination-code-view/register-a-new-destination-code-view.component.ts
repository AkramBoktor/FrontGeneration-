
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { RegisterANewDestinationCode } from 'app/shared/models/register-a-new-destination-code';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { RegisterANewDestinationCodeService } from '../shared/register-a-new-destination-code.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-register-a-new-destination-code-view',
  templateUrl: './register-a-new-destination-code-view.component.html',
  styleUrls: ['./register-a-new-destination-code-view.component.scss'],
  providers: []
})

export class RegisterANewDestinationCodeViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRegisterANewDestinationCode: RegisterANewDestinationCode;
  registerANewDestinationCodeForm: FormGroup;

  private entityCodesService: LookupService;

  
entityCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRegisterANewDestinationCodeDialog: any,
    @Optional() public dialogRef: MatDialogRef<RegisterANewDestinationCodeViewComponent>,
    public registerANewDestinationCodeService: RegisterANewDestinationCodeService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRegisterANewDestinationCode = this.selectedRegisterANewDestinationCodeDialog.data || this.selectedRegisterANewDestinationCode;

    
	this.entityCodeSelectOptions = new MaterialSelectOptions({
	 data: this.entityCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' كود  الجهة ',
	});


    this.registerANewDestinationCodeForm = this.formBuilder.group({
      
  entityAmount : [this.selectedRegisterANewDestinationCode.entityAmount],
  entityName : [this.selectedRegisterANewDestinationCode.entityName],
  entityCode : [this.selectedRegisterANewDestinationCode.entityCode]
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
    return this.registerANewDestinationCodeForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.registerANewDestinationCodeForm.controls)) {
      this.registerANewDestinationCodeForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.entityCodesService = new LookupService('entitycodes', this.http);
  }
}

