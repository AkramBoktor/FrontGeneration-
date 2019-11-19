
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SanctionsFund } from 'app/shared/models/sanctions-fund';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SanctionsFundService } from '../shared/sanctions-fund.service';

@Component({
  selector: 'app-sanctions-fund-view',
  templateUrl: './sanctions-fund-view.component.html',
  styleUrls: ['./sanctions-fund-view.component.scss'],
  providers: []
})

export class SanctionsFundViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSanctionsFund: SanctionsFund;
  sanctionsFundForm: FormGroup;

  private deathCodesService: LookupService;

  
deathCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSanctionsFundDialog: any,
    @Optional() public dialogRef: MatDialogRef<SanctionsFundViewComponent>,
    public sanctionsFundService: SanctionsFundService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSanctionsFund = this.selectedSanctionsFundDialog.data || this.selectedSanctionsFund;

    
	this.deathCodeSelectOptions = new MaterialSelectOptions({
	 data: this.deathCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود منحة الوفاة',
	});


    this.sanctionsFundForm = this.formBuilder.group({
      
  employeeCode : [this.selectedSanctionsFund.employeeCode],
  demandDate : [this.selectedSanctionsFund.demandDate],
  deathDate : [this.selectedSanctionsFund.deathDate],
  amount : [this.selectedSanctionsFund.amount],
  dietName : [this.selectedSanctionsFund.dietName],
  receiverName : [this.selectedSanctionsFund.receiverName],
  deathCode : [this.selectedSanctionsFund.deathCode]
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
    return this.sanctionsFundForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.sanctionsFundForm.controls)) {
      this.sanctionsFundForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.deathCodesService = new LookupService('deathcodes', this.http);
  }
}

