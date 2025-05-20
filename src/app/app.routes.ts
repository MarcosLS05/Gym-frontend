import { Routes } from '@angular/router';

import { SharedHomeRoutedComponent } from './component/shared/shared.home.routed/shared.home.routed.component';

import { UsuarioAdminPlistRoutedComponent } from './component/usuario/usuario.admin.plist.routed/usuario.admin.plist.routed.component';
import { UsuarioAdminEditRoutedComponent } from './component/usuario/usuario.admin.edit.routed/usuario.admin.edit.routed.component';
import { UsuarioAdminViewRoutedComponent } from './component/usuario/usuario.admin.view.routed/usuario.admin.view.routed.component';
import { UsuarioAdminCreateRoutedComponent } from './component/usuario/usuario.admin.create.routed/usuario.admin.create.routed.component';
import { UsuarioAdminDeleteRoutedComponent } from './component/usuario/usuario.admin.delete.routed/usuario.admin.delete.component';
import { UsuarioXTipousuarioAdminPlistRoutedComponent } from './component/usuario/usuario.xtipousuario.admin.plist.routed/usuario.xtipousuario.admin.plist.routed.component';
//import { UsuarioXPlanesentrenamientoAdminPlistRoutedComponent } from './component/usuario/usuario.xplanesentrenamiento.admin.plist.routed/usuario.xplanesentrenamiento.admin.plist.routed.component';
import { newusuarioACCComponent } from './component/usuario/newusuarioACC.routed/newusuarioAACC.component';


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
import { PlanesentrenamientoEntrenadorCreateRoutedComponent } from './component/planesentrenamiento/planesentrenamiento.entrenador.create.routed/planesentrenamiento.entrenador.create.routed.component';
import { PlanesentrenamientoEntrenadorPlistRoutedComponent } from './component/planesentrenamiento/planesentrenamiento.entrenador.plist.routed/planesentrenamiento.entrenador.plist.routed.component';
import { PlanesentrenamientoEntrenadorEditRoutedComponent } from './component/planesentrenamiento/planesentrenamiento.entrenador.edit.routed/planesentrenamiento.entrenador.edit.routed.component';
import { PlanesentrenamientoEntrenadorViewRoutedComponent } from './component/planesentrenamiento/planesentrenamiento.entrenador.view.routed/planesentrenamiento.entrenador.view.routed.component';
import { PlanesentrenamientoEntrenadorDeleteRoutedComponent } from './component/planesentrenamiento/planesentrenamiento.entrenador.delete.routed/planesentrenamiento.entrenador.delete.routed.component';

import { GrupocontrataAdminPlistRoutedComponent } from './component/grupocontrata/grupocontrata.admin.plist.routed/grupocontrata.admin.plist.routed.component';
import { GrupocontrataAdminEditRoutedComponent } from './component/grupocontrata/grupocontrata.admin.edit.routed/grupocontrata.admin.edit.routed.component';
import { GrupocontrataAdminViewRoutedComponent } from './component/grupocontrata/grupocontrata.admin.view.routed/grupocontrata.admin.view.routed.component';
import { GrupocontrataAdminCreateRoutedComponent } from './component/grupocontrata/grupocontrata.admin.create.routed/grupocontrata.admin.create.routed.component';
import { GrupocontrataAdminDeleteRoutedComponent } from './component/grupocontrata/grupocontrata.admin.delete.routed/grupocontrata.admin.delete.component';
import { GrupocontrataXUsuarioAdminPlistRoutedComponent } from './component/grupocontrata/grupocontrata.xusuario.admin.plist.routed/grupocontrata.xusuario.admin.plist.routed.component';

import { NavegacionClienteRoutedComponent } from './component/navegacion/navegacion/navegacion.cliente.routed.component';

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
    { path: 'home', component: SharedHomeRoutedComponent },
    { path: 'login', component: SharedLoginRoutedComponent },
    { path: 'logout', component: SharedLogoutRoutedComponent },
    { path: 'byemail/:email', component: SharedByemailRoutedComponent, canActivate: [AdminOrEntrenadorPersonalOrClienteGuard] },

    { path: 'admin/usuario/plist', component: UsuarioAdminPlistRoutedComponent, canActivate: [AdminGuard] },
    { path: 'admin/usuario/edit/:id', component: UsuarioAdminEditRoutedComponent, canActivate: [AdminGuard]},
    { path: 'admin/usuario/view/:id', component: UsuarioAdminViewRoutedComponent, canActivate: [AdminGuard]},
    { path: 'admin/usuario/create', component: UsuarioAdminCreateRoutedComponent, canActivate: [AdminGuard], pathMatch: 'full', },
    { path: 'admin/usuario/delete/:id', component: UsuarioAdminDeleteRoutedComponent, canActivate: [AdminGuard]},
    { path: 'admin/usuario/plist/xtipousuario/:id', component: UsuarioXTipousuarioAdminPlistRoutedComponent, canActivate: [AdminGuard]},
    { path: 'newusuario', component: newusuarioACCComponent, pathMatch: 'full' },

    { path: 'admin/tipousuario/plist', component: TipousuarioAdminPlistRoutedComponent, canActivate: [AdminGuard] },
    { path: 'admin/tipousuario/edit/:id', component: TipousuarioAdminEditRoutedComponent, canActivate: [AdminGuard]},
    { path: 'admin/tipousuario/view/:id', component: TipousuarioAdminViewRoutedComponent, canActivate: [AdminGuard]},
    { path: 'admin/tipousuario/create', component: TipousuarioAdminCreateRoutedComponent, canActivate: [AdminGuard], pathMatch: 'full', },
    { path: 'admin/tipousuario/delete/:id', component: TipousuarioAdminDeleteRoutedComponent, canActivate: [AdminGuard]},

    { path: 'admin/planesentrenamiento/create', component: PlanesentrenamientoAdminCreateRoutedComponent, pathMatch: 'full', canActivate: [AdminOrEntrenadorPersonalGuard] },
    { path: 'admin/planesentrenamiento/plist', component: PlanesentrenamientoAdminPlistRoutedComponent, canActivate: [AdminOrEntrenadorPersonalGuard]},
    { path: 'admin/planesentrenamiento/edit/:id', component: PlanesentrenamientoAdminEditRoutedComponent, canActivate: [AdminOrEntrenadorPersonalGuard]},
    { path: 'admin/planesentrenamiento/view/:id', component: PlanesentrenamientoAdminViewRoutedComponent, canActivate: [AdminOrEntrenadorPersonalGuard]},
    { path: 'admin/planesentrenamiento/delete/:id', component: PlanesentrenamientoAdminDeleteRoutedComponent, canActivate: [AdminGuard]},
    { path: 'entrenador/planesentrenamiento/create', component: PlanesentrenamientoEntrenadorCreateRoutedComponent, canActivate: [EntrenadorPersonalGuard]},
    { path: 'entrenador/planesentrenamiento/plist', component: PlanesentrenamientoEntrenadorPlistRoutedComponent, canActivate: [EntrenadorPersonalGuard] },
    { path: 'entrenador/planesentrenamiento/edit/:id', component: PlanesentrenamientoEntrenadorEditRoutedComponent, canActivate: [EntrenadorPersonalGuard]},
    { path: 'entrenador/planesentrenamiento/view/:id', component: PlanesentrenamientoEntrenadorViewRoutedComponent, canActivate: [EntrenadorPersonalGuard]},
    { path: 'entrenador/planesentrenamiento/delete/:id', component: PlanesentrenamientoEntrenadorDeleteRoutedComponent, canActivate: [EntrenadorPersonalGuard]},

    { path: 'admin/grupocontrata/create', component: GrupocontrataAdminCreateRoutedComponent, canActivate: [AdminGuard], pathMatch: 'full', },
    { path: 'admin/grupocontrata/plist', component: GrupocontrataAdminPlistRoutedComponent, canActivate: [AdminGuard]},
    { path: 'admin/grupocontrata/edit/:id', component: GrupocontrataAdminEditRoutedComponent, canActivate: [AdminGuard]},
    { path: 'admin/grupocontrata/view/:id', component: GrupocontrataAdminViewRoutedComponent, canActivate: [AdminGuard]},
    { path: 'admin/grupocontrata/delete/:id', component: GrupocontrataAdminDeleteRoutedComponent, canActivate: [AdminGuard]},
    { path: 'admin/grupocontrata/xusuario/plist/:id', component: GrupocontrataXUsuarioAdminPlistRoutedComponent, canActivate: [AdminGuard] },

    { path: 'cliente/navegacion', component: NavegacionClienteRoutedComponent },


];
