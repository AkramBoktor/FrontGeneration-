
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { SchoolsEquippedByOther } from 'app/shared/models/schools-equipped-by-other';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SchoolsEquippedByOtherService } from '../shared/schools-equipped-by-other.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-schools-equipped-by-other-new',
  templateUrl: './schools-equipped-by-other-new.component.html',
  styleUrls: ['./schools-equipped-by-other-new.component.scss'],
  providers: [
    ]
})

export class SchoolsEquippedByOtherNewComponent extends AppBaseComponent implements OnInit {
  schoolsEquippedByOtherForm: FormGroup;
  @Input() selectedSchoolsEquippedByOther: SchoolsEquippedByOther;
  errorMessages: FormControlError[] = [
        
  ];

  private processingTypesService: LookupService;
private providersService: LookupService;
private constructionTypesService: LookupService;
private itemCodesService: LookupService;

  
equipmentTypeSelectOptions: MaterialSelectOptions;
providerSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('equipmentType', { static: true }) EquipmentTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('provider', { static: true }) ProviderSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<SchoolsEquippedByOtherNewComponent>,
    public schoolsEquippedByOtherService: SchoolsEquippedByOtherService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSchoolsEquippedByOther = new SchoolsEquippedByOther();

    
	this.equipmentTypeSelectOptions = new MaterialSelectOptions({
	 data: this.processingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التجهيز',
	});

	this.providerSelectOptions = new MaterialSelectOptions({
	 data: this.providersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الجهة المجهزة',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});


    this.schoolsEquippedByOtherForm = this.formBuilder.group({
     
  id : [0],
  constructionPlanYear : [this.selectedSchoolsEquippedByOther.constructionPlanYear, [ Validators.required ]],
  schoolNumber : [this.selectedSchoolsEquippedByOther.schoolNumber, [ Validators.required ]],
  extensionNumber : [this.selectedSchoolsEquippedByOther.extensionNumber, [ Validators.required ]],
  itemName : [this.selectedSchoolsEquippedByOther.itemName, [ Validators.required ]],
  quantity : [this.selectedSchoolsEquippedByOther.quantity, [ Validators.required ]],
  equipmentType : [this.selectedSchoolsEquippedByOther.equipmentType, [ Validators.required ]],
  provider : [this.selectedSchoolsEquippedByOther.provider, [ Validators.required ]],
  constructionType : [this.selectedSchoolsEquippedByOther.constructionType, [ Validators.required ]],
  itemCode : [this.selectedSchoolsEquippedByOther.itemCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.schoolsEquippedByOtherService.create(this.schoolsEquippedByOtherForm.value)
        .pipe(switchMap(x => {
			return this.schoolsEquippedByOtherService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.schoolsEquippedByOtherForm.get(name);
    }

  initializeLookupServices() {
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.providersService = new LookupService('providers', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
  }
 }
