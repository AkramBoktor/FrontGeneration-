
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { RequiredServiceses } from 'app/shared/models/required-serviceses';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { RequiredServicesesService } from '../shared/required-serviceses.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-required-serviceses-edit',
  templateUrl: './required-serviceses-edit.component.html',
  styleUrls: ['./required-serviceses-edit.component.scss'],
  providers: []
})

export class RequiredServicesesEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRequiredServiceses: RequiredServiceses;
  requiredServicesesForm: FormGroup;
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
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRequiredServicesesDialog: any,
    @Optional() public dialogRef: MatDialogRef<RequiredServicesesEditComponent>,
    public requiredServicesesService: RequiredServicesesService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRequiredServiceses = new RequiredServiceses();
    this.selectedRequiredServiceses = this.selectedRequiredServicesesDialog.data || this.selectedRequiredServiceses;

    
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


    this.requiredServicesesForm = this.formBuilder.group({
      
  id : [this.selectedRequiredServiceses.id],
  applicationDate : [this.selectedRequiredServiceses.applictionDate, [ Validators.required ]],
  orderNumber : [this.selectedRequiredServiceses.orderNumber, [ Validators.required ]],
  schoolName : [this.selectedRequiredServiceses.schoolName, [ ]],
  landArea : [this.selectedRequiredServiceses.landArea, [ ]],
  structuralRatio : [this.selectedRequiredServiceses.structuralRatio, [ ]],
  floorsNumber : [this.selectedRequiredServiceses.floorsNumber, [ ]],
  serviceType : [this.selectedRequiredServiceses.serviceType, [ ]],
  serviceCode : [this.selectedRequiredServiceses.serviceCode, [ Validators.required ]],
  serviceName : [this.selectedRequiredServiceses.serviceName, [ Validators.required ]],
  advanceRequiredRatio : [this.selectedRequiredServiceses.advanceRequiredRatio, [ ]],
  entityName : [this.selectedRequiredServiceses.entityName, [ ]],
  governorate : [this.selectedRequiredServiceses.governorate, [ ]],
  centerOrSection : [this.selectedRequiredServiceses.centerOrSection, [ ]],
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.requiredServicesesService.update(this.requiredServicesesForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.requiredServicesesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.requiredServicesesForm.get(name);
  }

  initializeLookupServices() {
    this.entityNamesService = new LookupService('entitynames', this.http);
this.governoratesService = new LookupService('governorates', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
  }
}
