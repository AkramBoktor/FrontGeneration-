
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { SchoolsClosedToNature } from 'app/shared/models/schools-closed-to-nature';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { SchoolsClosedToNatureService } from '../shared/schools-closed-to-nature.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-schools-closed-to-nature-view',
  templateUrl: './schools-closed-to-nature-view.component.html',
  styleUrls: ['./schools-closed-to-nature-view.component.scss'],
  providers: []
})

export class SchoolsClosedToNatureViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSchoolsClosedToNature: SchoolsClosedToNature;
  schoolsClosedToNatureForm: FormGroup;

  private governoratesService: LookupService;
private closureTypesService: LookupService;


  
governorateCodeSelectOptions: MaterialSelectOptions;
closureTypeSelectOptions: MaterialSelectOptions;
reasonsforclosureSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSchoolsClosedToNatureDialog: any,
    @Optional() public dialogRef: MatDialogRef<SchoolsClosedToNatureViewComponent>,
    public schoolsClosedToNatureService: SchoolsClosedToNatureService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSchoolsClosedToNature = this.selectedSchoolsClosedToNatureDialog.data || this.selectedSchoolsClosedToNature;

    
	this.governorateCodeSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المحافظه',
	});

	this.closureTypeSelectOptions = new MaterialSelectOptions({
	 data: this.closureTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الاغلاق',
	});

	this.reasonsforclosureSelectOptions = new MaterialSelectOptions({
	 data: this.closureTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'اسباب الاغلاق',
	});


    this.schoolsClosedToNatureForm = this.formBuilder.group({
      
  iDNumber : [this.selectedSchoolsClosedToNature.iDNumber],
  notes : [this.selectedSchoolsClosedToNature.notes],
  governorateCode : [this.selectedSchoolsClosedToNature.governorateCode],
  closureType : [this.selectedSchoolsClosedToNature.closureType],
  reasonsforclosure : [this.selectedSchoolsClosedToNature.reasonsforclosure]
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
    return this.schoolsClosedToNatureForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.schoolsClosedToNatureForm.controls)) {
      this.schoolsClosedToNatureForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.closureTypesService = new LookupService('closuretypes', this.http);
this.closureTypesService = new LookupService('closuretypes', this.http);
  }
}

