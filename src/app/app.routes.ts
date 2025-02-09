import { Routes } from '@angular/router';

import { SharedHomeRoutedComponent } from './component/shared/shared.home.routed/shared.home.routed.component';

import { UsuarioAdminPlistRoutedComponent } from './component/usuario/usuario.admin.plist.routed/usuario.admin.plist.routed.component';
import { UsuarioAdminEditRoutedComponent } from './component/usuario/usuario.admin.edit.routed/usuario.admin.edit.routed.component';
import { UsuarioAdminViewRoutedComponent } from './component/usuario/usuario.admin.view.routed/usuario.admin.view.routed.component';
import { UsuarioAdminCreateRoutedComponent } from './component/usuario/usuario.admin.create.routed/usuario.admin.create.routed.component';
import { UsuarioAdminDeleteRoutedComponent } from './component/usuario/usuario.admin.delete.routed/usuario.admin.delete.component';
import { UsuarioXTipousuarioAdminPlistRoutedComponent } from './component/usuario/usuario.xtipousuario.admin.plist.routed/usuario.xtipousuario.admin.plist.routed.component';

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


import { SharedLoginRoutedComponent } from './component/shared/shared.login.routed/shared.login.routed';
import { SharedLogoutRoutedComponent } from     './component/shared/shared.logout.routed/shared.logout.routed';
import { SharedByemailRoutedComponent } from './component/shared/shared.byemail.routed/shared.byemail.routed.component';
import { ClienteGuard } from './guards/cliente.guard';
import { AdminGuard } from './guards/admin.guard';
import { AdminOrEntrenadorPersonalGuard } from './guards/admin-or-EntrenadorPersonal.guard';
import { AdminOrEntrenadorPersonalOrClienteGuard } from './guards/admin-or-EntrenadorPersonal-or-Cliente.guard';


import { serverURL } from './environment/environment';
import { EntrenadorPersonalGuard } from './guards/EntrenadorPersonal.guard';




export const routes: Routes = [

    { path: '', component: SharedHomeRoutedComponent, canActivate: [AdminOrEntrenadorPersonalGuard] },
    { path: 'home', component: SharedHomeRoutedComponent, canActivate: [AdminOrEntrenadorPersonalGuard] },
    { path: 'login', component: SharedLoginRoutedComponent },
    { path: 'logout', component: SharedLogoutRoutedComponent },
    { path: 'byemail/:email', component: SharedByemailRoutedComponent, canActivate: [AdminOrEntrenadorPersonalOrClienteGuard] },

    { path: 'admin/usuario/plist', component: UsuarioAdminPlistRoutedComponent, canActivate: [AdminGuard] },
    { path: 'admin/usuario/edit/:id', component: UsuarioAdminEditRoutedComponent, canActivate: [AdminGuard]},
    { path: 'admin/usuario/view/:id', component: UsuarioAdminViewRoutedComponent, canActivate: [AdminGuard]},
    { path: 'admin/usuario/create', component: UsuarioAdminCreateRoutedComponent, canActivate: [AdminGuard], pathMatch: 'full', },
    { path: 'admin/usuario/delete/:id', component: UsuarioAdminDeleteRoutedComponent, canActivate: [AdminGuard]},
    { path: 'admin/usuario/plist/xtipousuario/:id', component: UsuarioXTipousuarioAdminPlistRoutedComponent, canActivate: [AdminGuard]},

    { path: 'admin/tipousuario/plist', component: TipousuarioAdminPlistRoutedComponent, canActivate: [AdminGuard] },
    { path: 'admin/tipousuario/edit/:id', component: TipousuarioAdminEditRoutedComponent, canActivate: [AdminGuard]},
    { path: 'admin/tipousuario/view/:id', component: TipousuarioAdminViewRoutedComponent, canActivate: [AdminGuard]},
    { path: 'admin/tipousuario/create', component: TipousuarioAdminCreateRoutedComponent, canActivate: [AdminGuard], pathMatch: 'full', },
    { path: 'admin/tipousuario/delete/:id', component: TipousuarioAdminDeleteRoutedComponent, canActivate: [AdminGuard]},

    { path: 'admin/planesentrenamiento/create', component: PlanesentrenamientoAdminCreateRoutedComponent, pathMatch: 'full', },
    { path: 'admin/planesentrenamiento/plist', component: PlanesentrenamientoAdminPlistRoutedComponent, canActivate: [AdminGuard]},
    { path: 'admin/planesentrenamiento/edit/:id', component: PlanesentrenamientoAdminEditRoutedComponent, canActivate: [AdminGuard]},
    { path: 'admin/planesentrenamiento/view/:id', component: PlanesentrenamientoAdminViewRoutedComponent, canActivate: [AdminGuard]},
    { path: 'admin/planesentrenamiento/delete/:id', component: PlanesentrenamientoAdminDeleteRoutedComponent, },

    { path: 'admin/grupocontrata/create', component: GrupocontrataAdminCreateRoutedComponent, canActivate: [AdminGuard], pathMatch: 'full', },
    { path: 'admin/grupocontrata/plist', component: GrupocontrataAdminPlistRoutedComponent, canActivate: [AdminGuard]},
    { path: 'admin/grupocontrata/edit/:id', component: GrupocontrataAdminEditRoutedComponent, canActivate: [AdminGuard]},
    { path: 'admin/grupocontrata/view/:id', component: GrupocontrataAdminViewRoutedComponent, canActivate: [AdminGuard]},
    { path: 'admin/grupocontrata/delete/:id', component: GrupocontrataAdminDeleteRoutedComponent, canActivate: [AdminGuard]},
];
