
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { RegisterTheMovementOfReadyToilets } from 'app/shared/models/register-the-movement-of-ready-toilets';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { RegisterTheMovementOfReadyToiletsService } from '../shared/register-the-movement-of-ready-toilets.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-register-the-movement-of-ready-toilets-view',
  templateUrl: './register-the-movement-of-ready-toilets-view.component.html',
  styleUrls: ['./register-the-movement-of-ready-toilets-view.component.scss'],
  providers: []
})

export class RegisterTheMovementOfReadyToiletsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRegisterTheMovementOfReadyToilets: RegisterTheMovementOfReadyToilets;
  registerTheMovementOfReadyToiletsForm: FormGroup;

  private governoratesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRegisterTheMovementOfReadyToiletsDialog: any,
    @Optional() public dialogRef: MatDialogRef<RegisterTheMovementOfReadyToiletsViewComponent>,
    public registerTheMovementOfReadyToiletsService: RegisterTheMovementOfReadyToiletsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRegisterTheMovementOfReadyToilets = this.selectedRegisterTheMovementOfReadyToiletsDialog.data || this.selectedRegisterTheMovementOfReadyToilets;

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظه ',
	});


    this.registerTheMovementOfReadyToiletsForm = this.formBuilder.group({
      
  orderDate : [this.selectedRegisterTheMovementOfReadyToilets.orderDate],
  toiletCode : [this.selectedRegisterTheMovementOfReadyToilets.toiletCode],
  schoolRequiredTransport : [this.selectedRegisterTheMovementOfReadyToilets.schoolRequiredTransport],
  transportationSchool : [this.selectedRegisterTheMovementOfReadyToilets.transportationSchool],
  governorate : [this.selectedRegisterTheMovementOfReadyToilets.governorate]
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
    return this.registerTheMovementOfReadyToiletsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.registerTheMovementOfReadyToiletsForm.controls)) {
      this.registerTheMovementOfReadyToiletsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
  }
}

