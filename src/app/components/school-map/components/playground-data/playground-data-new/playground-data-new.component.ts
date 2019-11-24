
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { PlaygroundData } from 'app/shared/models/playground-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PlaygroundDataService } from '../shared/playground-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-playground-data-new',
  templateUrl: './playground-data-new.component.html',
  styleUrls: ['./playground-data-new.component.scss'],
  providers: [
    ]
})

export class PlaygroundDataNewComponent extends AppBaseComponent implements OnInit {
  playgroundDataForm: FormGroup;
  @Input() selectedPlaygroundData: PlaygroundData;
  errorMessages: FormControlError[] = [
        
  ];

  private playgroundTypesService: LookupService;
private landTypesService: LookupService;
private statusCodesService: LookupService;

  
playgroundTypeSelectOptions: MaterialSelectOptions;
landTypeSelectOptions: MaterialSelectOptions;
statusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('playgroundType', { static: true }) PlaygroundTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('landType', { static: true }) LandTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('status', { static: true }) StatusSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<PlaygroundDataNewComponent>,
    public playgroundDataService: PlaygroundDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPlaygroundData = new PlaygroundData();

    
	this.playgroundTypeSelectOptions = new MaterialSelectOptions({
	 data: this.playgroundTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الملعب',
	});

	this.landTypeSelectOptions = new MaterialSelectOptions({
	 data: this.landTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الارض',
	});

	this.statusSelectOptions = new MaterialSelectOptions({
	 data: this.statusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الحالة',
	});


    this.playgroundDataForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedPlaygroundData.buildingCode, [ Validators.required ]],
  playgroundNumber : [this.selectedPlaygroundData.playgroundNumber, [ Validators.required ]],
  playgroundLength : [this.selectedPlaygroundData.playgroundLength, [ Validators.required ]],
  playgroundWidth : [this.selectedPlaygroundData.playgroundWidth, [ Validators.required ]],
  playgroundType : [this.selectedPlaygroundData.playgroundType, [ Validators.required ]],
  landType : [this.selectedPlaygroundData.landType, [ Validators.required ]],
  status : [this.selectedPlaygroundData.status, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.playgroundDataService.create(this.playgroundDataForm.value)
        .pipe(switchMap(x => {
			return this.playgroundDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.playgroundDataForm.get(name);
    }

  initializeLookupServices() {
    this.playgroundTypesService = new LookupService('playgroundtypes', this.http);
this.landTypesService = new LookupService('landtypes', this.http);
this.statusCodesService = new LookupService('statuscodes', this.http);
  }
 }
