import { Routes } from '@angular/router';

import { SharedHomeRoutedComponent } from './component/shared/shared.home.routed/shared.home.routed.component';

import { UsuarioAdminPlistRoutedComponent } from './component/usuario/usuario.admin.plist.routed/usuario.admin.plist.routed.component';
import { UsuarioAdminEditRoutedComponent } from './component/usuario/usuario.admin.edit.routed/usuario.admin.edit.routed.component';
import { UsuarioAdminViewRoutedComponent } from './component/usuario/usuario.admin.view.routed/usuario.admin.view.routed.component';
import { UsuarioAdminCreateRoutedComponent } from './component/usuario/usuario.admin.create.routed/usuario.admin.create.routed.component';
import { UsuarioAdminDeleteRoutedComponent } from './component/usuario/usuario.admin.delete.routed/usuario.admin.delete.component';

import { TipousuarioAdminPlistRoutedComponent } from './component/tipousuario/tipousuario.admin.plist.routed/tipousuario.admin.plist.routed.component';
import { TipousuarioAdminEditRoutedComponent } from './component/tipousuario/tipousuario.admin.edit.routed/tipousuario.admin.edit.routed.component';
import { TipousuarioAdminViewRoutedComponent } from './component/tipousuario/tipousuario.admin.view.routed/tipousuario.admin.view.routed.component';
import { TipousuarioAdminCreateRoutedComponent } from './component/tipousuario/tipousuario.admin.create.routed/tipousuario.admin.create.routed.component';
import { TipousuarioAdminDeleteRoutedComponent } from './component/tipousuario/tipousuario.admin.delete.routed/tipousuario.admin.delete.component';

import { PlanesentrenamientoAdminCreateRoutedComponent } from './component/planesentrenamiento/planesentrenamiento.admin.create.routed/planesentrenamiento.admin.create.routed.component';
import { PlanesentrenamientoAdminPlistRoutedComponent } from './component/planesentrenamiento/planesentrenamiento.admin.plist.routed/planesentrenamiento.admin.plist.routed.component';
import { PlanesentrenamientoAdminEditRoutedComponent } from './component/planesentrenamiento/planesentrenamiento.admin.edit.routed/planesentrenamiento.admin.edit.routed.component';
import { PlanesentrenamientoAdminViewRoutedComponent } from './component/planesentrenamiento/planesentrenamiento.admin.view.routed/planesentrenamiento.admin.view.routed.component';
import { PlanesentrenamientoAdminDeleteRoutedComponent } from './component/planesentrenamiento/planesentrenamiento.admin.delete.routed/planesentrenamiento.admin.delete.component';

import { GrupocontrataAdminPlistRoutedComponent } from './component/grupocontrata/grupocontrata.admin.plist.routed/grupocontrata.admin.plist.routed.component';
import { GrupocontrataAdminEditRoutedComponent } from './component/grupocontrata/grupocontrata.admin.edit.routed/grupocontrata.admin.edit.routed.component';
import { GrupocontrataAdminViewRoutedComponent } from './component/grupocontrata/grupocontrata.admin.view.routed/grupocontrata.admin.view.routed.component';
import { GrupocontrataAdminCreateRoutedComponent } from './component/grupocontrata/grupocontrata.admin.create.routed/grupocontrata.admin.create.routed.component';
import { GrupocontrataAdminDeleteRoutedComponent } from './component/grupocontrata/grupocontrata.admin.delete.routed/grupocontrata.admin.delete.component';


import { serverURL } from './environment/environment';




export const routes: Routes = [
    { path: '', component: SharedHomeRoutedComponent },
    { path: 'home', component: SharedHomeRoutedComponent },

    { path: 'admin/usuario/plist', component: UsuarioAdminPlistRoutedComponent },
    { path: 'admin/usuario/edit/:id', component: UsuarioAdminEditRoutedComponent, },
    { path: 'admin/usuario/view/:id', component: UsuarioAdminViewRoutedComponent, },
    { path: 'admin/usuario/create', component: UsuarioAdminCreateRoutedComponent, pathMatch: 'full', },
    { path: 'admin/usuario/delete/:id', component: UsuarioAdminDeleteRoutedComponent, },

    { path: 'admin/tipousuario/plist', component: TipousuarioAdminPlistRoutedComponent },
    { path: 'admin/tipousuario/edit/:id', component: TipousuarioAdminEditRoutedComponent, },
    { path: 'admin/tipousuario/view/:id', component: TipousuarioAdminViewRoutedComponent, },
    { path: 'admin/tipousuario/create', component: TipousuarioAdminCreateRoutedComponent, pathMatch: 'full', },
    { path: 'admin/tipousuario/delete/:id', component: TipousuarioAdminDeleteRoutedComponent, },

    { path: 'admin/planesentrenamiento/create', component: PlanesentrenamientoAdminCreateRoutedComponent, pathMatch: 'full', },
    { path: 'admin/planesentrenamiento/plist', component: PlanesentrenamientoAdminPlistRoutedComponent },
    { path: 'admin/planesentrenamiento/edit/:id', component: PlanesentrenamientoAdminEditRoutedComponent, },
    { path: 'admin/planesentrenamiento/view/:id', component: PlanesentrenamientoAdminViewRoutedComponent, },
    { path: 'admin/planesentrenamiento/delete/:id', component: PlanesentrenamientoAdminDeleteRoutedComponent, },

    { path: 'admin/grupocontrata/create', component: GrupocontrataAdminCreateRoutedComponent, pathMatch: 'full', },
    { path: 'admin/grupocontrata/plist', component: GrupocontrataAdminPlistRoutedComponent },
    { path: 'admin/grupocontrata/edit/:id', component: GrupocontrataAdminEditRoutedComponent, },
    { path: 'admin/grupocontrata/view/:id', component: GrupocontrataAdminViewRoutedComponent, },
    { path: 'admin/grupocontrata/delete/:id', component: GrupocontrataAdminDeleteRoutedComponent, },
];
