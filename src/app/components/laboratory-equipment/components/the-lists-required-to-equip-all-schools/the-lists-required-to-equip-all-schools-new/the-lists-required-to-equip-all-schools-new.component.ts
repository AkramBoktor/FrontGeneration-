
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { TheListsRequiredToEquipAllSchools } from 'app/shared/models/the-lists-required-to-equip-all-schools';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TheListsRequiredToEquipAllSchoolsService } from '../shared/the-lists-required-to-equip-all-schools.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-the-lists-required-to-equip-all-schools-new',
  templateUrl: './the-lists-required-to-equip-all-schools-new.component.html',
  styleUrls: ['./the-lists-required-to-equip-all-schools-new.component.scss'],
  providers: [
    ]
})

export class TheListsRequiredToEquipAllSchoolsNewComponent extends AppBaseComponent implements OnInit {
  theListsRequiredToEquipAllSchoolsForm: FormGroup;
  @Input() selectedTheListsRequiredToEquipAllSchools: TheListsRequiredToEquipAllSchools;
  errorMessages: FormControlError[] = [
        
  ];

  private processingTypesService: LookupService;
private offeringTypesService: LookupService;

  
processingTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<TheListsRequiredToEquipAllSchoolsNewComponent>,
    public theListsRequiredToEquipAllSchoolsService: TheListsRequiredToEquipAllSchoolsService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTheListsRequiredToEquipAllSchools = new TheListsRequiredToEquipAllSchools();

    
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
     
  id : [0],
  bidNumber : [this.selectedTheListsRequiredToEquipAllSchools.bidNumber, [ ]],
  listNumber : [this.selectedTheListsRequiredToEquipAllSchools.listNumber, [ ]],
  processingType : [this.selectedTheListsRequiredToEquipAllSchools.processingType, [ ]],
  offeringType : [this.selectedTheListsRequiredToEquipAllSchools.offeringType, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.theListsRequiredToEquipAllSchoolsService.create(this.theListsRequiredToEquipAllSchoolsForm.value)
        .pipe(switchMap(x => {
			return this.theListsRequiredToEquipAllSchoolsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.theListsRequiredToEquipAllSchoolsForm.get(name);
    }

  initializeLookupServices() {
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
 }
