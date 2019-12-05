import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes } from '@angular/router';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ODataConfiguration, ODataServiceFactory } from 'angular-odata-es5';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { AppComponent } from 'app/app.component';
import { FakeDbService } from 'app/fake-db/fake-db.service';
import { fuseConfig } from 'app/fuse-config';
import { LayoutModule } from 'app/layout/layout.module';
import 'hammerjs';
import { AppRoutingModule } from './app.routing.module';
import { LayoutComponent } from './containers/layout/layout.component';
// import { ImageFileUploadModule } from './shared/components/file-upload/file-upload.module';
import { MyInterceptor } from './core/interceptors/my-interceptor';
import { HttpResponseHandler } from './shared/async-services/http-response-handler.service';
import { MaterialControlsModule } from './shared/components/material-controls/material-controls.module';
import { AppODataConfig } from './shared/config/odata-config';
import { LoginComponent } from './main/pages/authentication/login/login.component';


const appRoutes: Routes = [

];

@NgModule({
    declarations: [
        AppComponent,
        // FooterComponent,
        LayoutComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,

        TranslateModule.forRoot(),
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay: 0,
            passThruUnknownUrl: true
        }),
        // ------------------
        FormsModule,
        InlineEditorModule,
        AngularFontAwesomeModule,
        MaterialControlsModule,
        SimpleNotificationsModule.forRoot(),
        // ImageFileUploadModule,
        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        // AppStoreModule
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MyInterceptor,
            multi: true
        },
        HttpResponseHandler,
        {
            provide: ODataConfiguration,
            useClass: AppODataConfig
        },
        ODataServiceFactory,
    ],
})
export class AppModule {
}
