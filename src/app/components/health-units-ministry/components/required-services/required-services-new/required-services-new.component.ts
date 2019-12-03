
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { RequiredServices } from 'app/shared/models/required-services';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RequiredServicesService } from '../shared/required-services.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-required-services-new',
  templateUrl: './required-services-new.component.html',
  styleUrls: ['./required-services-new.component.scss'],
  providers: [
    ]
})

export class RequiredServicesNewComponent extends AppBaseComponent implements OnInit {
  requiredServicesForm: FormGroup;
  @Input() selectedRequiredServices: RequiredServices;
  errorMessages: FormControlError[] = [
        
  ];

  private entityNamesService: LookupService;
private governoratesService: LookupService;
private sectionsOrCentersService: LookupService;

  
entityNameSelectOptions: MaterialSelectOptions;
governorateSelectOptions: MaterialSelectOptions;
centerOrSectionSelectOptions: MaterialSelectOptions;

  
	@ViewChild('entityName', { static: true }) EntityNameSelectComponent: MaterialSelectComponent;
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('centerOrSection', { static: true }) CenterOrSectionSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<RequiredServicesNewComponent>,
    public requiredServicesService: RequiredServicesService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRequiredServices = new RequiredServices();

    
	this.entityNameSelectOptions = new MaterialSelectOptions({
	 data: this.entityNamesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' اسم الجهة',
	});

	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' المحافظة',
	});

	this.centerOrSectionSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' مركز – قسم',
	});


    this.requiredServicesForm = this.formBuilder.group({
     
  id : [0],
  orderNumber : [this.selectedRequiredServices.orderNumber, [ Validators.required ]],
  schoolName : [this.selectedRequiredServices.schoolName, [ ]],
  landArea : [this.selectedRequiredServices.landArea, [ ]],
  structuralRatio : [this.selectedRequiredServices.structuralRatio, [ ]],
  floorsNumber : [this.selectedRequiredServices.floorsNumber, [ ]],
  serviceType : [this.selectedRequiredServices.serviceType, [ ]],
  serviceCode : [this.selectedRequiredServices.serviceCode, [ Validators.required ]],
  serviceName : [this.selectedRequiredServices.serviceName, [ Validators.required ]],
  advanceRequiredRatio : [this.selectedRequiredServices.advanceRequiredRatio, [ Validators.required ]],
  applictionDate : [this.selectedRequiredServices.applictionDate, [ ]],
  entityName : [this.selectedRequiredServices.entityName, [ ]],
  governorate : [this.selectedRequiredServices.governorate, [ ]],
  centerOrSection : [this.selectedRequiredServices.centerOrSection, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.requiredServicesService.create(this.requiredServicesForm.value)
        .pipe(switchMap(x => {
			return this.requiredServicesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.requiredServicesForm.get(name);
    }

  initializeLookupServices() {
    this.entityNamesService = new LookupService('entitynames', this.http);
this.governoratesService = new LookupService('governorates', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
  }
 }
