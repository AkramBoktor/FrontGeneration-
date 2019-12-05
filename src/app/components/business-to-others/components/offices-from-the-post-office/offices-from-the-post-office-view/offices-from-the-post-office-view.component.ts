
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { OfficesFromThePostOffice } from 'app/shared/models/offices-from-the-post-office';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { OfficesFromThePostOfficeService } from '../shared/offices-from-the-post-office.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-offices-from-the-post-office-view',
  templateUrl: './offices-from-the-post-office-view.component.html',
  styleUrls: ['./offices-from-the-post-office-view.component.scss'],
  providers: []
})

export class OfficesFromThePostOfficeViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedOfficesFromThePostOffice: OfficesFromThePostOffice;
  officesFromThePostOfficeForm: FormGroup;

  private governoratesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedOfficesFromThePostOfficeDialog: any,
    @Optional() public dialogRef: MatDialogRef<OfficesFromThePostOfficeViewComponent>,
    public officesFromThePostOfficeService: OfficesFromThePostOfficeService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedOfficesFromThePostOffice = this.selectedOfficesFromThePostOfficeDialog.data || this.selectedOfficesFromThePostOffice;

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});


    this.officesFromThePostOfficeForm = this.formBuilder.group({
      
  postOfficeReceiptYear : [this.selectedOfficesFromThePostOffice.postOfficeReceiptYear],
  iD : [this.selectedOfficesFromThePostOffice.iD],
  officeNmae : [this.selectedOfficesFromThePostOffice.officeNmae],
  governorate : [this.selectedOfficesFromThePostOffice.governorate]
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
    return this.officesFromThePostOfficeForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.officesFromThePostOfficeForm.controls)) {
      this.officesFromThePostOfficeForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
  }
}

