
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ChairmanVisa } from 'app/shared/models/chairman-visa';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ChairmanVisaService } from '../shared/chairman-visa.service';

@Component({
  selector: 'app-chairman-visa-view',
  templateUrl: './chairman-visa-view.component.html',
  styleUrls: ['./chairman-visa-view.component.scss'],
  providers: []
})

export class ChairmanVisaViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedChairmanVisa: ChairmanVisa;
  chairmanVisaForm: FormGroup;

  private publishingAuthoritiesService: LookupService;
private publishingPlacesService: LookupService;
private entityTypeService: LookupService;
private subDepartmentsService: LookupService;
private displayTypesService: LookupService;
private centralDepartmentsService: LookupService;
private displayResultsService: LookupService;

  
publisherCodeSelectOptions: MaterialSelectOptions;
publicationCodePlaceSelectOptions: MaterialSelectOptions;
entityTypeCodeSelectOptions: MaterialSelectOptions;
specificEntityCodeSelectOptions: MaterialSelectOptions;
displaySelectOptions: MaterialSelectOptions;
aMCodeSelectOptions: MaterialSelectOptions;
aFCodeSelectOptions: MaterialSelectOptions;
showResultSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedChairmanVisaDialog: any,
    @Optional() public dialogRef: MatDialogRef<ChairmanVisaViewComponent>,
    public chairmanVisaService: ChairmanVisaService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedChairmanVisa = this.selectedChairmanVisaDialog.data || this.selectedChairmanVisa;

    
	this.publisherCodeSelectOptions = new MaterialSelectOptions({
	 data: this.publishingAuthoritiesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود جهة النشر',
	});

	this.publicationCodePlaceSelectOptions = new MaterialSelectOptions({
	 data: this.publishingPlacesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود مكان النشر',
	});

	this.entityTypeCodeSelectOptions = new MaterialSelectOptions({
	 data: this.entityTypeService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود نوع الجهة',
	});

	this.specificEntityCodeSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الجهة المعنية',
	});

	this.displaySelectOptions = new MaterialSelectOptions({
	 data: this.displayTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'العرض',
	});

	this.aMCodeSelectOptions = new MaterialSelectOptions({
	 data: this.centralDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود أ.م المؤشر لها',
	});

	this.aFCodeSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود أ.ف المؤشر لها',
	});

	this.showResultSelectOptions = new MaterialSelectOptions({
	 data: this.displayResultsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نتيجة العرض',
	});


    this.chairmanVisaForm = this.formBuilder.group({
      
  pageNumber : [this.selectedChairmanVisa.pageNumber],
  publicationDate : [this.selectedChairmanVisa.publicationDate],
  presentationDate : [this.selectedChairmanVisa.presentationDate],
  visaDate : [this.selectedChairmanVisa.visaDate],
  serial : [this.selectedChairmanVisa.serial],
  visaText : [this.selectedChairmanVisa.visaText],
  publisherCode : [this.selectedChairmanVisa.publisherCode],
  publicationCodePlace : [this.selectedChairmanVisa.publicationCodePlace],
  entityTypeCode : [this.selectedChairmanVisa.entityTypeCode],
  specificEntityCode : [this.selectedChairmanVisa.specificEntityCode],
  display : [this.selectedChairmanVisa.display],
  aMCode : [this.selectedChairmanVisa.aMCode],
  aFCode : [this.selectedChairmanVisa.aFCode],
  showResult : [this.selectedChairmanVisa.showResult]
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
    return this.chairmanVisaForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.chairmanVisaForm.controls)) {
      this.chairmanVisaForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.publishingAuthoritiesService = new LookupService('publishingauthorities', this.http);
this.publishingPlacesService = new LookupService('publishingplaces', this.http);
this.entityTypeService = new LookupService('entitytypes', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.displayTypesService = new LookupService('displaytypes', this.http);
this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.displayResultsService = new LookupService('displayresults', this.http);
  }
}

