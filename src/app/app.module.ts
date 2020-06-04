import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { GetStartedPage } from '../pages/cred/getstarted/getstarted';
import { GetStartedPage2 } from '../pages/cred/getstarted2/getstarted2';
import { RegisterPage } from '../pages/cred/register/register';
import { Register2Page } from '../pages/cred/register2/register2';
import { LoginPage } from '../pages/cred/login/login' ;
import { LoginFirstStepPage } from '../pages/cred/loginfirststep/loginfirststep' ;
import { InvitePage } from '../pages/cred/invite/invite' ;
import { JoinGroupPage } from '../pages/cred/joingroup/joingroup' ;
import { CreateProfilePage } from '../pages/cred/createprofile/createprofile' ;
import { HomePage } from '../pages/home/home/home';
import { HomeExamplePage } from '../pages/home/homeexample/homeexample';
import { FAQPage } from '../pages/feedback/faq/faq';
import { ComplaintPage } from '../pages/feedback/complaint/complaint';
import { SuggestionPage } from '../pages/feedback/suggestion/suggestion';
import { FillComplaintPage } from '../pages/feedback/fillcomplaint/fillcomplaint';
import { FillSuggestionPage } from '../pages/feedback/fillsuggestion/fillsuggestion';
import { FillCustomerPage } from '../pages/feedback/fillcustomer/fillcustomer';
import { FAQPagesGroup } from '../pages/feedback/faqpagesgroup/faqpagesgroup';
import { ComplaintPagesGroup } from '../pages/feedback/complaintpagesgroup/complaintpagesgroup';
import { SuggestionPagesGroup } from '../pages/feedback/suggestionpagesgroup/suggestionpagesgroup';
import { NewBoardPage } from '../pages/feedback/newboard/newboard';

import { InfoDialog } from '../pages/util/infodialog/infodialog' ;
import { UtilService } from '../services/utilservice' ;
import { CredService } from '../services/credservice' ;
import { FeedbackService } from '../services/feedbackservice' ;


@NgModule({
  declarations: [
    MyApp,
    InfoDialog,
    HomePage,
    GetStartedPage,
    GetStartedPage2,
    RegisterPage,
    Register2Page,
    LoginPage,
    LoginFirstStepPage,
    InvitePage,
    JoinGroupPage,
    CreateProfilePage,
    HomePage,
    HomeExamplePage,
    FAQPage,
    ComplaintPage,
    SuggestionPage,
    FillComplaintPage,
    FillSuggestionPage,
    FillCustomerPage,
    FAQPagesGroup,
    ComplaintPagesGroup,
    SuggestionPagesGroup,
    NewBoardPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    HttpModule,
    JsonpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    InfoDialog,
    HomePage,
    GetStartedPage,
    GetStartedPage2,
    RegisterPage,
    Register2Page,
    LoginPage,
    LoginFirstStepPage,
    InvitePage,
    JoinGroupPage,
    CreateProfilePage,
    HomePage,
    FAQPage,
    ComplaintPage,
    SuggestionPage,
    FillComplaintPage,
    FillSuggestionPage,
    FillCustomerPage,
    FAQPagesGroup,
    ComplaintPagesGroup,
    SuggestionPagesGroup,
    NewBoardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UtilService,
    CredService,
    FeedbackService
  ]
})
export class AppModule {}
