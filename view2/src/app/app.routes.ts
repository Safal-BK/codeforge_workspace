import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProblemsComponent } from './problems/problems.component';
import { SettingComponent } from './setting/setting.component';
import { RandomSessionComponent } from './shared/random-session/random-session.component';
import { VieweditorComponent } from './vieweditor/vieweditor.component';
import { EditorComponent } from './editor/editor.component';

import { TestmonacoComponent } from './testmonaco/testmonaco.component';

export const routes: Routes = [
    {
        path:'',
        children:[
            {path:'',component:HomeComponent},
            { path: 'problems', component: ProblemsComponent },
            { path: 'setting', component: SettingComponent },
            { path: 'random-session', component: RandomSessionComponent },
            { path: 'codeeditor/:id', component: EditorComponent },
        ]
       
      

    },
    { path: 'test', component: TestmonacoComponent },
    { path: 'vieweditor', component: VieweditorComponent },


];
