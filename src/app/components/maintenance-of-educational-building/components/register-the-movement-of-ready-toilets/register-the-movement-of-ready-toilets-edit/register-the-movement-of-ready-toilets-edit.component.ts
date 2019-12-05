
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { RegisterTheMovementOfReadyToilets } from 'app/shared/models/register-the-movement-of-ready-toilets';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { RegisterTheMovementOfReadyToiletsService } from '../shared/register-the-movement-of-ready-toilets.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-register-the-movement-of-ready-toilets-edit',
  templateUrl: './register-the-movement-of-ready-toilets-edit.component.html',
  styleUrls: ['./register-the-movement-of-ready-toilets-edit.component.scss'],
  providers: []
})

export class RegisterTheMovementOfReadyToiletsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRegisterTheMovementOfReadyToilets: RegisterTheMovementOfReadyToilets;
  registerTheMovementOfReadyToiletsForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private governoratesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRegisterTheMovementOfReadyToiletsDialog: any,
    @Optional() public dialogRef: MatDialogRef<RegisterTheMovementOfReadyToiletsEditComponent>,
    public registerTheMovementOfReadyToiletsService: RegisterTheMovementOfReadyToiletsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRegisterTheMovementOfReadyToilets = new RegisterTheMovementOfReadyToilets();
    this.selectedRegisterTheMovementOfReadyToilets = this.selectedRegisterTheMovementOfReadyToiletsDialog.data || this.selectedRegisterTheMovementOfReadyToilets;

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظه ',
	});


    this.registerTheMovementOfReadyToiletsForm = this.formBuilder.group({
      
  id : [this.selectedRegisterTheMovementOfReadyToilets.id],
  orderDate : [this.selectedRegisterTheMovementOfReadyToilets.orderDate, [ Validators.required ]],
  toiletCode : [this.selectedRegisterTheMovementOfReadyToilets.toiletCode, [ Validators.required ]],
  schoolRequiredTransport : [this.selectedRegisterTheMovementOfReadyToilets.schoolRequiredTransport, [ Validators.required ]],
  transportationSchool : [this.selectedRegisterTheMovementOfReadyToilets.transportationSchool, [ Validators.required ]],
  governorate : [this.selectedRegisterTheMovementOfReadyToilets.governorate, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.registerTheMovementOfReadyToiletsService.update(this.registerTheMovementOfReadyToiletsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.registerTheMovementOfReadyToiletsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.registerTheMovementOfReadyToiletsForm.get(name);
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
  }
}
