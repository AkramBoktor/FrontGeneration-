
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { PlaygroundData } from 'app/shared/models/playground-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { PlaygroundDataService } from '../shared/playground-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-playground-data-view',
  templateUrl: './playground-data-view.component.html',
  styleUrls: ['./playground-data-view.component.scss'],
  providers: []
})

export class PlaygroundDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPlaygroundData: PlaygroundData;
  playgroundDataForm: FormGroup;

  private playgroundTypesService: LookupService;
private landTypesService: LookupService;
private statusCodesService: LookupService;

  
playgroundTypeSelectOptions: MaterialSelectOptions;
landTypeSelectOptions: MaterialSelectOptions;
statusSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPlaygroundDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<PlaygroundDataViewComponent>,
    public playgroundDataService: PlaygroundDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPlaygroundData = this.selectedPlaygroundDataDialog.data || this.selectedPlaygroundData;

    
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
      
  buildingCode : [this.selectedPlaygroundData.buildingCode],
  playgroundNumber : [this.selectedPlaygroundData.playgroundNumber],
  playgroundLength : [this.selectedPlaygroundData.playgroundLength],
  playgroundWidth : [this.selectedPlaygroundData.playgroundWidth],
  playgroundType : [this.selectedPlaygroundData.playgroundType],
  landType : [this.selectedPlaygroundData.landType],
  status : [this.selectedPlaygroundData.status]
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
    return this.playgroundDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.playgroundDataForm.controls)) {
      this.playgroundDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.playgroundTypesService = new LookupService('playgroundtypes', this.http);
this.landTypesService = new LookupService('landtypes', this.http);
this.statusCodesService = new LookupService('statuscodes', this.http);
  }
}

