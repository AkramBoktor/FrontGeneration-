
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { PositionOfLeasedBuildings } from 'app/shared/models/position-of-leased-buildings';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PositionOfLeasedBuildingsService } from '../shared/position-of-leased-buildings.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-position-of-leased-buildings-new',
  templateUrl: './position-of-leased-buildings-new.component.html',
  styleUrls: ['./position-of-leased-buildings-new.component.scss'],
  providers: [
    ]
})

export class PositionOfLeasedBuildingsNewComponent extends AppBaseComponent implements OnInit {
  positionOfLeasedBuildingsForm: FormGroup;
  @Input() selectedPositionOfLeasedBuildings: PositionOfLeasedBuildings;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<PositionOfLeasedBuildingsNewComponent>,
    public positionOfLeasedBuildingsService: PositionOfLeasedBuildingsService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPositionOfLeasedBuildings = new PositionOfLeasedBuildings();

    

    this.positionOfLeasedBuildingsForm = this.formBuilder.group({
     
  id : [0],
  iD : [this.selectedPositionOfLeasedBuildings.iD, [ Validators.required ]],
  situation : [this.selectedPositionOfLeasedBuildings.situation, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.positionOfLeasedBuildingsService.create(this.positionOfLeasedBuildingsForm.value)
        .pipe(switchMap(x => {
			return this.positionOfLeasedBuildingsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.positionOfLeasedBuildingsForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
