
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { SchoolsClosedToNature } from 'app/shared/models/schools-closed-to-nature';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SchoolsClosedToNatureService } from '../shared/schools-closed-to-nature.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-schools-closed-to-nature-new',
  templateUrl: './schools-closed-to-nature-new.component.html',
  styleUrls: ['./schools-closed-to-nature-new.component.scss'],
  providers: [
    ]
})

export class SchoolsClosedToNatureNewComponent extends AppBaseComponent implements OnInit {
  schoolsClosedToNatureForm: FormGroup;
  @Input() selectedSchoolsClosedToNature: SchoolsClosedToNature;
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
    @Optional() public dialogRef: MatDialogRef<SchoolsClosedToNatureNewComponent>,
    public schoolsClosedToNatureService: SchoolsClosedToNatureService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSchoolsClosedToNature = new SchoolsClosedToNature();

    
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
     
  id : [0],
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
    this.schoolsClosedToNatureService.create(this.schoolsClosedToNatureForm.value)
        .pipe(switchMap(x => {
			return this.schoolsClosedToNatureService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
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
