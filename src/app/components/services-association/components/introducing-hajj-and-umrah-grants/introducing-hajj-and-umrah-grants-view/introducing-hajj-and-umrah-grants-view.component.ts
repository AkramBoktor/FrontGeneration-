
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { IntroducingHajjAndUmrahGrants } from 'app/shared/models/introducing-hajj-and-umrah-grants';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { IntroducingHajjAndUmrahGrantsService } from '../shared/introducing-hajj-and-umrah-grants.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-introducing-hajj-and-umrah-grants-view',
  templateUrl: './introducing-hajj-and-umrah-grants-view.component.html',
  styleUrls: ['./introducing-hajj-and-umrah-grants-view.component.scss'],
  providers: []
})

export class IntroducingHajjAndUmrahGrantsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedIntroducingHajjAndUmrahGrants: IntroducingHajjAndUmrahGrants;
  introducingHajjAndUmrahGrantsForm: FormGroup;

  private statusCodesService: LookupService;
private paymentTypesService: LookupService;
private travelTypesService: LookupService;

  
statusSelectOptions: MaterialSelectOptions;
paymentTypeSelectOptions: MaterialSelectOptions;
travelTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedIntroducingHajjAndUmrahGrantsDialog: any,
    @Optional() public dialogRef: MatDialogRef<IntroducingHajjAndUmrahGrantsViewComponent>,
    public introducingHajjAndUmrahGrantsService: IntroducingHajjAndUmrahGrantsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedIntroducingHajjAndUmrahGrants = this.selectedIntroducingHajjAndUmrahGrantsDialog.data || this.selectedIntroducingHajjAndUmrahGrants;

    
	this.statusSelectOptions = new MaterialSelectOptions({
	 data: this.statusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' الحالة',
	});

	this.paymentTypeSelectOptions = new MaterialSelectOptions({
	 data: this.paymentTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' نوع السداد',
	});

	this.travelTypeSelectOptions = new MaterialSelectOptions({
	 data: this.travelTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' نوع السفر',
	});


    this.introducingHajjAndUmrahGrantsForm = this.formBuilder.group({
      
  employeeCode : [this.selectedIntroducingHajjAndUmrahGrants.employeeCode],
  employeeName : [this.selectedIntroducingHajjAndUmrahGrants.employeeName],
  membershipNo : [this.selectedIntroducingHajjAndUmrahGrants.membershipNo],
  date : [this.selectedIntroducingHajjAndUmrahGrants.date],
  memberTicketValue : [this.selectedIntroducingHajjAndUmrahGrants.memberTicketValue],
  utilitiesTicketValue : [this.selectedIntroducingHajjAndUmrahGrants.utilitiesTicketValue],
  supportValue : [this.selectedIntroducingHajjAndUmrahGrants.supportValue],
  installmentsNumber : [this.selectedIntroducingHajjAndUmrahGrants.installmentsNumber],
  installmentsValue : [this.selectedIntroducingHajjAndUmrahGrants.installmentsValue],
  companionsNumber : [this.selectedIntroducingHajjAndUmrahGrants.companionsNumber],
  utilitiesName : [this.selectedIntroducingHajjAndUmrahGrants.utilitiesName],
  status : [this.selectedIntroducingHajjAndUmrahGrants.status],
  paymentType : [this.selectedIntroducingHajjAndUmrahGrants.paymentType],
  travelType : [this.selectedIntroducingHajjAndUmrahGrants.travelType]
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
    return this.introducingHajjAndUmrahGrantsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.introducingHajjAndUmrahGrantsForm.controls)) {
      this.introducingHajjAndUmrahGrantsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.statusCodesService = new LookupService('statuscodes', this.http);
this.paymentTypesService = new LookupService('paymenttypes', this.http);
this.travelTypesService = new LookupService('traveltypes', this.http);
  }
}

