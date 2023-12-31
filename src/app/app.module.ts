import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { ApiService } from 'src/services/api.service';
import { UtilsService } from 'src/services/utils.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CmsModule } from './cms/cms.module';

// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CmsModule,
        HttpClientModule,
        ReactiveFormsModule,
        ToastrModule.forRoot({
            timeOut: 4000,
            positionClass: 'toast-bottom-right',
            preventDuplicates: true,
            progressBar: true,
        }),
    ],
    providers: [UtilsService, ApiService],
    bootstrap: [AppComponent]
})
export class AppModule { }
