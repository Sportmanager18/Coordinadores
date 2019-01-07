webpackJsonp([4],{

/***/ 121:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AuthProvider = /** @class */ (function () {
    function AuthProvider() {
    }
    AuthProvider.login = function (email, password, onError) {
        var _this = this;
        this.error = null; // ponemos a null para evitar guardar errores anteriores
        if (!this.isLogged) {
            // la sesion persistira hasta que se cierre sesion en el dispositivo
            __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().setPersistence(__WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth.Auth.Persistence.LOCAL)
                .then(function () {
                return __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().signInWithEmailAndPassword(email, password);
            })
                .catch(function (error) {
                // Handle Errors here.
                console.log(error);
                _this.error = error;
                if (typeof onError !== 'undefined') {
                    onError();
                }
            });
        }
    };
    AuthProvider.logout = function () {
        if (this.isLogged) {
            __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().signOut();
        }
    };
    AuthProvider.onAuthChanged = function (callback) {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().onAuthStateChanged(function (user) {
            if (user) {
                _this.isLogged = true;
                _this.currentUser = user;
            }
            else {
                _this.isLogged = false;
                _this.currentUser = null;
            }
            if (typeof callback !== 'undefined') {
                callback();
            }
        });
    };
    AuthProvider.isLogged = false;
    AuthProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], AuthProvider);
    return AuthProvider;
}());

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AsistenciasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the AsistenciaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AsistenciasPage = /** @class */ (function () {
    function AsistenciasPage(alertCtrl, navCtrl, navParams) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.equipos = [];
        this.entrenadores = [];
        this.asistencias = new Array(20);
    }
    AsistenciasPage.prototype.cargarentrenadores = function () {
        var _this = this;
        var tipo = "fut11";
        var _loop_1 = function (cont) {
            if (this_1.equipos[cont].nombre == "AlevinA") {
                this_1.ptipo = cont;
                tipo = "fut7";
            }
            __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref('/Entrenadores/' + tipo + '/' + this_1.equipos[cont].nombre + '/entrenador').on('value', function (snapshot) {
                console.log(snapshot.val());
                _this.entrenadores[cont] = snapshot.val();
                console.log(_this.entrenadores);
            });
        };
        var this_1 = this;
        for (var cont = 0; cont < this.equipos.length; cont++) {
            _loop_1(cont);
        }
    };
    AsistenciasPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad AsistenciasPage');
        __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref('/Equipos/').on('value', function (snapshot) {
            _this.equipos = [];
            console.log(snapshot.val());
            snapshot.forEach(function (snap) {
                _this.equipos.push(snap.val());
                return false;
            });
            console.log(_this.equipos);
        });
        console.log(this.jugadores);
        this.cargarentrenadores();
    };
    AsistenciasPage.prototype.crearasistencia = function (entrenador) {
        this.id = this.entrenadores.indexOf(entrenador);
        console.log(entrenador);
        this.asistencias[this.id] = entrenador.value;
    };
    AsistenciasPage.prototype.subirasistencia = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Subir faltas',
            message: '¿Estas seguro de subir las faltas?',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Subir faltas',
                    role: 'destructive',
                    handler: function () {
                        var fjugador = 0;
                        for (var cont = 0; fjugador == 0; cont++) {
                            console.log(_this.asistencias[cont]);
                            if (_this.asistencias[cont] == true) {
                                if (cont < _this.ptipo) {
                                    var tipo = "fut11";
                                    var date = new Date();
                                    var dd = date.getDate();
                                    var mm = (date.getMonth() + 1);
                                    var yyyy = date.getFullYear();
                                    var fecha = void 0;
                                    fecha = yyyy + '-' + mm + '-' + dd;
                                    __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref('/Entrenadores/' + tipo + '/' + _this.equipos[cont].nombre + '/entrenador/Asistencias/' + fecha).set({
                                        "fecha": fecha
                                    });
                                }
                                else {
                                    var tipo = "fut7";
                                    var date = new Date();
                                    var dd = date.getDate();
                                    var mm = (date.getMonth() + 1);
                                    var yyyy = date.getFullYear();
                                    var fecha = void 0;
                                    fecha = yyyy + '-' + mm + '-' + dd;
                                    __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref('/Entrenadores/' + tipo + '/' + _this.equipos[cont].nombre + '/entrenador/Asistencias/' + fecha).set({
                                        "fecha": fecha
                                    });
                                }
                            }
                            if (_this.entrenadores[cont + 1] == null) {
                                fjugador = 1;
                            }
                        }
                        var alert = _this.alertCtrl.create({
                            title: 'Se han enviado las faltas de asistencia',
                            message: 'Las faltas de asistencia se han enviado exitosamente!',
                            buttons: [
                                {
                                    text: 'Aceptar',
                                    role: 'OK'
                                }
                            ]
                        });
                        alert.present();
                    }
                }
            ]
        });
        alert.present();
    };
    AsistenciasPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-asistencias',template:/*ion-inline-start:"D:\CordinadoresVallirana\src\pages\asistencias\asistencias.html"*/'<!--\n  Generated template for the AsistenciasPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Asistencias\n    <img src="assets/imgs/logosf.png"/>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h5>Marcar solo las faltas de asistencia</h5>\n  <ion-list>\n    <ion-item *ngFor="let entrenador of entrenadores">\n      <ion-label>{{entrenador.nombre}}</ion-label>\n      <ion-checkbox item-right value="false"  [(ngModel)]="entrenador.value" (click)="crearasistencia(entrenador)"></ion-checkbox>\n    </ion-item>  \n  </ion-list> \n  <button ion-button full (click)="subirasistencia()">Enviar Asistencia</button>\n  </ion-content>\n'/*ion-inline-end:"D:\CordinadoresVallirana\src\pages\asistencias\asistencias.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]) === "function" && _c || Object])
    ], AsistenciasPage);
    return AsistenciasPage;
    var _a, _b, _c;
}());

//# sourceMappingURL=asistencias.js.map

/***/ }),

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__ = __webpack_require__(121);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(menu, navCtrl, navParams, alertCtrl) {
        this.menu = menu;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.todo = {};
    }
    LoginPage_1 = LoginPage;
    LoginPage.prototype.ionViewDidEnter = function () {
        // cuando estamos en esta pagina
        this.menu.swipeEnable(false); // desactiva el swipe del menu
    };
    LoginPage.prototype.ionViewWillLeave = function () {
        //cuando salimos de esta pagina
        this.menu.swipeEnable(true); // activamos de nuevo el swipe del menu
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.loginFormListener = function () {
        var _this = this;
        var email = this.todo.email;
        LoginPage_1.user = this.todo.email;
        email = email + '@pbvallirana.com';
        var password = this.todo.password;
        console.log(email);
        __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__["a" /* AuthProvider */].login(email, password, function () {
            // si hay algun error durante el login se ejecutara esta funcion anonima
            if (__WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__["a" /* AuthProvider */].error != null) {
                _this.showAlert(__WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__["a" /* AuthProvider */].error.code, __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__["a" /* AuthProvider */].error.message);
            }
        });
    };
    LoginPage.prototype.showAlert = function (title, msg) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: msg,
            buttons: ['Aceptar']
        });
        alert.present();
    };
    LoginPage = LoginPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"D:\CordinadoresVallirana\src\pages\login\login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  \n  <ion-navbar>\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div class="form-container">\n    <img src="assets/imgs/logo.jpg" alt="logo-vallirana" />\n    <form (ngSubmit)="loginFormListener()">\n      <ion-list class="input-container">\n        <ion-item class="input-wrapper">\n          <ion-label floating>Equipo ej.(AlevinA)</ion-label>\n          <ion-input [(ngModel)]="todo.email" type="email" name="email" required></ion-input>\n        </ion-item>\n        <ion-item class="input-wrapper">\n          <ion-label floating>Contraseña</ion-label>\n          <ion-input [(ngModel)]="todo.password" type="password" name="password" required></ion-input>\n        </ion-item>\n      </ion-list>\n      <button ion-button type="submit" block>Iniciar Sesion</button>\n    </form>\n  </div>\n</ion-content>\n'/*ion-inline-end:"D:\CordinadoresVallirana\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _d || Object])
    ], LoginPage);
    return LoginPage;
    var LoginPage_1, _a, _b, _c, _d;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VerDatosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the VerDatosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var VerDatosPage = /** @class */ (function () {
    function VerDatosPage(alertCtrl, navCtrl, builder, navParams) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.builder = builder;
        this.navParams = navParams;
        this.equipos = [];
        this.nequipos = [];
        this.nminutos = 0;
        this.info = builder.group({
            Equipo: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            Jugador: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            Tipo: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required]
        });
    }
    VerDatosPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad VerDatosPage');
        __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref('/Equipos/').on('value', function (snapshot) {
            _this.equipos = [];
            console.log(snapshot.val());
            snapshot.forEach(function (snap) {
                _this.equipos.push(snap.val());
                return false;
            });
        });
    };
    VerDatosPage.prototype.buscarinformacion = function (form) {
        var _this = this;
        var cont = 0;
        this.equipos.forEach(function (equipo) {
            _this.nequipos[cont] = equipo.nombre;
            cont++;
        });
        for (var i = 0; i <= this.nequipos.length; i++) {
            if (this.nequipos[i] == "AlevinA") {
                var posicion = this.nequipos.indexOf(form.value.Equipo);
                if (posicion < i) {
                    this.tipo = "fut11";
                }
                else {
                    this.tipo = "fut7";
                }
            }
        }
        __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref('/Entrenadores/' + this.tipo + '/' + form.value.Equipo + '/entrenador/Asistencias').on('value', function (snapshot) {
            _this.informacion = [];
            snapshot.forEach(function (snap) {
                _this.informacion.push(snap.val());
                console.log(_this.informacion.length);
                return false;
            });
        });
        __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref('/' + form.value.Equipo).on('value', function (snapshot) {
            _this.datos = [];
            snapshot.forEach(function (snap) {
                _this.datos.push(snap.val());
                return false;
            });
        });
        __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref('/' + form.value.Equipo + '/Partidos').on('value', function (snapshot) {
            _this.partidos = [];
            snapshot.forEach(function (snap) {
                _this.partidos.push(snap.val());
                return false;
            });
        });
        if (this.informacion.length == 0) {
            document.getElementById("informacion").innerHTML = "No hay faltas de asistencia";
        }
        else {
            var asistencias = this.datos[4] * this.partidos.length;
            this.partidos.length++;
            document.getElementById("informacion").innerHTML = "<H4>Faltas de asistencia: " + this.informacion.length + " / " + asistencias + "</H4>";
            var contenido = document.createElement("DIV");
            var a = document.createAttribute("class");
            a.value = "asistencia";
            contenido.setAttributeNode(a);
            var node = document.createElement("H4");
            var textnode = document.createTextNode("Fechas de faltas:");
            node.appendChild(textnode);
            contenido.appendChild(node);
            for (var cont2 = 0; cont2 < this.informacion.length; cont2++) {
                var node = document.createElement("H5");
                var textnode = document.createTextNode(this.informacion[cont2].fecha);
                node.appendChild(textnode);
                contenido.appendChild(node);
            }
            document.getElementById("informacion").appendChild(contenido);
        }
    };
    VerDatosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-ver-datos',template:/*ion-inline-start:"D:\CordinadoresVallirana\src\pages\ver-datos\ver-datos.html"*/'<!--\n  Generated template for the VerDatosPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Ver Asistencias\n    <img src="assets/imgs/logosf.png"/>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h4>Para ver los datos seleccione un jugador y la informacion que quiere ver</h4>\n  <form [formGroup]="info" (ngSubmit)="buscarinformacion(info)">\n    <div class="info">\n      <ion-item>\n          <ion-select formControlName="Equipo" name="Equipo" required>\n            <ion-label >Seleccione Equipo</ion-label>\n            <ion-option *ngFor="let equipo of equipos" >{{ equipo.nombre }}</ion-option>\n          </ion-select>\n      </ion-item>\n      <ion-item>\n        <ion-select formControlName="Tipo" name="Tipo" required>\n          <ion-label >Seleccione informacion</ion-label>\n          <ion-option>Incidencias</ion-option>\n          <ion-option>Asistencias</ion-option>\n          <ion-option>Minutos</ion-option>\n          <ion-option>Descripcion</ion-option>\n        </ion-select>\n      </ion-item>\n    </div>\n    <button ion-button type="submit">Buscar</button>\n  </form>\n  <div id="informacion">\n\n  </div>\n</ion-content>\n'/*ion-inline-end:"D:\CordinadoresVallirana\src\pages\ver-datos\ver-datos.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]) === "function" && _d || Object])
    ], VerDatosPage);
    return VerDatosPage;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=ver-datos.js.map

/***/ }),

/***/ 155:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 155;

/***/ }),

/***/ 196:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/asistencias/asistencias.module": [
		441,
		3
	],
	"../pages/login/login.module": [
		442,
		2
	],
	"../pages/mostrar-equipos/mostrar-equipos.module": [
		443,
		0
	],
	"../pages/ver-datos/ver-datos.module": [
		444,
		1
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 196;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EquiposProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_jugadores_jugadores__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



/*
  Generated class for the EquiposProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var EquiposProvider = /** @class */ (function () {
    function EquiposProvider() {
    }
    EquiposProvider.fetch = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref('/' + __WEBPACK_IMPORTED_MODULE_1__providers_jugadores_jugadores__["a" /* JugadoresProvider */].categoria + '/Equipos').on('value', function (snapshot) {
            _this.equipos = snapshot.val();
            _this.cargado = true;
            console.log(_this.equipos);
        });
    };
    EquiposProvider.getEquipos = function () {
        return this.equipos;
    };
    EquiposProvider.cargado = false;
    EquiposProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], EquiposProvider);
    return EquiposProvider;
}());

//# sourceMappingURL=equipos.js.map

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(305);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_auth_auth__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_jugadores_jugadores__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_ver_datos_ver_datos__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_equipos_equipos__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_asistencias_asistencias__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_mostrar_equipos_mostrar_equipos__ = __webpack_require__(445);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                //   IncidenciasPage,
                __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_asistencias_asistencias__["a" /* AsistenciasPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_mostrar_equipos_mostrar_equipos__["a" /* MostrarEquiposPage */],
                //ListajugadoresPage,
                //PartidosPage,
                //SubirpartidoPage,
                //MinutosPage,
                //AsistenciaPage,
                __WEBPACK_IMPORTED_MODULE_9__pages_ver_datos_ver_datos__["a" /* VerDatosPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/asistencias/asistencias.module#AsistenciasPageModule', name: 'AsistenciasPage', segment: 'asistencias', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/mostrar-equipos/mostrar-equipos.module#MostrarEquiposPageModule', name: 'MostrarEquiposPage', segment: 'mostrar-equipos', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/ver-datos/ver-datos.module#VerDatosPageModule', name: 'VerDatosPage', segment: 'ver-datos', priority: 'low', defaultHistory: [] }
                    ]
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                //IncidenciasPage,
                __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_asistencias_asistencias__["a" /* AsistenciasPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_mostrar_equipos_mostrar_equipos__["a" /* MostrarEquiposPage */],
                //ListajugadoresPage,
                //PartidosPage,
                //SubirpartidoPage,
                //MinutosPage,
                //AsistenciaPage,
                __WEBPACK_IMPORTED_MODULE_9__pages_ver_datos_ver_datos__["a" /* VerDatosPage */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_7__providers_auth_auth__["a" /* AuthProvider */],
                __WEBPACK_IMPORTED_MODULE_8__providers_jugadores_jugadores__["a" /* JugadoresProvider */],
                __WEBPACK_IMPORTED_MODULE_10__providers_equipos_equipos__["a" /* EquiposProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 432:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_auth_auth__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_jugadores_jugadores__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_equipos_equipos__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_ver_datos_ver_datos__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_asistencias_asistencias__ = __webpack_require__(144);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var MyApp = /** @class */ (function () {
    function MyApp(alertCtrl, menuCtrl, platform, statusBar, splashScreen) {
        this.alertCtrl = alertCtrl;
        this.menuCtrl = menuCtrl;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */]; // pagina principal
        this.initializeApp();
        this.config = {
            apiKey: "AIzaSyCwjSI9ul72AIrxnA5qeGWEqZWivpMuAJs",
            authDomain: "pbvallirana-bf270.firebaseapp.com",
            databaseURL: "https://pbvallirana-bf270.firebaseio.com",
            projectId: "pbvallirana-bf270",
            storageBucket: "pbvallirana-bf270.appspot.com",
            messagingSenderId: "278474058990"
        };
        // used for an example of ngFor and navigation
        this.pages = [
            { icon: "contact", title: 'Asistencias', component: __WEBPACK_IMPORTED_MODULE_10__pages_asistencias_asistencias__["a" /* AsistenciasPage */] },
            { icon: "eye", title: 'Ver Asistencias', component: __WEBPACK_IMPORTED_MODULE_9__pages_ver_datos_ver_datos__["a" /* VerDatosPage */] }
            // { icon: "eye", title: 'Ver Equipos', component: MostrarEquiposPage }
        ];
        /*console.log('ionViewDidLoad ListajugadoresPage');
        firebase.database().ref('/InfantilA/Jugadores').on('value', (snapshot) => {
          console.log(snapshot.val());
          this.jugadores = snapshot.val();
        });
        this.ComprobacionAlert = this.alertCtrl.create({
          title: 'Comprobando sesion',
          subTitle: 'Estamos comprobando si hay alguna sesion iniciada en este dispositivo. Por favor espere.'
        });
        */
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            // inicializamos el firebase con su configuracion
            __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.initializeApp(_this.config);
            // llamamos al listener de la autenticacion
            // para comprobar si el usuario esta logueado o no
            //this.ComprobacionAlert.present();
            __WEBPACK_IMPORTED_MODULE_6__providers_auth_auth__["a" /* AuthProvider */].onAuthChanged(function () {
                if (__WEBPACK_IMPORTED_MODULE_6__providers_auth_auth__["a" /* AuthProvider */].isLogged) {
                    // cargamos equipos
                    __WEBPACK_IMPORTED_MODULE_8__providers_equipos_equipos__["a" /* EquiposProvider */].fetch();
                    // cargamos los jugadores de la cuenta que ha iniciado sesion
                    __WEBPACK_IMPORTED_MODULE_7__providers_jugadores_jugadores__["a" /* JugadoresProvider */].fetch();
                    // si se ha logueado cambiamos la pagina a la pagina principal
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_9__pages_ver_datos_ver_datos__["a" /* VerDatosPage */]);
                }
            });
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.signOut = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Cerrar sesion',
            message: '¿Estas seguro de cerrar sesion?',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Cerrar sesion',
                    role: 'destructive',
                    handler: function () {
                        __WEBPACK_IMPORTED_MODULE_6__providers_auth_auth__["a" /* AuthProvider */].logout();
                        _this.menuCtrl.close();
                        _this.nav.setRoot(_this.rootPage);
                    }
                }
            ]
        });
        alert.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]) === "function" && _a || Object)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\CordinadoresVallirana\src\app\app.html"*/'\n<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <img src="assets/imgs/logo.jpg" alt="avatarimg" />\n      <ion-title>{{ categoria }}</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        <ion-icon name="{{ p.icon }}" item-start></ion-icon>\n        {{p.title}}\n      </button>\n      <button ion-item (click)="signOut()">\n        <ion-icon name="exit" item-start></ion-icon>\n        Cerrar sesion\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"D:\CordinadoresVallirana\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]) === "function" && _f || Object])
    ], MyApp);
    return MyApp;
    var _a, _b, _c, _d, _e, _f;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 445:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MostrarEquiposPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the MostrarEquiposPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MostrarEquiposPage = /** @class */ (function () {
    function MostrarEquiposPage(alertCtrl, navCtrl, builder, navParams) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.builder = builder;
        this.navParams = navParams;
        this.informacion = [];
        this.equipos = [];
        this.nminutos = 0;
        this.infor = builder.group({
            Equipo: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            Tipo: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required]
        });
    }
    MostrarEquiposPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad VerDatosPage');
        __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref('/Equipos/').on('value', function (snapshot) {
            _this.equipos = [];
            console.log(snapshot.val());
            snapshot.forEach(function (snap) {
                _this.equipos.push(snap.val());
                return false;
            });
        });
    };
    MostrarEquiposPage.prototype.buscarinformacion = function (form) {
        var _this = this;
        var cont2, cont;
        console.log(form.value.Equipo);
        __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref('/' + form.value.Equipo).on('value', function (snapshot) {
            _this.datos = [];
            snapshot.forEach(function (snap) {
                _this.datos.push(snap.val());
                return false;
            });
        });
        __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref('/' + form.value.Equipo + '/Jugadores').on('value', function (snapshot) {
            _this.jugadores = [];
            snapshot.forEach(function (snap) {
                _this.jugadores.push(snap.val());
                return false;
            });
        });
        console.log(this.jugadores);
        var index = 0;
        this.jugadores.forEach(function (id) {
            __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref('/' + form.value.Equipo + '/Jugadores/' + index + '/' + form.value.Tipo).on('value', function (snapshot) {
                snapshot.forEach(function (snap) {
                    _this.informacion.push(snap.val());
                    return false;
                });
            });
            index++;
        });
        console.log(this.informacion);
        if (this.informacion[0] != null && this.informacion[0] != undefined) {
            document.getElementById("informacion").style.display = "block";
            if (form.value.Tipo == "Asistencia") {
            }
        }
        else {
            var alert = this.alertCtrl.create({
                title: 'No hay datos que mostrar',
                message: 'Los datos solicitados no existen!',
                buttons: [
                    {
                        text: 'Aceptar',
                        role: 'OK'
                    }
                ]
            });
            alert.present();
        }
    };
    MostrarEquiposPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-mostrar-equipos',template:/*ion-inline-start:"D:\CordinadoresVallirana\src\pages\mostrar-equipos\mostrar-equipos.html"*/'<!--\n  Generated template for the MostrarEquiposPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Ver Asistencias\n    <img src="assets/imgs/logosf.png"/>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <h4>Para ver los datos seleccione un Eqipo y la informacion que quiere ver</h4>\n  <form [formGroup]="infor" (ngSubmit)="buscarinformacion(infor)">\n    <div class="infor">\n        <ion-item>\n            <ion-select formControlName="Equipo" name="Equipo" required>\n              <ion-label >Seleccione Equipo</ion-label>\n              <ion-option *ngFor="let equipo of equipos" >{{ equipo.nombre }}</ion-option>\n            </ion-select>\n        </ion-item>\n      <ion-item>\n          <ion-select formControlName="Jugador" name="Jugador" required>\n            <ion-label >Seleccione Equipo</ion-label>\n            <ion-option *ngFor="let equipo of equipos" >{{ equipo.nombre }}</ion-option>\n          </ion-select>\n      </ion-item>\n      <ion-item>\n        <ion-select formControlName="Tipo" name="Tipo" required>\n          <ion-label >Seleccione informacion</ion-label>\n          <ion-option>Incidencias</ion-option>\n          <ion-option>Asistencias</ion-option>\n          <ion-option>Minutos</ion-option>\n          <ion-option>Descripcion</ion-option>\n        </ion-select>\n      </ion-item>\n    </div>\n    <button ion-button type="submit">Buscar</button>\n  </form>\n  <div *ngFor="let valor of valor" id="informacion">\n      <p>{{valor.nombre}}/{{valor.tipo}}</p>\n  </div>\n</ion-content>\n'/*ion-inline-end:"D:\CordinadoresVallirana\src\pages\mostrar-equipos\mostrar-equipos.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]) === "function" && _d || Object])
    ], MostrarEquiposPage);
    return MostrarEquiposPage;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=mostrar-equipos.js.map

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JugadoresProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


/*
  Generated class for the JugadoresProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var JugadoresProvider = /** @class */ (function () {
    function JugadoresProvider() {
    }
    JugadoresProvider.fetch = function () {
        console.log(this.categoria);
        this.fetchJugadores();
    };
    JugadoresProvider.fetchJugadores = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.database().ref('/' + this.categoria + '/Jugadores').on('value', function (snapshot) {
            _this.jugadores = snapshot.val();
            console.log(_this.jugadores);
        });
    };
    JugadoresProvider.getJugadores = function () {
        return this.jugadores;
    };
    JugadoresProvider.guardarIncidencia = function (id, _asunto, _descripcion, callback) {
        var date = new Date();
        var dd = date.getDate();
        var mm = (date.getMonth() + 1);
        var yyyy = date.getFullYear();
        var fecha;
        fecha = yyyy + '-' + mm + '-' + dd;
        __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.database().ref('/' + this.categoria + '/Jugadores/' + id + '/Incidencias/' + fecha).set({
            Asunto: _asunto,
            Incidencia: _descripcion,
            Fecha: fecha
        })
            .then(function () {
            console.log("Incidencia enviada");
            if (typeof callback !== 'undefined') {
                console.log("Ejecutando instruciones opcionales...");
                callback();
            }
        });
    };
    JugadoresProvider.jugadores = [];
    JugadoresProvider.error = null;
    JugadoresProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], JugadoresProvider);
    return JugadoresProvider;
}());

/**
 * asignaiones: {
 *  infantilA@pbvallirana.com: InfantilA
 * }
 */ 
//# sourceMappingURL=jugadores.js.map

/***/ })

},[282]);
//# sourceMappingURL=main.js.map