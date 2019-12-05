
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { NewServicesRequests } from 'app/shared/models/new-services-requests';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { NewServicesRequestsService } from '../shared/new-services-requests.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-new-services-requests-new',
  templateUrl: './new-services-requests-new.component.html',
  styleUrls: ['./new-services-requests-new.component.scss'],
  providers: [
    ]
})

export class NewServicesRequestsNewComponent extends AppBaseComponent implements OnInit {
  newServicesRequestsForm: FormGroup;
  @Input() selectedNewServicesRequests: NewServicesRequests;
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
    @Optional() public dialogRef: MatDialogRef<NewServicesRequestsNewComponent>,
    public newServicesRequestsService: NewServicesRequestsService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedNewServicesRequests = new NewServicesRequests();

    
	this.entityNameSelectOptions = new MaterialSelectOptions({
	 data: this.entityNamesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'اسم الجهة',
	});

	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});

	this.centerOrSectionSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مركز – قسم',
	});

	this.serviceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.serviceTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع  الخدمة',
	});


    this.newServicesRequestsForm = this.formBuilder.group({
     
  id : [0],
  applicationDate : [this.selectedNewServicesRequests.applicationDate, [ Validators.required ]],
  schoolName : [this.selectedNewServicesRequests.schoolName, [ Validators.required ]],
  landArea : [this.selectedNewServicesRequests.landArea, [ Validators.required ]],
  structuralRatio : [this.selectedNewServicesRequests.structuralRatio, [ Validators.required ]],
  floorsNumber : [this.selectedNewServicesRequests.floorsNumber, [ Validators.required ]],
  receiptNumber : [this.selectedNewServicesRequests.receiptNumber, [ Validators.required ]],
  receiptDate : [this.selectedNewServicesRequests.receiptDate, [ Validators.required ]],
  buildingCode : [this.selectedNewServicesRequests.buildingCode, [ Validators.required ]],
  orderNumber : [this.selectedNewServicesRequests.orderNumber, [ Validators.required ]],
  entityName : [this.selectedNewServicesRequests.entityName, [ Validators.required ]],
  governorate : [this.selectedNewServicesRequests.governorate, [ Validators.required ]],
  centerOrSection : [this.selectedNewServicesRequests.centerOrSection, [ Validators.required ]],
  serviceType : [this.selectedNewServicesRequests.serviceType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.newServicesRequestsService.create(this.newServicesRequestsForm.value)
        .pipe(switchMap(x => {
			return this.newServicesRequestsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.newServicesRequestsForm.get(name);
    }

  initializeLookupServices() {
    this.entityNamesService = new LookupService('entitynames', this.http);
this.governoratesService = new LookupService('governorates', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.serviceTypesService = new LookupService('servicetypes', this.http);
  }
 }
