import { Component, OnInit, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { widgetConfig, Widget } from 'app/shared/config/widgets-config';
import { AppBaseComponent } from 'app/shared/base/app-base.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: fuseAnimations
})

export class HomeComponent extends AppBaseComponent implements OnInit {
  projectWidgets: Widget[];
  projects: any[];
  selectedProject: any;


  constructor(
    injector: Injector,
    // private sideMenuService: SideMenuService
  ) {
    super(injector);
    this.projectWidgets = widgetConfig;
  }

  ngOnInit(): void {
    // this.sideMenuService._fuseNavigationService.setCurrentNavigation('home');
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['name']) {
        const filteredWidgets = this.deepFindNestedObj(widgetConfig, 'name', params['name']);
        this.projectWidgets = filteredWidgets.widget;
      } else {
        this.projectWidgets = widgetConfig;
      }
    });
  }

  subMenu(project: Widget) {
    if (project.url) {
      this.router.navigate([`/${ project.url }`]);
      return;
    }
    this.router.navigate(['/home'], { queryParams: { name: project.name } });
  }

  private deepFindNestedObj(entireObj, keyToFind, valToFind) {
    let foundObj;
    JSON.stringify(entireObj, (_, nestedValue) => {
      if (nestedValue && nestedValue[keyToFind] === valToFind) {
        foundObj = nestedValue;
      }
      return nestedValue;
    });
    return foundObj;
  }
}

