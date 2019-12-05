
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { CompleteTitlesOfEducationalBuildings } from 'app/shared/models/complete-titles-of-educational-buildings';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CompleteTitlesOfEducationalBuildingsService } from '../shared/complete-titles-of-educational-buildings.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-complete-titles-of-educational-buildings-new',
  templateUrl: './complete-titles-of-educational-buildings-new.component.html',
  styleUrls: ['./complete-titles-of-educational-buildings-new.component.scss'],
  providers: [
    ]
})

export class CompleteTitlesOfEducationalBuildingsNewComponent extends AppBaseComponent implements OnInit {
  completeTitlesOfEducationalBuildingsForm: FormGroup;
  @Input() selectedCompleteTitlesOfEducationalBuildings: CompleteTitlesOfEducationalBuildings;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<CompleteTitlesOfEducationalBuildingsNewComponent>,
    public completeTitlesOfEducationalBuildingsService: CompleteTitlesOfEducationalBuildingsService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCompleteTitlesOfEducationalBuildings = new CompleteTitlesOfEducationalBuildings();

    

    this.completeTitlesOfEducationalBuildingsForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedCompleteTitlesOfEducationalBuildings.buildingCode, [ Validators.required ]],
  schoolAddress : [this.selectedCompleteTitlesOfEducationalBuildings.schoolAddress, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.completeTitlesOfEducationalBuildingsService.create(this.completeTitlesOfEducationalBuildingsForm.value)
        .pipe(switchMap(x => {
			return this.completeTitlesOfEducationalBuildingsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.completeTitlesOfEducationalBuildingsForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
