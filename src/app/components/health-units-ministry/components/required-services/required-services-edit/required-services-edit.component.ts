
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { RequiredServices } from 'app/shared/models/required-services';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { RequiredServicesService } from '../shared/required-services.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-required-services-edit',
  templateUrl: './required-services-edit.component.html',
  styleUrls: ['./required-services-edit.component.scss'],
  providers: []
})

export class RequiredServicesEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRequiredServices: RequiredServices;
  requiredServicesForm: FormGroup;
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
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRequiredServicesDialog: any,
    @Optional() public dialogRef: MatDialogRef<RequiredServicesEditComponent>,
    public requiredServicesService: RequiredServicesService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRequiredServices = new RequiredServices();
    this.selectedRequiredServices = this.selectedRequiredServicesDialog.data || this.selectedRequiredServices;

    
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
      
  id : [this.selectedRequiredServices.id],
  applicationDate : [this.selectedRequiredServices.applictionDate, [ Validators.required ]],
  orderNumber : [this.selectedRequiredServices.orderNumber, [ Validators.required ]],
  schoolName : [this.selectedRequiredServices.schoolName, [ ]],
  landArea : [this.selectedRequiredServices.landArea, [ ]],
  structuralRatio : [this.selectedRequiredServices.structuralRatio, [ ]],
  floorsNumber : [this.selectedRequiredServices.floorsNumber, [ ]],
  serviceType : [this.selectedRequiredServices.serviceType, [ ]],
  serviceCode : [this.selectedRequiredServices.serviceCode, [ Validators.required ]],
  serviceName : [this.selectedRequiredServices.serviceName, [ Validators.required ]],
  advanceRequiredRatio : [this.selectedRequiredServices.advanceRequiredRatio, [ ]],
  entityName : [this.selectedRequiredServices.entityName, [ ]],
  governorate : [this.selectedRequiredServices.governorate, [ ]],
  centerOrSection : [this.selectedRequiredServices.centerOrSection, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.requiredServicesService.update(this.requiredServicesForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.requiredServicesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.requiredServicesForm.get(name);
  }

  initializeLookupServices() {
    this.entityNamesService = new LookupService('entitynames', this.http);
this.governoratesService = new LookupService('governorates', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
  }
}
