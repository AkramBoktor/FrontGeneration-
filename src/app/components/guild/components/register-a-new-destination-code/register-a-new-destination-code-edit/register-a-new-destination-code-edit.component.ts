
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { RegisterANewDestinationCode } from 'app/shared/models/register-a-new-destination-code';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { RegisterANewDestinationCodeService } from '../shared/register-a-new-destination-code.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-register-a-new-destination-code-edit',
  templateUrl: './register-a-new-destination-code-edit.component.html',
  styleUrls: ['./register-a-new-destination-code-edit.component.scss'],
  providers: []
})

export class RegisterANewDestinationCodeEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRegisterANewDestinationCode: RegisterANewDestinationCode;
  registerANewDestinationCodeForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private entityCodesService: LookupService;

  
entityCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('entityCode', { static: true }) EntityCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRegisterANewDestinationCodeDialog: any,
    @Optional() public dialogRef: MatDialogRef<RegisterANewDestinationCodeEditComponent>,
    public registerANewDestinationCodeService: RegisterANewDestinationCodeService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRegisterANewDestinationCode = new RegisterANewDestinationCode();
    this.selectedRegisterANewDestinationCode = this.selectedRegisterANewDestinationCodeDialog.data || this.selectedRegisterANewDestinationCode;

    
	this.entityCodeSelectOptions = new MaterialSelectOptions({
	 data: this.entityCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' كود  الجهة ',
	});


    this.registerANewDestinationCodeForm = this.formBuilder.group({
      
  id : [this.selectedRegisterANewDestinationCode.id],
  entityAmount : [this.selectedRegisterANewDestinationCode.entityAmount, [ Validators.required ]],
  entityName : [this.selectedRegisterANewDestinationCode.entityName, [ Validators.required ]],
  entityCode : [this.selectedRegisterANewDestinationCode.entityCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.registerANewDestinationCodeService.update(this.registerANewDestinationCodeForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.registerANewDestinationCodeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.registerANewDestinationCodeForm.get(name);
  }

  initializeLookupServices() {
    this.entityCodesService = new LookupService('entitycodes', this.http);
  }
}
