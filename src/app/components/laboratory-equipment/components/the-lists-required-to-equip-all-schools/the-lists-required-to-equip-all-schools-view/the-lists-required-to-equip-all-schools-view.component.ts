
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { TheListsRequiredToEquipAllSchools } from 'app/shared/models/the-lists-required-to-equip-all-schools';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { TheListsRequiredToEquipAllSchoolsService } from '../shared/the-lists-required-to-equip-all-schools.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-the-lists-required-to-equip-all-schools-view',
  templateUrl: './the-lists-required-to-equip-all-schools-view.component.html',
  styleUrls: ['./the-lists-required-to-equip-all-schools-view.component.scss'],
  providers: []
})

export class TheListsRequiredToEquipAllSchoolsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTheListsRequiredToEquipAllSchools: TheListsRequiredToEquipAllSchools;
  theListsRequiredToEquipAllSchoolsForm: FormGroup;

  private processingTypesService: LookupService;
private offeringTypesService: LookupService;

  
processingTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTheListsRequiredToEquipAllSchoolsDialog: any,
    @Optional() public dialogRef: MatDialogRef<TheListsRequiredToEquipAllSchoolsViewComponent>,
    public theListsRequiredToEquipAllSchoolsService: TheListsRequiredToEquipAllSchoolsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTheListsRequiredToEquipAllSchools = this.selectedTheListsRequiredToEquipAllSchoolsDialog.data || this.selectedTheListsRequiredToEquipAllSchools;

    
	this.processingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.processingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التجهيز',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح ',
	});


    this.theListsRequiredToEquipAllSchoolsForm = this.formBuilder.group({
      
  bidNumber : [this.selectedTheListsRequiredToEquipAllSchools.bidNumber],
  listNumber : [this.selectedTheListsRequiredToEquipAllSchools.listNumber],
  processingType : [this.selectedTheListsRequiredToEquipAllSchools.processingType],
  offeringType : [this.selectedTheListsRequiredToEquipAllSchools.offeringType]
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
    return this.theListsRequiredToEquipAllSchoolsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.theListsRequiredToEquipAllSchoolsForm.controls)) {
      this.theListsRequiredToEquipAllSchoolsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}

