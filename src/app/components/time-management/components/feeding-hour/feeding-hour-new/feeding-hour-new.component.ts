
import { Component, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { FeedingHour } from 'app/shared/models/feeding-hour';
import { switchMap } from 'rxjs/operators';
import { FeedingHourService } from '../shared/feeding-hour.service';


@Component({
  selector: 'app-feeding-hour-new',
  templateUrl: './feeding-hour-new.component.html',
  styleUrls: ['./feeding-hour-new.component.scss'],
  providers: [
    ]
})

export class FeedingHourNewComponent extends AppBaseComponent implements OnInit {
  feedingHourForm: FormGroup;
  @Input() selectedFeedingHour: FeedingHour;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<FeedingHourNewComponent>,
    public feedingHourService: FeedingHourService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFeedingHour = new FeedingHour();

    

    this.feedingHourForm = this.formBuilder.group({
     
  id : [0],
  employeeCode : [this.selectedFeedingHour.employeeCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.feedingHourService.create(this.feedingHourForm.value)
        .pipe(switchMap(x => {
			return this.feedingHourService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.feedingHourForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
