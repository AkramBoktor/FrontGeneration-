
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { SchoolsEquippedByOther } from 'app/shared/models/schools-equipped-by-other';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { SchoolsEquippedByOtherService } from '../shared/schools-equipped-by-other.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-schools-equipped-by-other-view',
  templateUrl: './schools-equipped-by-other-view.component.html',
  styleUrls: ['./schools-equipped-by-other-view.component.scss'],
  providers: []
})

export class SchoolsEquippedByOtherViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSchoolsEquippedByOther: SchoolsEquippedByOther;
  schoolsEquippedByOtherForm: FormGroup;

  private processingTypesService: LookupService;
private providersService: LookupService;
private constructionTypesService: LookupService;
private itemCodesService: LookupService;

  
equipmentTypeSelectOptions: MaterialSelectOptions;
providerSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSchoolsEquippedByOtherDialog: any,
    @Optional() public dialogRef: MatDialogRef<SchoolsEquippedByOtherViewComponent>,
    public schoolsEquippedByOtherService: SchoolsEquippedByOtherService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  constructionPlanYear : [this.selectedSchoolsEquippedByOther.constructionPlanYear],
  schoolNumber : [this.selectedSchoolsEquippedByOther.schoolNumber],
  extensionNumber : [this.selectedSchoolsEquippedByOther.extensionNumber],
  itemName : [this.selectedSchoolsEquippedByOther.itemName],
  quantity : [this.selectedSchoolsEquippedByOther.quantity],
  equipmentType : [this.selectedSchoolsEquippedByOther.equipmentType],
  provider : [this.selectedSchoolsEquippedByOther.provider],
  constructionType : [this.selectedSchoolsEquippedByOther.constructionType],
  itemCode : [this.selectedSchoolsEquippedByOther.itemCode]
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
    return this.schoolsEquippedByOtherForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.schoolsEquippedByOtherForm.controls)) {
      this.schoolsEquippedByOtherForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.providersService = new LookupService('providers', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
  }
}

