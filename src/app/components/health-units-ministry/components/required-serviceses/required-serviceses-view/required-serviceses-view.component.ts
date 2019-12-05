
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { RequiredServiceses } from 'app/shared/models/required-serviceses';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { RequiredServicesesService } from '../shared/required-serviceses.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-required-serviceses-view',
  templateUrl: './required-serviceses-view.component.html',
  styleUrls: ['./required-serviceses-view.component.scss'],
  providers: []
})

export class RequiredServicesesViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRequiredServiceses: RequiredServiceses;
  requiredServicesesForm: FormGroup;

  private entityNamesService: LookupService;
private governoratesService: LookupService;
private sectionsOrCentersService: LookupService;

  
entityNameSelectOptions: MaterialSelectOptions;
governorateSelectOptions: MaterialSelectOptions;
centerOrSectionSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRequiredServicesesDialog: any,
    @Optional() public dialogRef: MatDialogRef<RequiredServicesesViewComponent>,
    public requiredServicesesService: RequiredServicesesService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  orderNumber : [this.selectedRequiredServiceses.orderNumber],
  schoolName : [this.selectedRequiredServiceses.schoolName],
  landArea : [this.selectedRequiredServiceses.landArea],
  structuralRatio : [this.selectedRequiredServiceses.structuralRatio],
  floorsNumber : [this.selectedRequiredServiceses.floorsNumber],
  serviceType : [this.selectedRequiredServiceses.serviceType],
  serviceCode : [this.selectedRequiredServiceses.serviceCode],
  serviceName : [this.selectedRequiredServiceses.serviceName],
  advanceRequiredRatio : [this.selectedRequiredServiceses.advanceRequiredRatio],
  applictionDate : [this.selectedRequiredServiceses.applictionDate],
  entityName : [this.selectedRequiredServiceses.entityName],
  governorate : [this.selectedRequiredServiceses.governorate],
  centerOrSection : [this.selectedRequiredServiceses.centerOrSection]
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
    return this.requiredServicesesForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.requiredServicesesForm.controls)) {
      this.requiredServicesesForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.entityNamesService = new LookupService('entitynames', this.http);
this.governoratesService = new LookupService('governorates', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
  }
}

