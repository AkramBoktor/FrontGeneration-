
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

  private governoratesService: LookupService;
private sectionsOrCentersService: LookupService;
private serviceTypesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
departmentSelectOptions: MaterialSelectOptions;
serviceTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('department', { static: true }) DepartmentSelectComponent: MaterialSelectComponent;
	@ViewChild('serviceType', { static: true }) ServiceTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<RequiredServicesNewComponent>,
    public requiredServicesService: RequiredServicesService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRequiredServices = new RequiredServices();

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});

	this.departmentSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المركز',
	});

	this.serviceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.serviceTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الخدمة',
	});


    this.requiredServicesForm = this.formBuilder.group({
     
  id : [0],
  orderDate : [this.selectedRequiredServices.orderDate, [ Validators.required ]],
  orderNumber : [this.selectedRequiredServices.orderNumber, [ Validators.required ]],
  entityName : [this.selectedRequiredServices.entityName, [ Validators.required ]],
  school : [this.selectedRequiredServices.school, [ Validators.required ]],
  landArea : [this.selectedRequiredServices.landArea, [ ]],
  structuralRatio : [this.selectedRequiredServices.structuralRatio, [ ]],
  floorsNumber : [this.selectedRequiredServices.floorsNumber, [ ]],
  serviceCode : [this.selectedRequiredServices.serviceCode, [ Validators.required ]],
  serviceName : [this.selectedRequiredServices.serviceName, [ Validators.required ]],
  aadvanceRequiredRatio : [this.selectedRequiredServices.aadvanceRequiredRatio, [ ]],
  governorate : [this.selectedRequiredServices.governorate, [ Validators.required ]],
  department : [this.selectedRequiredServices.department, [ Validators.required ]],
  serviceType : [this.selectedRequiredServices.serviceType, [ Validators.required ]]
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
    this.governoratesService = new LookupService('governorates', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.serviceTypesService = new LookupService('servicetypes', this.http);
  }
 }
