
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { IntroducingTaxCodeForTheGovernorate } from 'app/shared/models/introducing-tax-code-for-the-governorate';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { IntroducingTaxCodeForTheGovernorateService } from '../shared/introducing-tax-code-for-the-governorate.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-introducing-tax-code-for-the-governorate-view',
  templateUrl: './introducing-tax-code-for-the-governorate-view.component.html',
  styleUrls: ['./introducing-tax-code-for-the-governorate-view.component.scss'],
  providers: []
})

export class IntroducingTaxCodeForTheGovernorateViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedIntroducingTaxCodeForTheGovernorate: IntroducingTaxCodeForTheGovernorate;
  introducingTaxCodeForTheGovernorateForm: FormGroup;

  private governoratesService: LookupService;

  
governorateCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedIntroducingTaxCodeForTheGovernorateDialog: any,
    @Optional() public dialogRef: MatDialogRef<IntroducingTaxCodeForTheGovernorateViewComponent>,
    public introducingTaxCodeForTheGovernorateService: IntroducingTaxCodeForTheGovernorateService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedIntroducingTaxCodeForTheGovernorate = this.selectedIntroducingTaxCodeForTheGovernorateDialog.data || this.selectedIntroducingTaxCodeForTheGovernorate;

    
	this.governorateCodeSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المحافظة',
	});


    this.introducingTaxCodeForTheGovernorateForm = this.formBuilder.group({
      
  mamoriaCode : [this.selectedIntroducingTaxCodeForTheGovernorate.mamoriaCode],
  mamoriaName : [this.selectedIntroducingTaxCodeForTheGovernorate.mamoriaName],
  governorateCode : [this.selectedIntroducingTaxCodeForTheGovernorate.governorateCode]
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
    return this.introducingTaxCodeForTheGovernorateForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.introducingTaxCodeForTheGovernorateForm.controls)) {
      this.introducingTaxCodeForTheGovernorateForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
  }
}

