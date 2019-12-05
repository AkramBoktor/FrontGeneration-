
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TheListsRequiredToEquipAllSchools } from 'app/shared/models/the-lists-required-to-equip-all-schools';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { TheListsRequiredToEquipAllSchoolsService } from '../shared/the-lists-required-to-equip-all-schools.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-the-lists-required-to-equip-all-schools-edit',
  templateUrl: './the-lists-required-to-equip-all-schools-edit.component.html',
  styleUrls: ['./the-lists-required-to-equip-all-schools-edit.component.scss'],
  providers: []
})

export class TheListsRequiredToEquipAllSchoolsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTheListsRequiredToEquipAllSchools: TheListsRequiredToEquipAllSchools;
  theListsRequiredToEquipAllSchoolsForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private processingTypesService: LookupService;
private offeringTypesService: LookupService;

  
processingTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTheListsRequiredToEquipAllSchoolsDialog: any,
    @Optional() public dialogRef: MatDialogRef<TheListsRequiredToEquipAllSchoolsEditComponent>,
    public theListsRequiredToEquipAllSchoolsService: TheListsRequiredToEquipAllSchoolsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTheListsRequiredToEquipAllSchools = new TheListsRequiredToEquipAllSchools();
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
      
  id : [this.selectedTheListsRequiredToEquipAllSchools.id],
  bidNumber : [this.selectedTheListsRequiredToEquipAllSchools.bidNumber, [ ]],
  listNumber : [this.selectedTheListsRequiredToEquipAllSchools.listNumber, [ ]],
  processingType : [this.selectedTheListsRequiredToEquipAllSchools.processingType, [ ]],
  offeringType : [this.selectedTheListsRequiredToEquipAllSchools.offeringType, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.theListsRequiredToEquipAllSchoolsService.update(this.theListsRequiredToEquipAllSchoolsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.theListsRequiredToEquipAllSchoolsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.theListsRequiredToEquipAllSchoolsForm.get(name);
  }

  initializeLookupServices() {
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}
