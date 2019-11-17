
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ChairmanVisa } from 'app/shared/models/chairman-visa';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { ChairmanVisaService } from '../shared/chairman-visa.service';




@Component({
  selector: 'app-chairman-visa-edit',
  templateUrl: './chairman-visa-edit.component.html',
  styleUrls: ['./chairman-visa-edit.component.scss'],
  providers: []
})

export class ChairmanVisaEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedChairmanVisa: ChairmanVisa;
  chairmanVisaForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

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

  
	@ViewChild('publisherCode', { static: true }) PublisherCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('publicationCodePlace', { static: true }) PublicationCodePlaceSelectComponent: MaterialSelectComponent;
	@ViewChild('entityTypeCode', { static: true }) EntityTypeCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('specificEntityCode', { static: true }) SpecificEntityCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('display', { static: true }) DisplaySelectComponent: MaterialSelectComponent;
	@ViewChild('aMCode', { static: true }) AMCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('aFCode', { static: true }) AFCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('showResult', { static: true }) ShowResultSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedChairmanVisaDialog: any,
    @Optional() public dialogRef: MatDialogRef<ChairmanVisaEditComponent>,
    public chairmanVisaService: ChairmanVisaService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedChairmanVisa = new ChairmanVisa();
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
      
  id : [this.selectedChairmanVisa.id],
  pageNumber : [this.selectedChairmanVisa.pageNumber, [ Validators.required ]],
  publicationDate : [this.selectedChairmanVisa.publicationDate, [ Validators.required ]],
  presentationDate : [this.selectedChairmanVisa.presentationDate, [ ]],
  visaDate : [this.selectedChairmanVisa.visaDate, [ Validators.required ]],
  serial : [this.selectedChairmanVisa.serial, [ Validators.required ]],
  visaText : [this.selectedChairmanVisa.visaText, [ Validators.required ]],
  publisherCode : [this.selectedChairmanVisa.publisherCode, [ Validators.required ]],
  publicationCodePlace : [this.selectedChairmanVisa.publicationCodePlace, [ Validators.required ]],
  entityTypeCode : [this.selectedChairmanVisa.entityTypeCode, [ Validators.required ]],
  specificEntityCode : [this.selectedChairmanVisa.specificEntityCode, [ Validators.required ]],
  display : [this.selectedChairmanVisa.display, [ Validators.required ]],
  aMCode : [this.selectedChairmanVisa.aMCode, [ Validators.required ]],
  aFCode : [this.selectedChairmanVisa.aFCode, [ Validators.required ]],
  showResult : [this.selectedChairmanVisa.showResult, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.chairmanVisaService.update(this.chairmanVisaForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.chairmanVisaService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.chairmanVisaForm.get(name);
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
