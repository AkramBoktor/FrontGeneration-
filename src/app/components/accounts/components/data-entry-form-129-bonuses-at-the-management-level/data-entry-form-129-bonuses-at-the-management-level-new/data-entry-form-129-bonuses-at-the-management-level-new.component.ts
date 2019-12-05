
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { DataEntryForm129BonusesAtTheManagementLevel } from 'app/shared/models/data-entry-form-129-bonuses-at-the-management-level';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DataEntryForm129BonusesAtTheManagementLevelService } from '../shared/data-entry-form-129-bonuses-at-the-management-level.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-data-entry-form-129-bonuses-at-the-management-level-new',
  templateUrl: './data-entry-form-129-bonuses-at-the-management-level-new.component.html',
  styleUrls: ['./data-entry-form-129-bonuses-at-the-management-level-new.component.scss'],
  providers: [
    ]
})

export class DataEntryForm129BonusesAtTheManagementLevelNewComponent extends AppBaseComponent implements OnInit {
  dataEntryForm129BonusesAtTheManagementLevelForm: FormGroup;
  @Input() selectedDataEntryForm129BonusesAtTheManagementLevel: DataEntryForm129BonusesAtTheManagementLevel;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<DataEntryForm129BonusesAtTheManagementLevelNewComponent>,
    public dataEntryForm129BonusesAtTheManagementLevelService: DataEntryForm129BonusesAtTheManagementLevelService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataEntryForm129BonusesAtTheManagementLevel = new DataEntryForm129BonusesAtTheManagementLevel();

    

    this.dataEntryForm129BonusesAtTheManagementLevelForm = this.formBuilder.group({
     
  id : [0],
  incomingNumber : [this.selectedDataEntryForm129BonusesAtTheManagementLevel.incomingNumber, [ Validators.required ]],
  month : [this.selectedDataEntryForm129BonusesAtTheManagementLevel.month, [ Validators.required ]],
  bonusCode : [this.selectedDataEntryForm129BonusesAtTheManagementLevel.bonusCode, [ Validators.required ]],
  monthAndYearBonus : [this.selectedDataEntryForm129BonusesAtTheManagementLevel.monthAndYearBonus, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.dataEntryForm129BonusesAtTheManagementLevelService.create(this.dataEntryForm129BonusesAtTheManagementLevelForm.value)
        .pipe(switchMap(x => {
			return this.dataEntryForm129BonusesAtTheManagementLevelService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.dataEntryForm129BonusesAtTheManagementLevelForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
