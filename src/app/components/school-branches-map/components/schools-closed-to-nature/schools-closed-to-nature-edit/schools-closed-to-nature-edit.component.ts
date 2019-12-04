
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SchoolsClosedToNature } from 'app/shared/models/schools-closed-to-nature';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { SchoolsClosedToNatureService } from '../shared/schools-closed-to-nature.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-schools-closed-to-nature-edit',
  templateUrl: './schools-closed-to-nature-edit.component.html',
  styleUrls: ['./schools-closed-to-nature-edit.component.scss'],
  providers: []
})

export class SchoolsClosedToNatureEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSchoolsClosedToNature: SchoolsClosedToNature;
  schoolsClosedToNatureForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private governoratesService: LookupService;
private closureTypesService: LookupService;


  
governorateCodeSelectOptions: MaterialSelectOptions;
closureTypeSelectOptions: MaterialSelectOptions;
reasonsforclosureSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorateCode', { static: true }) GovernorateCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('closureType', { static: true }) ClosureTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('reasonsforclosure', { static: true }) ReasonsforclosureSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSchoolsClosedToNatureDialog: any,
    @Optional() public dialogRef: MatDialogRef<SchoolsClosedToNatureEditComponent>,
    public schoolsClosedToNatureService: SchoolsClosedToNatureService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSchoolsClosedToNature = new SchoolsClosedToNature();
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
      
  id : [this.selectedSchoolsClosedToNature.id],
  iDNumber : [this.selectedSchoolsClosedToNature.iDNumber, [ Validators.required ]],
  notes : [this.selectedSchoolsClosedToNature.notes, [ Validators.required ]],
  governorateCode : [this.selectedSchoolsClosedToNature.governorateCode, [ Validators.required ]],
  closureType : [this.selectedSchoolsClosedToNature.closureType, [ Validators.required ]],
  reasonsforclosure : [this.selectedSchoolsClosedToNature.reasonsforclosure, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.schoolsClosedToNatureService.update(this.schoolsClosedToNatureForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.schoolsClosedToNatureService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.schoolsClosedToNatureForm.get(name);
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.closureTypesService = new LookupService('closuretypes', this.http);
this.closureTypesService = new LookupService('closuretypes', this.http);
  }
}
