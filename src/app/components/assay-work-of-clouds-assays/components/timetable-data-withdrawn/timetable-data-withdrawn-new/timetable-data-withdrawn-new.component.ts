
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { TimetableDataWithdrawn } from 'app/shared/models/timetable-data-withdrawn';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TimetableDataWithdrawnService } from '../shared/timetable-data-withdrawn.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-timetable-data-withdrawn-new',
  templateUrl: './timetable-data-withdrawn-new.component.html',
  styleUrls: ['./timetable-data-withdrawn-new.component.scss'],
  providers: [
    ]
})

export class TimetableDataWithdrawnNewComponent extends AppBaseComponent implements OnInit {
  timetableDataWithdrawnForm: FormGroup;
  @Input() selectedTimetableDataWithdrawn: TimetableDataWithdrawn;
  errorMessages: FormControlError[] = [
        
  ];

  private constructionTypesService: LookupService;
private foundationTypesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
baseTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('baseType', { static: true }) BaseTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<TimetableDataWithdrawnNewComponent>,
    public timetableDataWithdrawnService: TimetableDataWithdrawnService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTimetableDataWithdrawn = new TimetableDataWithdrawn();

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الإنشاء',
	});

	this.baseTypeSelectOptions = new MaterialSelectOptions({
	 data: this.foundationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الأساسات',
	});


    this.timetableDataWithdrawnForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedTimetableDataWithdrawn.buildingCode, [ Validators.required ]],
  extensionCode : [this.selectedTimetableDataWithdrawn.extensionCode, [ Validators.required ]],
  planYear : [this.selectedTimetableDataWithdrawn.planYear, [ ]],
  modelCode : [this.selectedTimetableDataWithdrawn.modelCode, [ Validators.required ]],
  pricingYear : [this.selectedTimetableDataWithdrawn.pricingYear, [ Validators.required ]],
  scheduleCode : [this.selectedTimetableDataWithdrawn.scheduleCode, [ Validators.required ]],
  executionDuration : [this.selectedTimetableDataWithdrawn.executionDuration, [ ]],
  floorNumber : [this.selectedTimetableDataWithdrawn.floorNumber, [ ]],
  constructionType : [this.selectedTimetableDataWithdrawn.constructionType, [ Validators.required ]],
  baseType : [this.selectedTimetableDataWithdrawn.baseType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.timetableDataWithdrawnService.create(this.timetableDataWithdrawnForm.value)
        .pipe(switchMap(x => {
			return this.timetableDataWithdrawnService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.timetableDataWithdrawnForm.get(name);
    }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.foundationTypesService = new LookupService('foundationtypes', this.http);
  }
 }
