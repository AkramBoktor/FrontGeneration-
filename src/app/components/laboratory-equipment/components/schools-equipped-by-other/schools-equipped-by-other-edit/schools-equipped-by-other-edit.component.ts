
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SchoolsEquippedByOther } from 'app/shared/models/schools-equipped-by-other';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { SchoolsEquippedByOtherService } from '../shared/schools-equipped-by-other.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-schools-equipped-by-other-edit',
  templateUrl: './schools-equipped-by-other-edit.component.html',
  styleUrls: ['./schools-equipped-by-other-edit.component.scss'],
  providers: []
})

export class SchoolsEquippedByOtherEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSchoolsEquippedByOther: SchoolsEquippedByOther;
  schoolsEquippedByOtherForm: FormGroup;
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
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSchoolsEquippedByOtherDialog: any,
    @Optional() public dialogRef: MatDialogRef<SchoolsEquippedByOtherEditComponent>,
    public schoolsEquippedByOtherService: SchoolsEquippedByOtherService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSchoolsEquippedByOther = new SchoolsEquippedByOther();
    this.selectedSchoolsEquippedByOther = this.selectedSchoolsEquippedByOtherDialog.data || this.selectedSchoolsEquippedByOther;

    
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
      
  id : [this.selectedSchoolsEquippedByOther.id],
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
    this.schoolsEquippedByOtherService.update(this.schoolsEquippedByOtherForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.schoolsEquippedByOtherService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.schoolsEquippedByOtherForm.get(name);
  }

  initializeLookupServices() {
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.providersService = new LookupService('providers', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
  }
}
