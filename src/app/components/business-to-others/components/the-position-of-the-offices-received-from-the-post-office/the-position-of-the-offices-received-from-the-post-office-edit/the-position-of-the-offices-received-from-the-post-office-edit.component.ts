
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ThePositionOfTheOfficesReceivedFromThePostOffice } from 'app/shared/models/the-position-of-the-offices-received-from-the-post-office';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ThePositionOfTheOfficesReceivedFromThePostOfficeService } from '../shared/the-position-of-the-offices-received-from-the-post-office.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-the-position-of-the-offices-received-from-the-post-office-edit',
  templateUrl: './the-position-of-the-offices-received-from-the-post-office-edit.component.html',
  styleUrls: ['./the-position-of-the-offices-received-from-the-post-office-edit.component.scss'],
  providers: []
})

export class ThePositionOfTheOfficesReceivedFromThePostOfficeEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedThePositionOfTheOfficesReceivedFromThePostOffice: ThePositionOfTheOfficesReceivedFromThePostOffice;
  thePositionOfTheOfficesReceivedFromThePostOfficeForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private governoratesService: LookupService;
private yesOrNosService: LookupService;

private surveyingStatusesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
officeIsCanceledOrDeferredSelectOptions: MaterialSelectOptions;
duplicatedOfficeSelectOptions: MaterialSelectOptions;
undevelopedSelectOptions: MaterialSelectOptions;
surveyingStatusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('officeIsCanceledOrDeferred', { static: true }) OfficeIsCanceledOrDeferredSelectComponent: MaterialSelectComponent;
	@ViewChild('duplicatedOffice', { static: true }) DuplicatedOfficeSelectComponent: MaterialSelectComponent;
	@ViewChild('undeveloped', { static: true }) UndevelopedSelectComponent: MaterialSelectComponent;
	@ViewChild('surveyingStatus', { static: true }) SurveyingStatusSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedThePositionOfTheOfficesReceivedFromThePostOfficeDialog: any,
    @Optional() public dialogRef: MatDialogRef<ThePositionOfTheOfficesReceivedFromThePostOfficeEditComponent>,
    public thePositionOfTheOfficesReceivedFromThePostOfficeService: ThePositionOfTheOfficesReceivedFromThePostOfficeService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedThePositionOfTheOfficesReceivedFromThePostOffice = new ThePositionOfTheOfficesReceivedFromThePostOffice();
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
      
  id : [this.selectedThePositionOfTheOfficesReceivedFromThePostOffice.id],
  postOfficeReceiptYear : [this.selectedThePositionOfTheOfficesReceivedFromThePostOffice.postOfficeReceiptYear, [ Validators.required ]],
  iD : [this.selectedThePositionOfTheOfficesReceivedFromThePostOffice.iD, [ Validators.required ]],
  governorate : [this.selectedThePositionOfTheOfficesReceivedFromThePostOffice.governorate, [ Validators.required ]],
  officeIsCanceledOrDeferred : [this.selectedThePositionOfTheOfficesReceivedFromThePostOffice.officeIsCanceledOrDeferred, [ Validators.required ]],
  duplicatedOffice : [this.selectedThePositionOfTheOfficesReceivedFromThePostOffice.duplicatedOffice, [ Validators.required ]],
  undeveloped : [this.selectedThePositionOfTheOfficesReceivedFromThePostOffice.undeveloped, [ Validators.required ]],
  surveyingStatus : [this.selectedThePositionOfTheOfficesReceivedFromThePostOffice.surveyingStatus, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.thePositionOfTheOfficesReceivedFromThePostOfficeService.update(this.thePositionOfTheOfficesReceivedFromThePostOfficeForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.thePositionOfTheOfficesReceivedFromThePostOfficeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.thePositionOfTheOfficesReceivedFromThePostOfficeForm.get(name);
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.yesOrNosService = new LookupService('yesornos', this.http);
this.yesOrNosService = new LookupService('yesornos', this.http);
this.yesOrNosService = new LookupService('yesornos', this.http);
this.surveyingStatusesService = new LookupService('surveyingstatuses', this.http);
  }
}
