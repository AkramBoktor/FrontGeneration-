
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { RequiredServiceses } from 'app/shared/models/required-serviceses';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RequiredServicesesService } from '../shared/required-serviceses.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-required-serviceses-new',
  templateUrl: './required-serviceses-new.component.html',
  styleUrls: ['./required-serviceses-new.component.scss'],
  providers: [
    ]
})

export class RequiredServicesesNewComponent extends AppBaseComponent implements OnInit {
  requiredServicesesForm: FormGroup;
  @Input() selectedRequiredServiceses: RequiredServiceses;
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
    @Optional() public dialogRef: MatDialogRef<RequiredServicesesNewComponent>,
    public requiredServicesesService: RequiredServicesesService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRequiredServiceses = new RequiredServiceses();

    
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
     
  id : [0],
  orderNumber : [this.selectedRequiredServiceses.orderNumber, [ Validators.required ]],
  schoolName : [this.selectedRequiredServiceses.schoolName, [ ]],
  landArea : [this.selectedRequiredServiceses.landArea, [ ]],
  structuralRatio : [this.selectedRequiredServiceses.structuralRatio, [ ]],
  floorsNumber : [this.selectedRequiredServiceses.floorsNumber, [ ]],
  serviceType : [this.selectedRequiredServiceses.serviceType, [ ]],
  serviceCode : [this.selectedRequiredServiceses.serviceCode, [ Validators.required ]],
  serviceName : [this.selectedRequiredServiceses.serviceName, [ Validators.required ]],
  advanceRequiredRatio : [this.selectedRequiredServiceses.advanceRequiredRatio, [ Validators.required ]],
  applictionDate : [this.selectedRequiredServiceses.applictionDate, [ ]],
  entityName : [this.selectedRequiredServiceses.entityName, [ ]],
  governorate : [this.selectedRequiredServiceses.governorate, [ ]],
  centerOrSection : [this.selectedRequiredServiceses.centerOrSection, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.requiredServicesesService.create(this.requiredServicesesForm.value)
        .pipe(switchMap(x => {
			return this.requiredServicesesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
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
