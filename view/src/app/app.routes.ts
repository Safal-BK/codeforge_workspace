import { Routes } from '@angular/router';
import { HomeComponent } from './user/home/home.component';
import { CreateSessionComponent } from './user/create-session/create-session.component';
import { EditorComponent } from './user/editor/editor.component';
import { ProblemsComponent } from './user/problems/problems.component';
import { CreateProblemComponent } from './user/create-problem/create-problem.component';
import { NotvalidComponent } from './user/notvalid/notvalid.component';
import { VieweditorComponent } from './user/vieweditor/vieweditor.component';
import { ViewproblemComponent } from './user/viewproblem/viewproblem.component';



export const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'cs', component: CreateSessionComponent },
    { path: 'codeeditor/:id', component: EditorComponent },
    { path: 'vieweditor/:id', component: VieweditorComponent },
    { path: 'problems', component: ProblemsComponent },
    { path: 'problems/:id', component: ViewproblemComponent },
    { path: 'problem/new', component: CreateProblemComponent },
    { path: 'notvalid', component: NotvalidComponent },

];
