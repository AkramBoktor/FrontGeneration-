
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { NewServiceRequest } from 'app/shared/models/new-service-request';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { NewServiceRequestService } from '../shared/new-service-request.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-new-service-request-new',
  templateUrl: './new-service-request-new.component.html',
  styleUrls: ['./new-service-request-new.component.scss'],
  providers: [
    ]
})

export class NewServiceRequestNewComponent extends AppBaseComponent implements OnInit {
  newServiceRequestForm: FormGroup;
  @Input() selectedNewServiceRequest: NewServiceRequest;
  errorMessages: FormControlError[] = [
        
  ];

  private entityNamesService: LookupService;
private governoratesService: LookupService;
private sectionsOrCentersService: LookupService;
private serviceTypesService: LookupService;

  
entityNameSelectOptions: MaterialSelectOptions;
governorateSelectOptions: MaterialSelectOptions;
centerOrSectionSelectOptions: MaterialSelectOptions;
serviceTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('entityName', { static: true }) EntityNameSelectComponent: MaterialSelectComponent;
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('centerOrSection', { static: true }) CenterOrSectionSelectComponent: MaterialSelectComponent;
	@ViewChild('serviceType', { static: true }) ServiceTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<NewServiceRequestNewComponent>,
    public newServiceRequestService: NewServiceRequestService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedNewServiceRequest = new NewServiceRequest();

    
	this.entityNameSelectOptions = new MaterialSelectOptions({
	 data: this.entityNamesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' اسم الجهة',
	});

	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});

	this.centerOrSectionSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' مركز – قسم',
	});

	this.serviceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.serviceTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' نوع  الخدمة',
	});


    this.newServiceRequestForm = this.formBuilder.group({
     
  id : [0],
  applicationDate : [this.selectedNewServiceRequest.applicationDate, [ Validators.required ]],
  schoolName : [this.selectedNewServiceRequest.schoolName, [ Validators.required ]],
  landArea : [this.selectedNewServiceRequest.landArea, [ Validators.required ]],
  structuralRatio : [this.selectedNewServiceRequest.structuralRatio, [ Validators.required ]],
  floorsNumber : [this.selectedNewServiceRequest.floorsNumber, [ Validators.required ]],
  receiptNumber : [this.selectedNewServiceRequest.receiptNumber, [ Validators.required ]],
  receiptDate : [this.selectedNewServiceRequest.receiptDate, [ Validators.required ]],
  buildingCode : [this.selectedNewServiceRequest.buildingCode, [ Validators.required ]],
  orderNumber : [this.selectedNewServiceRequest.orderNumber, [ Validators.required ]],
  entityName : [this.selectedNewServiceRequest.entityName, [ Validators.required ]],
  governorate : [this.selectedNewServiceRequest.governorate, [ Validators.required ]],
  centerOrSection : [this.selectedNewServiceRequest.centerOrSection, [ Validators.required ]],
  serviceType : [this.selectedNewServiceRequest.serviceType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.newServiceRequestService.create(this.newServiceRequestForm.value)
        .pipe(switchMap(x => {
			return this.newServiceRequestService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.newServiceRequestForm.get(name);
    }

  initializeLookupServices() {
    this.entityNamesService = new LookupService('entitynames', this.http);
this.governoratesService = new LookupService('governorates', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.serviceTypesService = new LookupService('servicetypes', this.http);
  }
 }
