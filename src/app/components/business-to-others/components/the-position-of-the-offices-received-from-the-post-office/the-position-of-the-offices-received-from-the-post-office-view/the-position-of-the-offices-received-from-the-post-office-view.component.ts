
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ThePositionOfTheOfficesReceivedFromThePostOffice } from 'app/shared/models/the-position-of-the-offices-received-from-the-post-office';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ThePositionOfTheOfficesReceivedFromThePostOfficeService } from '../shared/the-position-of-the-offices-received-from-the-post-office.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-the-position-of-the-offices-received-from-the-post-office-view',
  templateUrl: './the-position-of-the-offices-received-from-the-post-office-view.component.html',
  styleUrls: ['./the-position-of-the-offices-received-from-the-post-office-view.component.scss'],
  providers: []
})

export class ThePositionOfTheOfficesReceivedFromThePostOfficeViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedThePositionOfTheOfficesReceivedFromThePostOffice: ThePositionOfTheOfficesReceivedFromThePostOffice;
  thePositionOfTheOfficesReceivedFromThePostOfficeForm: FormGroup;

  private governoratesService: LookupService;
private yesOrNosService: LookupService;

private surveyingStatusesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
officeIsCanceledOrDeferredSelectOptions: MaterialSelectOptions;
duplicatedOfficeSelectOptions: MaterialSelectOptions;
undevelopedSelectOptions: MaterialSelectOptions;
surveyingStatusSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedThePositionOfTheOfficesReceivedFromThePostOfficeDialog: any,
    @Optional() public dialogRef: MatDialogRef<ThePositionOfTheOfficesReceivedFromThePostOfficeViewComponent>,
    public thePositionOfTheOfficesReceivedFromThePostOfficeService: ThePositionOfTheOfficesReceivedFromThePostOfficeService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedThePositionOfTheOfficesReceivedFromThePostOffice = this.selectedThePositionOfTheOfficesReceivedFromThePostOfficeDialog.data || this.selectedThePositionOfTheOfficesReceivedFromThePostOffice;

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});

	this.officeIsCanceledOrDeferredSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المكتب ملغي او مؤجل',
	});

	this.duplicatedOfficeSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المكتب مكرر',
	});

	this.undevelopedSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'غير قابل للتطوير',
	});

	this.surveyingStatusSelectOptions = new MaterialSelectOptions({
	 data: this.surveyingStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف الرفع المساحي',
	});


    this.thePositionOfTheOfficesReceivedFromThePostOfficeForm = this.formBuilder.group({
      
  postOfficeReceiptYear : [this.selectedThePositionOfTheOfficesReceivedFromThePostOffice.postOfficeReceiptYear],
  iD : [this.selectedThePositionOfTheOfficesReceivedFromThePostOffice.iD],
  governorate : [this.selectedThePositionOfTheOfficesReceivedFromThePostOffice.governorate],
  officeIsCanceledOrDeferred : [this.selectedThePositionOfTheOfficesReceivedFromThePostOffice.officeIsCanceledOrDeferred],
  duplicatedOffice : [this.selectedThePositionOfTheOfficesReceivedFromThePostOffice.duplicatedOffice],
  undeveloped : [this.selectedThePositionOfTheOfficesReceivedFromThePostOffice.undeveloped],
  surveyingStatus : [this.selectedThePositionOfTheOfficesReceivedFromThePostOffice.surveyingStatus]
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
    return this.thePositionOfTheOfficesReceivedFromThePostOfficeForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.thePositionOfTheOfficesReceivedFromThePostOfficeForm.controls)) {
      this.thePositionOfTheOfficesReceivedFromThePostOfficeForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.yesOrNosService = new LookupService('yesornos', this.http);
this.yesOrNosService = new LookupService('yesornos', this.http);
this.yesOrNosService = new LookupService('yesornos', this.http);
this.surveyingStatusesService = new LookupService('surveyingstatuses', this.http);
  }
}

