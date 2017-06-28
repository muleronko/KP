/// Fake namespace for optional overrides
///
/// 	namespace $ { export var x = 1 , y = 1 } // defaults
/// 	namespace $.$mol { export var x = 2 } // overrides
/// 	namespace $.$mol { console.log( x , y ) } // usage
///
this.$ = this.$ || this
var $ = this.$
$.$mol = $

;
var $;
(function ($) {
    var $mol_dict_shim = (function () {
        function $mol_dict_shim() {
            this._keys = {};
            this._values = {};
            this.size = 0;
        }
        $mol_dict_shim.prototype.set = function (key, value) {
            var keyStr = String(key);
            var keys = this._keys[keyStr];
            if (keys) {
                var index = keys.indexOf(key);
                if (index === -1) {
                    index = keys.length;
                    keys.push(key);
                    ++this.size;
                }
                this._values[keyStr][index] = value;
            }
            else {
                this._keys[keyStr] = [key];
                this._values[keyStr] = [value];
                ++this.size;
            }
            return this;
        };
        $mol_dict_shim.prototype.get = function (key) {
            var keyStr = String(key);
            var list = this._keys[keyStr];
            if (!list)
                return void 0;
            var index = list.indexOf(key);
            if (index === -1)
                return void 0;
            return this._values[keyStr][index];
        };
        $mol_dict_shim.prototype.has = function (key) {
            var keyStr = String(key);
            var list = this._keys[keyStr];
            if (!list)
                return false;
            return list.indexOf(key) !== -1;
        };
        $mol_dict_shim.prototype.delete = function (key) {
            var keyStr = String(key);
            var keys = this._keys[keyStr];
            if (!keys)
                return;
            var index = keys.indexOf(key);
            if (index === -1)
                return;
            keys.splice(index, 1);
            this._values[keyStr].splice(index, 1);
            --this.size;
        };
        $mol_dict_shim.prototype.forEach = function (handle) {
            for (var keyStr in this._keys) {
                if (!this._keys.hasOwnProperty(keyStr))
                    continue;
                var values = this._values[keyStr];
                this._keys[keyStr].forEach(function (key, index) {
                    handle(values[index], key);
                });
            }
        };
        $mol_dict_shim.prototype.keys = function () {
            var keys = [];
            this.forEach(function (val, key) {
                keys.push(key);
            });
            return keys;
        };
        $mol_dict_shim.prototype.values = function () {
            var values = [];
            this.forEach(function (val, key) {
                values.push(val);
            });
            return values;
        };
        $mol_dict_shim.prototype.entries = function () {
            var entries = [];
            this.forEach(function (val, key) {
                entries.push([key, val]);
            });
            return entries;
        };
        $mol_dict_shim.prototype.clear = function () {
            this._keys = {};
            this._values = {};
            this.size = 0;
        };
        return $mol_dict_shim;
    }());
    $.$mol_dict_shim = $mol_dict_shim;
})($ || ($ = {}));
//dict.js.map
;
$.$mol_dict = ( typeof Map === 'function' ) ? Map : $.$mol_dict_shim

;
var $;
(function ($) {
    $.$mol_func_name_dict = new $.$mol_dict();
    function $mol_func_name(func) {
        if (func.name)
            return func.name;
        if ($.$mol_func_name_dict.has(func))
            return $.$mol_func_name_dict.get(func);
        var name = Function.prototype.toString.call(func).match(/^function ([a-z0-9_$]*)/)[1];
        $.$mol_func_name_dict.set(func, name);
        return name;
    }
    $.$mol_func_name = $mol_func_name;
})($ || ($ = {}));
//func.js.map
;
var $;
(function ($) {
    function $mol_log(path, values) {
        var filter = $mol_log.filter();
        if (filter == null)
            return;
        if (path.indexOf(filter) === -1)
            return;
        var time = new Date().toLocaleTimeString();
        console.log(time, path, values);
    }
    $.$mol_log = $mol_log;
    (function ($mol_log) {
        var _filter;
        function filter(next) {
            if (next !== void 0) {
                if (next == null) {
                    sessionStorage.removeItem('$mol_log.filter()');
                }
                else {
                    sessionStorage.setItem('$mol_log.filter()', next);
                }
                _filter = next;
            }
            if (_filter !== void 0)
                return _filter;
            return _filter = sessionStorage.getItem('$mol_log.filter()');
        }
        $mol_log.filter = filter;
    })($mol_log = $.$mol_log || ($.$mol_log = {}));
})($ || ($ = {}));
//log.web.js.map
;
var $;
(function ($) {
    var $mol_object = (function () {
        function $mol_object() {
            this['destroyed()'] = false;
        }
        $mol_object.prototype.Class = function () {
            return this.constructor;
        };
        $mol_object.toString = function () {
            return $.$mol_func_name(this);
        };
        $mol_object.prototype.object_owner = function (next) {
            if (this['object_owner()'])
                return this['object_owner()'];
            return this['object_owner()'] = next;
        };
        $mol_object.prototype.object_field = function (next) {
            if (this['object_field()'])
                return this['object_field()'] || '';
            return this['object_field()'] = next;
        };
        $mol_object.prototype.toString = function () {
            var path = '';
            var owner = this.object_owner();
            if (owner)
                path = owner.toString();
            var field = this.object_field();
            if (field)
                path += '.' + field;
            return path;
        };
        $mol_object.prototype.toJSON = function () {
            return this.toString();
        };
        $mol_object.prototype.setup = function (script) {
            script(this);
            return this;
        };
        $mol_object.prototype.destroyed = function (next) {
            if (next === void 0)
                return this['destroyed()'];
            this['destroyed()'] = next;
            this.log(['.destroyed()', next]);
            return next;
        };
        $mol_object.prototype.log = function (values) {
            if ($.$mol_log.filter() == null)
                return;
            $.$mol_log(this.toString(), values);
        };
        return $mol_object;
    }());
    $.$mol_object = $mol_object;
})($ || ($ = {}));
//object.js.map
;
var $;
(function ($) {
    var $mol_set_shim = (function () {
        function $mol_set_shim() {
            this._index = {};
            this.size = 0;
        }
        $mol_set_shim.prototype.add = function (value) {
            var key = String(value);
            var list = this._index[key];
            if (list) {
                if (list.indexOf(value) !== -1)
                    return this;
                list.push(value);
            }
            else {
                list = this._index[key] = [value];
            }
            ++this.size;
            return this;
        };
        $mol_set_shim.prototype.has = function (value) {
            var key = String(value);
            var list = this._index[key];
            if (!list)
                return false;
            return list.indexOf(value) !== -1;
        };
        $mol_set_shim.prototype.delete = function (value) {
            var key = String(value);
            var list = this._index[key];
            if (!list)
                return;
            var index = list.indexOf(value);
            if (index === -1)
                return;
            list.splice(index, 1);
            --this.size;
        };
        $mol_set_shim.prototype.forEach = function (handle) {
            for (var key in this._index) {
                if (!this._index.hasOwnProperty(key))
                    continue;
                this._index[key].forEach(function (val, index) { return handle(val, val); });
            }
        };
        $mol_set_shim.prototype.keys = function () {
            var keys = [];
            this.forEach(function (val, key) {
                keys.push(key);
            });
            return keys;
        };
        $mol_set_shim.prototype.values = function () {
            var values = [];
            this.forEach(function (val, key) {
                values.push(val);
            });
            return values;
        };
        $mol_set_shim.prototype.entries = function () {
            var entries = [];
            this.forEach(function (val, key) {
                entries.push([val, key]);
            });
            return entries;
        };
        $mol_set_shim.prototype.clear = function () {
            this._index = {};
            this.size = 0;
        };
        return $mol_set_shim;
    }());
    $.$mol_set_shim = $mol_set_shim;
})($ || ($ = {}));
//set.js.map
;
$.$mol_set = ( typeof Set === 'function' ) ? Set : $.$mol_set_shim

;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_defer = (function (_super) {
        __extends($mol_defer, _super);
        function $mol_defer(run) {
            var _this = _super.call(this) || this;
            _this.run = run;
            $mol_defer.add(_this);
            return _this;
        }
        $mol_defer.prototype.destroyed = function (next) {
            if (next)
                $mol_defer.drop(this);
            return _super.prototype.destroyed.call(this, next);
        };
        $mol_defer.schedule = function () {
            var _this = this;
            if (this.timer)
                return;
            this.timer = this.scheduleNative(function () {
                _this.timer = 0;
                _this.run();
            });
        };
        $mol_defer.unschedule = function () {
            if (!this.timer)
                return;
            cancelAnimationFrame(this.timer);
            this.timer = 0;
        };
        $mol_defer.add = function (defer) {
            this.all.push(defer);
            this.schedule();
        };
        $mol_defer.drop = function (defer) {
            var index = this.all.indexOf(defer);
            if (index >= 0)
                this.all.splice(index, 1);
        };
        $mol_defer.run = function () {
            if (this.all.length === 0)
                return;
            this.schedule();
            for (var defer; defer = this.all.pop();)
                defer.run();
        };
        return $mol_defer;
    }($.$mol_object));
    $mol_defer.all = [];
    $mol_defer.timer = 0;
    $mol_defer.scheduleNative = (typeof requestAnimationFrame == 'function')
        ? function (handler) { return requestAnimationFrame(handler); }
        : function (handler) { return setTimeout(handler, 16); };
    $.$mol_defer = $mol_defer;
})($ || ($ = {}));
//defer.js.map
;
var $;
(function ($) {
    $.$mol_state_stack = new $.$mol_dict();
})($ || ($ = {}));
//stack.js.map
;
void function() {

	if( typeof alert === 'function' ) {
		var nativeAlert = alert
		window.alert = function alert( message ) {
			console.warn( 'Alerts causes atom synchronization problems in IE. Use custom notificator instead.' )
			return nativeAlert( message )
		}
	}

	if( typeof confirm === 'function' ) {
		var nativeConfirm = confirm
		window.confirm = function confirm( question ) {
			console.warn( 'Confirms causes atom synchronization problems in IE. Use custom dialog instead.' )
			return nativeConfirm( question )
		}
	}

	if( typeof confirm === 'function' ) {
		var nativePrompt = prompt
		window.prompt = function prompt( question , def ) {
			console.warn( 'Prompts causes atom synchronization problems in IE. Use custom dialog instead.' )
			return nativePrompt( question , def )
		}
	}

}()

;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_atom_status;
    (function ($mol_atom_status) {
        $mol_atom_status[$mol_atom_status["obsolete"] = 'obsolete'] = "obsolete";
        $mol_atom_status[$mol_atom_status["checking"] = 'checking'] = "checking";
        $mol_atom_status[$mol_atom_status["pulling"] = 'pulling'] = "pulling";
        $mol_atom_status[$mol_atom_status["actual"] = 'actual'] = "actual";
    })($mol_atom_status = $.$mol_atom_status || ($.$mol_atom_status = {}));
    var $mol_atom = (function (_super) {
        __extends($mol_atom, _super);
        function $mol_atom(host, handler, field) {
            if (handler === void 0) { handler = function () { return null; }; }
            if (field === void 0) { field = ''; }
            var _this = _super.call(this) || this;
            _this.masters = null;
            _this.slaves = null;
            _this.status = $mol_atom_status.obsolete;
            _this.autoFresh = true;
            _this.handler = handler;
            _this.host = Object(host);
            _this.field = field;
            return _this;
        }
        $mol_atom.prototype.destroyed = function (next) {
            if (next) {
                this.unlink();
                var host = this.host;
                var value = host[this.field];
                if (value instanceof $.$mol_object) {
                    if ((value.object_owner() === host) && (value.object_field() === this.field)) {
                        value.destroyed(true);
                    }
                }
                host[this.field] = void null;
                host[this.field + '@'] = void null;
                this.status = $mol_atom_status.obsolete;
            }
            return _super.prototype.destroyed.call(this, next);
        };
        $mol_atom.prototype.unlink = function () {
            this.disobey_all();
            this.check_slaves();
        };
        $mol_atom.prototype.toString = function () {
            return this.host + "." + this.field + "@";
        };
        $mol_atom.prototype.get = function (force) {
            if (this.status === $mol_atom_status.pulling) {
                throw new Error("Cyclic atom dependency of " + this);
            }
            this.actualize(force);
            var slave = $mol_atom.stack[0];
            if (slave)
                this.lead(slave);
            if (slave)
                slave.obey(this);
            var value = this.host[this.field];
            if (value instanceof Error) {
                if (typeof Proxy !== 'function')
                    throw value;
            }
            return value;
        };
        $mol_atom.prototype.actualize = function (force) {
            var _this = this;
            if (!force && this.status === $mol_atom_status.actual)
                return;
            var slave = $mol_atom.stack[0];
            $mol_atom.stack[0] = this;
            if (!force && this.status === $mol_atom_status.checking) {
                this.masters.forEach(function (master) {
                    if (_this.status !== $mol_atom_status.checking)
                        return;
                    master.actualize();
                });
                if (this.status === $mol_atom_status.checking) {
                    this.status = $mol_atom_status.actual;
                }
            }
            if (force || this.status !== $mol_atom_status.actual) {
                var oldMasters = this.masters;
                this.masters = null;
                if (oldMasters)
                    oldMasters.forEach(function (master) {
                        master.dislead(_this);
                    });
                this.status = $mol_atom_status.pulling;
                var next = this.pull(force);
                this.push(next);
            }
            $mol_atom.stack[0] = slave;
        };
        $mol_atom.prototype.pull = function (force) {
            try {
                return this.handler(this._next, force);
            }
            catch (error) {
                if (error['$mol_atom_catched'])
                    return error;
                if (error instanceof $mol_atom_wait)
                    return error;
                console.error(error.stack || error);
                if (!(error instanceof Error)) {
                    error = new Error(error.stack || error);
                }
                error['$mol_atom_catched'] = true;
                return error;
            }
        };
        $mol_atom.prototype.set = function (next) {
            var next_normal = this.normalize(next, this._next);
            if (next_normal === this._next)
                return this.get();
            if (next_normal === this.host[this.field])
                return this.get();
            this._next = next_normal;
            this.obsolete();
            return this.get();
        };
        $mol_atom.prototype.normalize = function (next, prev) {
            if (next === prev)
                return next;
            if ((next instanceof Array) && (prev instanceof Array) && (next.length === prev.length)) {
                for (var i = 0; i < next.length; ++i) {
                    if (next[i] !== prev[i])
                        return next;
                }
                return prev;
            }
            return next;
        };
        $mol_atom.prototype.push = function (next_raw) {
            this._next = void null;
            this.status = $mol_atom_status.actual;
            var host = this.host;
            var prev = host[this.field];
            if (next_raw === void null)
                return prev;
            var next = (next_raw instanceof Error) ? next_raw : this.normalize(next_raw, prev);
            if (next === prev)
                return prev;
            if (next instanceof $.$mol_object) {
                next.object_field(this.field);
                next.object_owner(host);
            }
            if ((typeof Proxy === 'function') && (next instanceof Error)) {
                next = new Proxy(next, {
                    get: function (target) {
                        throw target.valueOf();
                    },
                    ownKeys: function (target) {
                        throw target.valueOf();
                    },
                });
            }
            host[this.field] = next;
            this.log(['push', next, prev]);
            this.obsolete_slaves();
            return next;
        };
        $mol_atom.prototype.obsolete_slaves = function () {
            if (!this.slaves)
                return;
            this.slaves.forEach(function (slave) { return slave.obsolete(); });
        };
        $mol_atom.prototype.check_slaves = function () {
            if (this.slaves) {
                this.slaves.forEach(function (slave) { return slave.check(); });
            }
            else {
                if (this.autoFresh)
                    $mol_atom.actualize(this);
            }
        };
        $mol_atom.prototype.check = function () {
            if (this.status === $mol_atom_status.actual) {
                this.status = $mol_atom_status.checking;
                this.check_slaves();
            }
        };
        $mol_atom.prototype.obsolete = function () {
            if (this.status === $mol_atom_status.obsolete)
                return;
            this.log(['obsolete']);
            this.status = $mol_atom_status.obsolete;
            this.check_slaves();
            return void null;
        };
        $mol_atom.prototype.lead = function (slave) {
            if (!this.slaves) {
                this.slaves = new $.$mol_set();
                $mol_atom.unreap(this);
            }
            this.slaves.add(slave);
        };
        $mol_atom.prototype.dislead = function (slave) {
            if (!this.slaves)
                return;
            if (this.slaves.size === 1) {
                this.slaves = null;
                $mol_atom.reap(this);
            }
            else {
                this.slaves.delete(slave);
            }
        };
        $mol_atom.prototype.obey = function (master) {
            if (!this.masters)
                this.masters = new $.$mol_set();
            this.masters.add(master);
        };
        $mol_atom.prototype.disobey = function (master) {
            if (!this.masters)
                return;
            this.masters.delete(master);
        };
        $mol_atom.prototype.disobey_all = function () {
            var _this = this;
            if (!this.masters)
                return;
            this.masters.forEach(function (master) { return master.dislead(_this); });
            this.masters = null;
        };
        $mol_atom.prototype.value = function (next, force) {
            if (next === void null) {
                return this.get(force);
            }
            else {
                if (force) {
                    return this.push(next);
                }
                else {
                    return this.set(next);
                }
            }
        };
        $mol_atom.actualize = function (atom) {
            $mol_atom.updating.push(atom);
            $mol_atom.schedule();
        };
        $mol_atom.reap = function (atom) {
            $mol_atom.reaping.add(atom);
            $mol_atom.schedule();
        };
        $mol_atom.unreap = function (atom) {
            $mol_atom.reaping.delete(atom);
        };
        $mol_atom.schedule = function () {
            var _this = this;
            if (this.scheduled)
                return;
            new $.$mol_defer(function () {
                if (!_this.scheduled)
                    return;
                _this.scheduled = false;
                _this.sync();
            });
            this.scheduled = true;
        };
        $mol_atom.sync = function () {
            var _this = this;
            $.$mol_log('$mol_atom.sync', []);
            this.schedule();
            while (this.updating.length) {
                var atom = this.updating.shift();
                if (this.reaping.has(atom))
                    continue;
                if (!atom.destroyed())
                    atom.get();
            }
            while (this.reaping.size) {
                this.reaping.forEach(function (atom) {
                    _this.reaping.delete(atom);
                    if (!atom.slaves)
                        atom.destroyed(true);
                });
            }
            this.scheduled = false;
        };
        $mol_atom.prototype.then = function (done, fail) {
            var _this = this;
            var prev;
            var next;
            var atom = new $mol_atom(this, function () {
                try {
                    if (prev == undefined) {
                        var val = _this.get();
                        if (val instanceof $mol_atom_wait)
                            return val;
                        if (val)
                            val.valueOf();
                        prev = val;
                    }
                    if (next == undefined) {
                        var val = done(prev);
                        if (val instanceof $mol_atom_wait)
                            return val;
                        if (val)
                            val.valueOf();
                        next = val;
                    }
                    return next;
                }
                catch (error) {
                    if (error instanceof $mol_atom_wait)
                        return error;
                    if (fail)
                        return fail(error);
                    return error;
                }
            });
            $mol_atom.actualize(atom);
            return atom;
        };
        $mol_atom.prototype.catch = function (fail) {
            return this.then(function (next) { return next; }, fail);
        };
        return $mol_atom;
    }($.$mol_object));
    $mol_atom.stack = [null];
    $mol_atom.updating = [];
    $mol_atom.reaping = new $.$mol_set();
    $mol_atom.scheduled = false;
    $.$mol_atom = $mol_atom;
    $.$mol_state_stack.set('$mol_atom.stack', $mol_atom.stack);
    var $mol_atom_wait = (function (_super) {
        __extends($mol_atom_wait, _super);
        function $mol_atom_wait(message) {
            if (message === void 0) { message = 'Wait...'; }
            var _this = _super.call(this, message) || this;
            _this.message = message;
            _this.name = '$mol_atom_wait';
            var error = new Error(message);
            error.name = _this.name;
            error['__proto__'] = $mol_atom_wait.prototype;
            return error;
        }
        return $mol_atom_wait;
    }(Error));
    $.$mol_atom_wait = $mol_atom_wait;
    var $mol_atom_force = (function (_super) {
        __extends($mol_atom_force, _super);
        function $mol_atom_force() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return $mol_atom_force;
    }(Object));
    $.$mol_atom_force = $mol_atom_force;
})($ || ($ = {}));
//atom.js.map
;
var $;
(function ($) {
    function $mol_mem(config) {
        return function (obj, name, descr) {
            var value = descr.value;
            descr.value = function (next, force) {
                var host = this;
                var field = name + "()";
                var fieldA = field + '@';
                var atom = host[fieldA];
                if (!atom) {
                    if (force && (next === void null))
                        return next;
                    host[fieldA] = atom = new $.$mol_atom(host, value.bind(host), field);
                    if (config)
                        atom.autoFresh = !config.lazy;
                }
                return atom.value(next, force);
            };
            void (descr.value['value'] = value);
        };
    }
    $.$mol_mem = $mol_mem;
    function $mol_mem_key(config) {
        return function (obj, name, descr) {
            var value = descr.value;
            descr.value = function (key, next, force) {
                var host = this;
                var field = name + "(" + JSON.stringify(key) + ")";
                var fieldA = field + '@';
                var atom = host[fieldA];
                if (!atom) {
                    if (force && (next === void null))
                        return next;
                    host[fieldA] = atom = new $.$mol_atom(host, value.bind(host, key), field);
                    if (config)
                        atom.autoFresh = !config.lazy;
                }
                return atom.value(next, force);
            };
            void (descr.value['value'] = value);
        };
    }
    $.$mol_mem_key = $mol_mem_key;
})($ || ($ = {}));
//mem.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_window = (function (_super) {
        __extends($mol_window, _super);
        function $mol_window() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_window.size = function (next) {
            return next || {
                width: window.innerWidth,
                height: window.innerHeight,
            };
        };
        return $mol_window;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_window, "size", null);
    $.$mol_window = $mol_window;
    window.addEventListener('resize', function () {
        $mol_window.size(null);
    });
})($ || ($ = {}));
//window.web.js.map
;
var $;
(function ($) {
})($ || ($ = {}));
//context.js.map
;
var $;
(function ($) {
    $.$mol_dom_context = window;
})($ || ($ = {}));
//context.web.js.map
;
var $;
(function ($) {
    function $mol_dom_render(el, config) {
        var document = el.ownerDocument;
        var _loop_1 = function (key) {
            switch (key) {
                case 'localName': break;
                case 'namespaceURI': break;
                case 'childNodes': {
                    if (!config.childNodes)
                        break;
                    $mol_dom_render_childNodes(el, config.childNodes);
                    break;
                }
                case 'attributes': {
                    if (!config.attributes)
                        break;
                    $mol_dom_render_attributes(el, config.attributes);
                    break;
                }
                case 'style': {
                    if (!config.style)
                        break;
                    $mol_dom_render_style(el, config.style);
                    break;
                }
                case 'events': {
                    $mol_dom_render_event(el, config.events);
                    break;
                }
                case 'events_async': {
                    $mol_dom_render_event_async(el, config.events_async);
                    break;
                }
                default: {
                    if (config[key] === void null)
                        return "continue";
                    if (el[key] !== config[key]) {
                        el[key] = config[key];
                        if (el[key] !== config[key]) {
                            var setter_1 = function () {
                                el.removeEventListener('DOMNodeInsertedIntoDocument', setter_1, { passive: true });
                                new $.$mol_defer(function () {
                                    el[key] = config[key];
                                });
                            };
                            el.addEventListener('DOMNodeInsertedIntoDocument', setter_1, { passive: true });
                        }
                    }
                }
            }
        };
        for (var key in config) {
            _loop_1(key);
        }
        return el;
    }
    $.$mol_dom_render = $mol_dom_render;
    function $mol_dom_render_childNodes(el, childNodes) {
        var nodes = [];
        for (var i = 0; i < childNodes.length; ++i) {
            var node = childNodes[i];
            if (node == null)
                continue;
            if (Object(node) === node) {
                if (node['render'])
                    node = node['render']();
                nodes.push(node);
            }
            else {
                nodes.push(String(node));
            }
        }
        var nextNode = el.firstChild;
        for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
            var view_ = nodes_1[_i];
            var view = view_.valueOf();
            if (view instanceof $.$mol_dom_context.Node) {
                while (true) {
                    if (!nextNode) {
                        el.appendChild(view);
                        break;
                    }
                    if (nextNode == view) {
                        nextNode = nextNode.nextSibling;
                        break;
                    }
                    else {
                        if (nodes.indexOf(nextNode) === -1) {
                            var nn = nextNode.nextSibling;
                            el.removeChild(nextNode);
                            nextNode = nn;
                        }
                        else {
                            el.insertBefore(view, nextNode);
                            break;
                        }
                    }
                }
            }
            else {
                if (nextNode && nextNode.nodeName === '#text') {
                    nextNode.nodeValue = String(view);
                    nextNode = nextNode.nextSibling;
                }
                else {
                    var textNode = $.$mol_dom_context.document.createTextNode(String(view));
                    el.insertBefore(textNode, nextNode);
                }
            }
        }
        while (nextNode) {
            var currNode = nextNode;
            nextNode = currNode.nextSibling;
            el.removeChild(currNode);
        }
    }
    $.$mol_dom_render_childNodes = $mol_dom_render_childNodes;
    function $mol_dom_render_attributes(el, attrs) {
        for (var name_1 in attrs) {
            var val = attrs[name_1];
            if (el.getAttribute(name_1) === val)
                continue;
            if (val === null || val === false)
                el.removeAttribute(name_1);
            else
                el.setAttribute(name_1, String(val));
        }
    }
    $.$mol_dom_render_attributes = $mol_dom_render_attributes;
    function $mol_dom_render_style(el, styles) {
        for (var name_2 in styles) {
            var val = styles[name_2];
            var style = el.style;
            var cur = style[name_2];
            if (typeof val === 'number') {
                if (parseFloat(cur) == val)
                    continue;
                style[name_2] = val + "px";
            }
            if (cur !== val)
                style[name_2] = val;
        }
    }
    $.$mol_dom_render_style = $mol_dom_render_style;
    function $mol_dom_render_event(el, events) {
        for (var name_3 in events) {
            el.addEventListener(name_3, events[name_3]);
        }
    }
    $.$mol_dom_render_event = $mol_dom_render_event;
    function $mol_dom_render_event_async(el, events) {
        for (var name_4 in events) {
            el.addEventListener(name_4, events[name_4], { passive: true });
        }
    }
    $.$mol_dom_render_event_async = $mol_dom_render_event_async;
})($ || ($ = {}));
//render.js.map
;
var $;
(function ($) {
    function $mol_dom_make(config) {
        var document = $.$mol_dom_context.document;
        var el = config.id && document.getElementById(config.id);
        if (!el) {
            var name_1 = config.localName || 'span';
            var space = config.namespaceURI || 'http://www.w3.org/1999/xhtml';
            el = document.createElementNS(space, name_1);
        }
        return $.$mol_dom_render(el, config);
    }
    $.$mol_dom_make = $mol_dom_make;
})($ || ($ = {}));
//make.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_view_dom = (function (_super) {
        __extends($mol_view_dom, _super);
        function $mol_view_dom() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_view_dom.node = function (view) {
            var node = $mol_view_dom.nodes.get(view);
            if (!node) {
                node = $.$mol_dom_make({
                    localName: view.dom_name(),
                    namespaceURI: view.dom_name_space(),
                });
                $mol_view_dom.mount(view, node);
            }
            return node;
        };
        $mol_view_dom.mount = function (view, node) {
            if ($mol_view_dom.nodes.get(view) === node)
                return node;
            $mol_view_dom.nodes.set(view, node);
            $.$mol_dom_render(node, {
                id: view.toString(),
                attributes: view.attr_static(),
                events: view.event(),
                events_async: view.event_async(),
            });
            return node;
        };
        return $mol_view_dom;
    }($.$mol_object));
    $mol_view_dom.nodes = new (WeakMap || $.$mol_dict)();
    $.$mol_view_dom = $mol_view_dom;
})($ || ($ = {}));
//dom.js.map
;
var $;
(function ($) {
    function $mol_deprecated(message) {
        return function (host, field, descr) {
            var value = descr.value;
            descr.value = function $mol_deprecated_wrapper() {
                console.warn(host.constructor + "::" + field + " is deprecated. " + message);
                return value.apply(host, arguments);
            };
        };
    }
    $.$mol_deprecated = $mol_deprecated;
})($ || ($ = {}));
//deprecated.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol_1) {
        var $mol;
    })($mol = $.$mol || ($.$mol = {}));
    function $mol_view_visible_width() {
        return $.$mol_window.size().width;
    }
    $.$mol_view_visible_width = $mol_view_visible_width;
    function $mol_view_visible_height() {
        return $.$mol_window.size().height;
    }
    $.$mol_view_visible_height = $mol_view_visible_height;
    function $mol_view_state_key(suffix) {
        return suffix;
    }
    $.$mol_view_state_key = $mol_view_state_key;
    var $mol_view = (function (_super) {
        __extends($mol_view, _super);
        function $mol_view() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_view.Root = function (id) {
            return new this;
        };
        $mol_view.prototype.title = function () {
            return this.Class().toString();
        };
        $mol_view.prototype.focused = function (next) {
            var node = $.$mol_view_dom.node(this);
            var value = $.$mol_view_selection.focused(next === void 0 ? void 0 : [node]);
            return value.indexOf(node) !== -1;
        };
        $mol_view.prototype.context = function (next) {
            return next || $;
        };
        Object.defineProperty($mol_view.prototype, "$", {
            get: function () {
                return this.context();
            },
            set: function (next) {
                this.context(next);
            },
            enumerable: true,
            configurable: true
        });
        $mol_view.prototype.context_sub = function () {
            return this.context();
        };
        $mol_view.prototype.state_key = function (suffix) {
            if (suffix === void 0) { suffix = ''; }
            return this.$.$mol_view_state_key(suffix);
        };
        $mol_view.prototype.dom_name = function () {
            return this.constructor.toString().replace('$', '');
        };
        $mol_view.prototype.dom_name_space = function () { return 'http://www.w3.org/1999/xhtml'; };
        $mol_view.prototype.sub = function () {
            return null;
        };
        $mol_view.prototype.sub_visible = function () {
            var sub = this.sub();
            if (!sub)
                return sub;
            var context = this.context_sub();
            sub.forEach(function (child) {
                if (child instanceof $mol_view) {
                    child.context(context);
                }
            });
            return sub;
        };
        $mol_view.prototype.minimal_width = function () {
            var sub = this.sub();
            if (!sub)
                return 0;
            var min = 0;
            sub.forEach(function (view) {
                if (view instanceof $mol_view) {
                    min = Math.max(min, view.minimal_width());
                }
            });
            return min;
        };
        $mol_view.prototype.minimal_height = function () {
            var sub = this.sub();
            if (!sub)
                return 0;
            var min = 0;
            sub.forEach(function (view) {
                if (view instanceof $mol_view) {
                    min = Math.max(min, view.minimal_height());
                }
            });
            return min;
        };
        $mol_view.prototype.view_classes = function () {
            var proto = Object.getPrototypeOf(this);
            if (this['view_classes()'])
                return this['view_classes()'];
            var current = proto;
            var classes = [];
            while (current) {
                classes.push(current.constructor);
                if (!(current instanceof $mol_view))
                    break;
                current = Object.getPrototypeOf(current);
            }
            return this['view_classes()'] = classes;
        };
        $mol_view.prototype.dom_node = function () {
            return $.$mol_view_dom.node(this);
        };
        $mol_view.prototype.dom_tree = function () {
            return this.render();
        };
        $mol_view.prototype.render = function () {
            var node = this.dom_node();
            try {
                for (var _i = 0, _a = this.plugins(); _i < _a.length; _i++) {
                    var plugin = _a[_i];
                    if (typeof plugin['render'] === 'function')
                        plugin.render();
                }
                $.$mol_dom_render(node, __assign({ attributes: this.attr(), childNodes: this.sub_visible(), style: this.style() }, (this.field() || {})));
            }
            catch (error) {
                $.$mol_dom_render(node, {
                    attributes: { mol_view_error: error.name },
                });
                if (error instanceof $.$mol_atom_wait)
                    return node;
                if (error['$mol_atom_catched'])
                    return node;
                console.error(error);
                error['$mol_atom_catched'] = true;
            }
            return node;
        };
        $mol_view.prototype.attr_static = function () {
            var attrs = { 'mol_view_error': false };
            var owner = this.object_owner();
            if (owner instanceof $mol_view) {
                var suffix_1 = this.object_field().replace(/\(.*/, '');
                var suffix2_1 = '_' + suffix_1[0].toLowerCase() + suffix_1.substring(1);
                owner.view_classes().forEach(function (Class) {
                    if (suffix_1 in Class.prototype) {
                        var attrName = Class.toString().replace(/\$/g, '') + suffix2_1;
                        attrs[attrName] = '';
                    }
                });
            }
            this.view_classes().forEach(function (Class) {
                attrs[Class.toString().replace(/\$/g, '').toLowerCase()] = '';
            });
            return attrs;
        };
        $mol_view.prototype.attr = function () {
            return {
                'mol_view_error': false,
            };
        };
        $mol_view.prototype.style = function () {
            return {};
        };
        $mol_view.prototype.field = function () {
            return {};
        };
        $mol_view.prototype.event = function () {
            return {};
        };
        $mol_view.prototype.event_async = function () {
            return {};
        };
        $mol_view.prototype.locale_contexts = function () {
            return this['locale_contexts()'] || (this['locale_contexts()'] = this.view_classes().map(String));
        };
        $mol_view.prototype.plugins = function () {
            return [];
        };
        return $mol_view;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_view.prototype, "focused", null);
    __decorate([
        $.$mol_mem()
    ], $mol_view.prototype, "context", null);
    __decorate([
        $.$mol_mem()
    ], $mol_view.prototype, "minimal_width", null);
    __decorate([
        $.$mol_mem()
    ], $mol_view.prototype, "minimal_height", null);
    __decorate([
        $.$mol_deprecated('Use $mol_view::render instead.')
    ], $mol_view.prototype, "dom_tree", null);
    __decorate([
        $.$mol_mem()
    ], $mol_view.prototype, "render", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_view, "Root", null);
    $.$mol_view = $mol_view;
})($ || ($ = {}));
//view.js.map
;
var $;
(function ($) {
    $.$mol_dom_context.document.addEventListener(window.cordova ? 'deviceready' : 'DOMContentLoaded', function (event) {
        var nodes = $.$mol_dom_context.document.querySelectorAll('[mol_view_root]');
        var _loop_1 = function (i) {
            var name_1 = nodes.item(i).getAttribute('mol_view_root');
            var View = $[name_1];
            if (!View) {
                console.error("Can not attach view. Class not found: " + name_1);
                return "continue";
            }
            var view = View.Root(i);
            $.$mol_view_dom.mount(view, nodes.item(i));
            var win = new $.$mol_atom("$mol_view.Root(" + i + ")", function () {
                view.render();
                $.$mol_dom_context.document.title = view.title();
                return null;
            });
            new $.$mol_defer(function () { return win.get(); });
        };
        for (var i = nodes.length - 1; i >= 0; --i) {
            _loop_1(i);
        }
        $.$mol_defer.run();
    });
})($ || ($ = {}));
//view.web.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_view_selection = (function (_super) {
        __extends($mol_view_selection, _super);
        function $mol_view_selection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_view_selection.focused = function (next, force) {
            if (next === void 0)
                return [];
            if (next.length !== 1)
                throw new Error('Length must be equals 1');
            var node = next[0];
            node.focus();
        };
        $mol_view_selection.position = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i] = arguments[_i];
            }
            if (diff.length) {
                if (!diff[0])
                    return diff[0];
                var start = diff[0].start;
                var end = diff[0].end;
                if (!(start <= end))
                    throw new Error("Wrong offsets (" + start + "," + end + ")");
                var root = $.$mol_dom_context.document.getElementById(diff[0].id);
                root.focus();
                var range = new Range;
                var cur = root.firstChild;
                while (cur !== root) {
                    while (cur.firstChild)
                        cur = cur.firstChild;
                    if (cur.nodeValue) {
                        var length = cur.nodeValue.length;
                        if (length >= start)
                            break;
                        start -= length;
                    }
                    while (!cur.nextSibling) {
                        cur = cur.parentNode;
                        if (cur === root) {
                            start = root.childNodes.length;
                            break;
                        }
                    }
                }
                range.setStart(cur, start);
                var cur = root.firstChild;
                while (cur !== root) {
                    while (cur.firstChild)
                        cur = cur.firstChild;
                    if (cur.nodeValue) {
                        var length = cur.nodeValue.length;
                        if (length >= end)
                            break;
                        end -= length;
                    }
                    while (!cur.nextSibling) {
                        cur = cur.parentNode;
                        if (cur === root) {
                            end = root.childNodes.length;
                            break;
                        }
                    }
                }
                range.setEnd(cur, end);
                var sel = $.$mol_dom_context.document.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
                return diff[0];
            }
            else {
                var sel = $.$mol_dom_context.document.getSelection();
                if (sel.rangeCount === 0)
                    return null;
                var range = sel.getRangeAt(0);
                var el = range.commonAncestorContainer;
                while (el && !el.id)
                    el = el.parentElement;
                if (!el)
                    return { id: null, start: 0, end: 0 };
                var meter = new Range;
                meter.selectNodeContents(el);
                meter.setEnd(range.startContainer, range.startOffset);
                var startOffset = meter.toString().length;
                meter.setEnd(range.endContainer, range.endOffset);
                var endOffset = meter.toString().length;
                return { id: el.id, start: startOffset, end: endOffset };
            }
        };
        $mol_view_selection.onFocus = function (event) {
            var parents = [];
            var element = event.target;
            while (element) {
                parents.push(element);
                element = element.parentElement;
            }
            $mol_view_selection.focused(parents, $.$mol_atom_force);
        };
        $mol_view_selection.onBlur = function (event) {
            $mol_view_selection.focused([], $.$mol_atom_force);
        };
        return $mol_view_selection;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_view_selection, "focused", null);
    __decorate([
        $.$mol_mem()
    ], $mol_view_selection, "position", null);
    $.$mol_view_selection = $mol_view_selection;
})($ || ($ = {}));
//selection.js.map
;
var $;
(function ($) {
    $.$mol_dom_context.document.addEventListener('selectionchange', function (event) {
        $.$mol_view_selection.position(void null, $.$mol_atom_force);
    });
    $.$mol_dom_context.document.addEventListener('focus', function (event) { return setTimeout(function () { return $.$mol_view_selection.onFocus(event); }); }, true);
    $.$mol_dom_context.document.addEventListener('blur', function (event) { return setTimeout(function () { return $.$mol_view_selection.onBlur(event); }); }, true);
})($ || ($ = {}));
//selection.web.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_state_session = (function (_super) {
        __extends($mol_state_session, _super);
        function $mol_state_session() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_state_session.value = function (key, next) {
            if (next === void 0)
                return JSON.parse(sessionStorage.getItem(key) || 'null');
            if (next === null)
                sessionStorage.removeItem(key);
            else
                sessionStorage.setItem(key, JSON.stringify(next));
            return next;
        };
        $mol_state_session.prototype.prefix = function () { return ''; };
        $mol_state_session.prototype.value = function (key, next) {
            return $mol_state_session.value(this.prefix() + '.' + key, next);
        };
        return $mol_state_session;
    }($.$mol_object));
    __decorate([
        $.$mol_mem_key()
    ], $mol_state_session, "value", null);
    $.$mol_state_session = $mol_state_session;
})($ || ($ = {}));
//session.web.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_scroll = (function (_super) {
        __extends($mol_scroll, _super);
        function $mol_scroll() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_scroll.prototype.minimal_height = function () {
            return 0;
        };
        $mol_scroll.prototype.scroll_top = function (val, force) {
            return (val !== void 0) ? val : 0;
        };
        $mol_scroll.prototype.scroll_left = function (val, force) {
            return (val !== void 0) ? val : 0;
        };
        $mol_scroll.prototype.scroll_bottom = function (val, force) {
            return (val !== void 0) ? val : 0;
        };
        $mol_scroll.prototype.scroll_right = function (val, force) {
            return (val !== void 0) ? val : 0;
        };
        $mol_scroll.prototype.field = function () {
            return (__assign({}, _super.prototype.field.call(this), { "scrollTop": this.scroll_top(), "scrollLeft": this.scroll_left(), "scrollBottom": this.scroll_bottom(), "scrollRight": this.scroll_right() }));
        };
        $mol_scroll.prototype.event_scroll = function (event, force) {
            return (event !== void 0) ? event : null;
        };
        $mol_scroll.prototype.event_async = function () {
            var _this = this;
            return (__assign({}, _super.prototype.event_async.call(this), { "scroll": function (event) { return _this.event_scroll(event); } }));
        };
        return $mol_scroll;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_scroll.prototype, "scroll_top", null);
    __decorate([
        $.$mol_mem()
    ], $mol_scroll.prototype, "scroll_left", null);
    __decorate([
        $.$mol_mem()
    ], $mol_scroll.prototype, "scroll_bottom", null);
    __decorate([
        $.$mol_mem()
    ], $mol_scroll.prototype, "scroll_right", null);
    __decorate([
        $.$mol_mem()
    ], $mol_scroll.prototype, "event_scroll", null);
    $.$mol_scroll = $mol_scroll;
})($ || ($ = {}));
//scroll.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        function $mol_scroll_top() {
            return 0;
        }
        $mol.$mol_scroll_top = $mol_scroll_top;
        function $mol_scroll_left() {
            return 0;
        }
        $mol.$mol_scroll_left = $mol_scroll_left;
        function $mol_scroll_moving() {
            return false;
        }
        $mol.$mol_scroll_moving = $mol_scroll_moving;
        var $mol_scroll = (function (_super) {
            __extends($mol_scroll, _super);
            function $mol_scroll() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._moving_task_frame = 0;
                return _this;
            }
            $mol_scroll.prototype.scroll_top = function (next) {
                return $.$mol_state_session.value(this + ".scroll_top()", next) || 0;
            };
            $mol_scroll.prototype.scroll_left = function (next) {
                return $.$mol_state_session.value(this + ".scroll_left()", next) || 0;
            };
            $mol_scroll.prototype.scroll_bottom = function (next) {
                return next || 0;
            };
            $mol_scroll.prototype.scroll_right = function (next) {
                return next || 0;
            };
            $mol_scroll.prototype.event_scroll = function (next) {
                var _this = this;
                this.moving(true);
                this.moving_task_stop();
                new $.$mol_defer(function () {
                    var el = _this.dom_node();
                    var top = Math.max(0, el.scrollTop);
                    var left = Math.max(0, el.scrollLeft);
                    _this.scroll_top(top);
                    _this.scroll_left(left);
                    _this.scroll_bottom(Math.max(0, el.scrollHeight - top - el.offsetHeight));
                    _this.scroll_right(Math.max(0, el.scrollWidth - left - el.offsetWidth));
                });
            };
            $mol_scroll.prototype.event_repos = function (next) {
                var _this = this;
                new $.$mol_defer(function () {
                    var el = _this.dom_node();
                    _this.scroll_bottom(Math.max(0, el.scrollHeight - _this.scroll_top() - el.offsetHeight));
                    _this.scroll_right(Math.max(0, el.scrollWidth - _this.scroll_left() - el.offsetWidth));
                });
            };
            $mol_scroll.prototype.moving_task_stop = function () {
                var _this = this;
                cancelAnimationFrame(this._moving_task_frame);
                this._moving_task_frame = requestAnimationFrame(function () {
                    _this.moving(false);
                });
            };
            $mol_scroll.prototype.moving = function (next) {
                return next || false;
            };
            $mol_scroll.prototype.context_sub = function () {
                var _this = this;
                var context = this.context();
                var subContext = Object.create(context);
                subContext.$mol_view_visible_height = function () {
                    var sizeWin = $.$mol_window.size();
                    var limit = context.$mol_view_visible_height();
                    return _this.scroll_top() + Math.min(sizeWin.height, limit);
                };
                subContext.$mol_view_visible_width = function () {
                    var sizeWin = $.$mol_window.size();
                    var limit = context.$mol_view_visible_width();
                    return _this.scroll_left() + Math.min(sizeWin.width, limit);
                };
                subContext.$mol_scroll_top = function () { return _this.scroll_top(); };
                subContext.$mol_scroll_left = function () { return _this.scroll_left(); };
                subContext.$mol_scroll_moving = function () { return _this.moving(); };
                return subContext;
            };
            return $mol_scroll;
        }($.$mol_scroll));
        __decorate([
            $.$mol_mem()
        ], $mol_scroll.prototype, "scroll_bottom", null);
        __decorate([
            $.$mol_mem()
        ], $mol_scroll.prototype, "scroll_right", null);
        __decorate([
            $.$mol_mem()
        ], $mol_scroll.prototype, "moving", null);
        __decorate([
            $.$mol_mem()
        ], $mol_scroll.prototype, "context_sub", null);
        $mol.$mol_scroll = $mol_scroll;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//scroll.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_page = (function (_super) {
        __extends($mol_page, _super);
        function $mol_page() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_page.prototype.control = function () {
            return [];
        };
        $mol_page.prototype.Control = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return _this.control(); };
            });
        };
        $mol_page.prototype.Title = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.title()); };
            });
        };
        $mol_page.prototype.tools = function () {
            return [];
        };
        $mol_page.prototype.Tools = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return _this.tools(); };
            });
        };
        $mol_page.prototype.head = function () {
            return [].concat(this.Control(), this.Title(), this.Tools());
        };
        $mol_page.prototype.Head = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return _this.head(); };
            });
        };
        $mol_page.prototype.body_scroll_top = function (val, force) {
            return (val !== void 0) ? val : 0;
        };
        $mol_page.prototype.body = function () {
            return [];
        };
        $mol_page.prototype.Body = function () {
            var _this = this;
            return new $.$mol_scroll().setup(function (obj) {
                obj.scroll_top = function (val) { return _this.body_scroll_top(val); };
                obj.sub = function () { return _this.body(); };
            });
        };
        $mol_page.prototype.foot = function () {
            return [];
        };
        $mol_page.prototype.Foot = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return _this.foot(); };
            });
        };
        $mol_page.prototype.sub = function () {
            return [].concat(this.Head(), this.Body(), this.Foot());
        };
        return $mol_page;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_page.prototype, "Control", null);
    __decorate([
        $.$mol_mem()
    ], $mol_page.prototype, "Title", null);
    __decorate([
        $.$mol_mem()
    ], $mol_page.prototype, "Tools", null);
    __decorate([
        $.$mol_mem()
    ], $mol_page.prototype, "Head", null);
    __decorate([
        $.$mol_mem()
    ], $mol_page.prototype, "body_scroll_top", null);
    __decorate([
        $.$mol_mem()
    ], $mol_page.prototype, "Body", null);
    __decorate([
        $.$mol_mem()
    ], $mol_page.prototype, "Foot", null);
    $.$mol_page = $mol_page;
})($ || ($ = {}));
//page.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_page = (function (_super) {
            __extends($mol_page, _super);
            function $mol_page() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_page.prototype.body_scroll_top = function (next) {
                return $.$mol_state_session.value(this + ".body_scroll_top()", next) || 0;
            };
            $mol_page.prototype.head = function () {
                return [
                    this.control().length > 0 ? this.Control() : null,
                    this.title() ? this.Title() : null,
                    this.tools().length > 0 ? this.Tools() : null,
                ];
            };
            return $mol_page;
        }($.$mol_page));
        $mol.$mol_page = $mol_page;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//page.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var $;
(function ($) {
    var $mol_image = (function (_super) {
        __extends($mol_image, _super);
        function $mol_image() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_image.prototype.dom_name = function () {
            return "img";
        };
        $mol_image.prototype.uri = function () {
            return "";
        };
        $mol_image.prototype.field = function () {
            return (__assign({}, _super.prototype.field.call(this), { "src": this.uri(), "alt": this.title() }));
        };
        return $mol_image;
    }($.$mol_view));
    $.$mol_image = $mol_image;
})($ || ($ = {}));
//image.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var localStorage = localStorage || {
    getItem: function (key) {
        return this[':' + key];
    },
    setItem: function (key, value) {
        this[':' + key] = value;
    },
    removeItem: function (key) {
        this[':' + key] = void 0;
    }
};
var $;
(function ($) {
    var $mol_state_local = (function (_super) {
        __extends($mol_state_local, _super);
        function $mol_state_local() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_state_local.value = function (key, next, force) {
            if (next === void 0)
                return JSON.parse(localStorage.getItem(key) || 'null');
            if (next === null)
                localStorage.removeItem(key);
            else
                localStorage.setItem(key, JSON.stringify(next));
            return next;
        };
        $mol_state_local.prototype.prefix = function () { return ''; };
        $mol_state_local.prototype.value = function (key, next) {
            return $mol_state_local.value(this.prefix() + '.' + key, next);
        };
        return $mol_state_local;
    }($.$mol_object));
    __decorate([
        $.$mol_mem_key()
    ], $mol_state_local, "value", null);
    $.$mol_state_local = $mol_state_local;
})($ || ($ = {}));
//local.js.map
;
var $;
(function ($) {
    window.addEventListener('storage', function (event) {
        $.$mol_state_local.value(event.key, void 0, $.$mol_atom_force);
    });
})($ || ($ = {}));
//local.web.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_http = (function (_super) {
        __extends($mol_http, _super);
        function $mol_http() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_http.resource = function (uri) {
            var normal = new URL(uri, $.$mol_dom_context.document.location.href).toString();
            return this.resource_absolute(normal);
        };
        $mol_http.resource_absolute = function (uri) {
            var next = new $mol_http;
            next.uri = function () { return uri; };
            return next;
        };
        $mol_http.prototype.uri = function () { return ''; };
        $mol_http.prototype.method_get = function () { return 'Get'; };
        $mol_http.prototype.method_put = function () { return 'Put'; };
        $mol_http.prototype.credentials = function () {
            return null;
        };
        $mol_http.prototype.headers = function () {
            return {};
        };
        $mol_http.prototype.request = function () {
            var _this = this;
            if (this['request()'])
                return this['request()'];
            var next = this['request()'] = new $.$mol_dom_context.XMLHttpRequest;
            next.withCredentials = Boolean(this.credentials());
            next.onload = function (event) {
                if ((next.status === 0) || (Math.floor(next.status / 100) === 2)) {
                    _this.response(next, $.$mol_atom_force);
                }
                else {
                    _this.response(new Error(next.responseText), $.$mol_atom_force);
                }
            };
            next.onerror = function (event) {
                _this.response(event.error || new Error('Unknown HTTP error'), $.$mol_atom_force);
            };
            return next;
        };
        $mol_http.prototype.destroyed = function (next) {
            if (next) {
                var native = this['reques()'];
                if (native)
                    native.abort();
            }
            return _super.prototype.destroyed.call(this, next);
        };
        $mol_http.prototype.response = function (next, force) {
            var creds = this.credentials();
            var native = this.request();
            var method = (next === void 0) ? this.method_get() : this.method_put();
            var uri = this.uri();
            native.open(method, uri, true, creds && creds.login, creds && creds.password);
            var headers = this.headers();
            for (var name_1 in headers)
                native.setRequestHeader(name_1, headers[name_1]);
            native.send(next);
            throw new $.$mol_atom_wait(method + " " + uri);
        };
        $mol_http.prototype.text = function (next, force) {
            return this.response(next, force).responseText;
        };
        $mol_http.prototype.json = function (next, force) {
            var next2 = next && JSON.stringify(next, null, '\t');
            return JSON.parse(this.text(next2, force));
        };
        return $mol_http;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_http.prototype, "response", null);
    __decorate([
        $.$mol_mem()
    ], $mol_http.prototype, "json", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_http, "resource_absolute", null);
    $.$mol_http = $mol_http;
})($ || ($ = {}));
//http.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    console.warn('$mol_http_resource* is deprecated. Use $mol_http.resource insted.');
    var $mol_http_resource = (function (_super) {
        __extends($mol_http_resource, _super);
        function $mol_http_resource() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_http_resource.item = function (uri) {
            return $.$mol_http.resource(uri);
        };
        return $mol_http_resource;
    }($.$mol_http));
    $.$mol_http_resource = $mol_http_resource;
    var $mol_http_resource_json = (function () {
        function $mol_http_resource_json() {
        }
        $mol_http_resource_json.item = function (uri) {
            return $.$mol_http.resource(uri);
        };
        return $mol_http_resource_json;
    }());
    $.$mol_http_resource_json = $mol_http_resource_json;
})($ || ($ = {}));
//resource.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_file = (function (_super) {
        __extends($mol_file, _super);
        function $mol_file() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_file.absolute = function (path) {
            var next = new $mol_file();
            next.path = function () { return path; };
            return next;
        };
        $mol_file.relative = function (path) {
            var uri = new URL(path, $.$mol_dom_context.document.location.href);
            return $mol_file.absolute(path);
        };
        $mol_file.prototype.path = function () {
            return '.';
        };
        $mol_file.prototype.parent = function () {
            return this.resolve('..');
        };
        $mol_file.prototype.name = function () {
            return this.path().replace(/^.*\//, '');
        };
        $mol_file.prototype.ext = function () {
            var match = /((?:\.\w+)+)$/.exec(this.path());
            return match && match[1].substring(1);
        };
        $mol_file.prototype.content = function (next, force) {
            return $.$mol_http.resource(this.path()).text(next);
        };
        $mol_file.prototype.resolve = function (path) {
            var res = this.path() + '/' + path;
            while (true) {
                var prev = res;
                res = res.replace(/\/[^\/.]+\/\.\.\//, '/');
                if (prev === res)
                    break;
            }
            return this.Class().absolute(res);
        };
        $mol_file.prototype.relate = function (base) {
            if (base === void 0) { base = this.Class().relative('.'); }
            throw new Error('Not implemented yet');
        };
        return $mol_file;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_file.prototype, "content", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_file, "absolute", null);
    $.$mol_file = $mol_file;
})($ || ($ = {}));
//file.web.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_locale = (function (_super) {
        __extends($mol_locale, _super);
        function $mol_locale() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_locale.lang_default = function () {
            return 'en';
        };
        $mol_locale.lang = function (next) {
            return $.$mol_state_local.value('locale', next) || $.$mol_dom_context.navigator.language.replace(/-.*/, '') || this.lang_default();
        };
        $mol_locale.source = function (lang) {
            return JSON.parse($.$mol_file.relative("-/web.locale=" + lang + ".json").content());
        };
        $mol_locale.texts = function (next) {
            if (next)
                return next;
            var lang = this.lang();
            try {
                return this.source(lang).valueOf();
            }
            catch (error) {
                var def = this.lang_default();
                if (lang === def)
                    throw error;
                return this.source(def);
            }
        };
        $mol_locale.text = function (contexts, key) {
            var texts = this.texts();
            for (var i = 0; i < contexts.length; ++i) {
                var text = texts[contexts[i] + "_" + key];
                if (text)
                    return text;
            }
            console.warn('Locale tet not found: ', contexts, key);
            return "<" + key + ">";
        };
        return $mol_locale;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_locale, "lang_default", null);
    __decorate([
        $.$mol_mem()
    ], $mol_locale, "lang", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_locale, "source", null);
    __decorate([
        $.$mol_mem()
    ], $mol_locale, "texts", null);
    $.$mol_locale = $mol_locale;
})($ || ($ = {}));
//locale.js.map
;
var $;
(function ($) {
    var $mol_keyboard_code;
    (function ($mol_keyboard_code) {
        $mol_keyboard_code[$mol_keyboard_code["backspace"] = 8] = "backspace";
        $mol_keyboard_code[$mol_keyboard_code["tab"] = 9] = "tab";
        $mol_keyboard_code[$mol_keyboard_code["enter"] = 13] = "enter";
        $mol_keyboard_code[$mol_keyboard_code["shift"] = 16] = "shift";
        $mol_keyboard_code[$mol_keyboard_code["ctrl"] = 17] = "ctrl";
        $mol_keyboard_code[$mol_keyboard_code["alt"] = 18] = "alt";
        $mol_keyboard_code[$mol_keyboard_code["pause"] = 19] = "pause";
        $mol_keyboard_code[$mol_keyboard_code["capsLock"] = 20] = "capsLock";
        $mol_keyboard_code[$mol_keyboard_code["escape"] = 27] = "escape";
        $mol_keyboard_code[$mol_keyboard_code["space"] = 32] = "space";
        $mol_keyboard_code[$mol_keyboard_code["pageUp"] = 33] = "pageUp";
        $mol_keyboard_code[$mol_keyboard_code["pageDown"] = 34] = "pageDown";
        $mol_keyboard_code[$mol_keyboard_code["end"] = 35] = "end";
        $mol_keyboard_code[$mol_keyboard_code["home"] = 36] = "home";
        $mol_keyboard_code[$mol_keyboard_code["left"] = 37] = "left";
        $mol_keyboard_code[$mol_keyboard_code["up"] = 38] = "up";
        $mol_keyboard_code[$mol_keyboard_code["right"] = 39] = "right";
        $mol_keyboard_code[$mol_keyboard_code["down"] = 40] = "down";
        $mol_keyboard_code[$mol_keyboard_code["insert"] = 45] = "insert";
        $mol_keyboard_code[$mol_keyboard_code["delete"] = 46] = "delete";
        $mol_keyboard_code[$mol_keyboard_code["key0"] = 48] = "key0";
        $mol_keyboard_code[$mol_keyboard_code["key1"] = 49] = "key1";
        $mol_keyboard_code[$mol_keyboard_code["key2"] = 50] = "key2";
        $mol_keyboard_code[$mol_keyboard_code["key3"] = 51] = "key3";
        $mol_keyboard_code[$mol_keyboard_code["key4"] = 52] = "key4";
        $mol_keyboard_code[$mol_keyboard_code["key5"] = 53] = "key5";
        $mol_keyboard_code[$mol_keyboard_code["key6"] = 54] = "key6";
        $mol_keyboard_code[$mol_keyboard_code["key7"] = 55] = "key7";
        $mol_keyboard_code[$mol_keyboard_code["key8"] = 56] = "key8";
        $mol_keyboard_code[$mol_keyboard_code["key9"] = 57] = "key9";
        $mol_keyboard_code[$mol_keyboard_code["A"] = 65] = "A";
        $mol_keyboard_code[$mol_keyboard_code["B"] = 66] = "B";
        $mol_keyboard_code[$mol_keyboard_code["C"] = 67] = "C";
        $mol_keyboard_code[$mol_keyboard_code["D"] = 68] = "D";
        $mol_keyboard_code[$mol_keyboard_code["E"] = 69] = "E";
        $mol_keyboard_code[$mol_keyboard_code["F"] = 70] = "F";
        $mol_keyboard_code[$mol_keyboard_code["G"] = 71] = "G";
        $mol_keyboard_code[$mol_keyboard_code["H"] = 72] = "H";
        $mol_keyboard_code[$mol_keyboard_code["I"] = 73] = "I";
        $mol_keyboard_code[$mol_keyboard_code["J"] = 74] = "J";
        $mol_keyboard_code[$mol_keyboard_code["K"] = 75] = "K";
        $mol_keyboard_code[$mol_keyboard_code["L"] = 76] = "L";
        $mol_keyboard_code[$mol_keyboard_code["M"] = 77] = "M";
        $mol_keyboard_code[$mol_keyboard_code["N"] = 78] = "N";
        $mol_keyboard_code[$mol_keyboard_code["O"] = 79] = "O";
        $mol_keyboard_code[$mol_keyboard_code["P"] = 80] = "P";
        $mol_keyboard_code[$mol_keyboard_code["Q"] = 81] = "Q";
        $mol_keyboard_code[$mol_keyboard_code["R"] = 82] = "R";
        $mol_keyboard_code[$mol_keyboard_code["S"] = 83] = "S";
        $mol_keyboard_code[$mol_keyboard_code["T"] = 84] = "T";
        $mol_keyboard_code[$mol_keyboard_code["U"] = 85] = "U";
        $mol_keyboard_code[$mol_keyboard_code["V"] = 86] = "V";
        $mol_keyboard_code[$mol_keyboard_code["W"] = 87] = "W";
        $mol_keyboard_code[$mol_keyboard_code["X"] = 88] = "X";
        $mol_keyboard_code[$mol_keyboard_code["Y"] = 89] = "Y";
        $mol_keyboard_code[$mol_keyboard_code["Z"] = 90] = "Z";
        $mol_keyboard_code[$mol_keyboard_code["metaLeft"] = 91] = "metaLeft";
        $mol_keyboard_code[$mol_keyboard_code["metaRight"] = 92] = "metaRight";
        $mol_keyboard_code[$mol_keyboard_code["select"] = 93] = "select";
        $mol_keyboard_code[$mol_keyboard_code["numpad0"] = 96] = "numpad0";
        $mol_keyboard_code[$mol_keyboard_code["numpad1"] = 97] = "numpad1";
        $mol_keyboard_code[$mol_keyboard_code["numpad2"] = 98] = "numpad2";
        $mol_keyboard_code[$mol_keyboard_code["numpad3"] = 99] = "numpad3";
        $mol_keyboard_code[$mol_keyboard_code["numpad4"] = 100] = "numpad4";
        $mol_keyboard_code[$mol_keyboard_code["numpad5"] = 101] = "numpad5";
        $mol_keyboard_code[$mol_keyboard_code["numpad6"] = 102] = "numpad6";
        $mol_keyboard_code[$mol_keyboard_code["numpad7"] = 103] = "numpad7";
        $mol_keyboard_code[$mol_keyboard_code["numpad8"] = 104] = "numpad8";
        $mol_keyboard_code[$mol_keyboard_code["numpad9"] = 105] = "numpad9";
        $mol_keyboard_code[$mol_keyboard_code["multiply"] = 106] = "multiply";
        $mol_keyboard_code[$mol_keyboard_code["add"] = 107] = "add";
        $mol_keyboard_code[$mol_keyboard_code["subtract"] = 109] = "subtract";
        $mol_keyboard_code[$mol_keyboard_code["decimal"] = 110] = "decimal";
        $mol_keyboard_code[$mol_keyboard_code["divide"] = 111] = "divide";
        $mol_keyboard_code[$mol_keyboard_code["F1"] = 112] = "F1";
        $mol_keyboard_code[$mol_keyboard_code["F2"] = 113] = "F2";
        $mol_keyboard_code[$mol_keyboard_code["F3"] = 114] = "F3";
        $mol_keyboard_code[$mol_keyboard_code["F4"] = 115] = "F4";
        $mol_keyboard_code[$mol_keyboard_code["F5"] = 116] = "F5";
        $mol_keyboard_code[$mol_keyboard_code["F6"] = 117] = "F6";
        $mol_keyboard_code[$mol_keyboard_code["F7"] = 118] = "F7";
        $mol_keyboard_code[$mol_keyboard_code["F8"] = 119] = "F8";
        $mol_keyboard_code[$mol_keyboard_code["F9"] = 120] = "F9";
        $mol_keyboard_code[$mol_keyboard_code["F10"] = 121] = "F10";
        $mol_keyboard_code[$mol_keyboard_code["F11"] = 122] = "F11";
        $mol_keyboard_code[$mol_keyboard_code["F12"] = 123] = "F12";
        $mol_keyboard_code[$mol_keyboard_code["numLock"] = 144] = "numLock";
        $mol_keyboard_code[$mol_keyboard_code["scrollLock"] = 145] = "scrollLock";
        $mol_keyboard_code[$mol_keyboard_code["semicolon"] = 186] = "semicolon";
        $mol_keyboard_code[$mol_keyboard_code["equals"] = 187] = "equals";
        $mol_keyboard_code[$mol_keyboard_code["comma"] = 188] = "comma";
        $mol_keyboard_code[$mol_keyboard_code["dash"] = 189] = "dash";
        $mol_keyboard_code[$mol_keyboard_code["period"] = 190] = "period";
        $mol_keyboard_code[$mol_keyboard_code["forwardSlash"] = 191] = "forwardSlash";
        $mol_keyboard_code[$mol_keyboard_code["graveAccent"] = 192] = "graveAccent";
        $mol_keyboard_code[$mol_keyboard_code["bracketOpen"] = 219] = "bracketOpen";
        $mol_keyboard_code[$mol_keyboard_code["slashBack"] = 220] = "slashBack";
        $mol_keyboard_code[$mol_keyboard_code["bracketClose"] = 221] = "bracketClose";
        $mol_keyboard_code[$mol_keyboard_code["quoteSingle"] = 222] = "quoteSingle";
    })($mol_keyboard_code = $.$mol_keyboard_code || ($.$mol_keyboard_code = {}));
})($ || ($ = {}));
//code.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_string = (function (_super) {
        __extends($mol_string, _super);
        function $mol_string() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_string.prototype.dom_name = function () {
            return "input";
        };
        $mol_string.prototype.enabled = function () {
            return true;
        };
        $mol_string.prototype.disabled = function () {
            return false;
        };
        $mol_string.prototype.value = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_string.prototype.value_changed = function (val, force) {
            return this.value(val);
        };
        $mol_string.prototype.hint = function () {
            return "";
        };
        $mol_string.prototype.type = function (val, force) {
            return (val !== void 0) ? val : "text";
        };
        $mol_string.prototype.field = function () {
            return (__assign({}, _super.prototype.field.call(this), { "disabled": this.disabled(), "value": this.value_changed(), "placeholder": this.hint(), "type": this.type() }));
        };
        $mol_string.prototype.event_change = function (event, force) {
            return (event !== void 0) ? event : null;
        };
        $mol_string.prototype.event_key_press = function (event, force) {
            return (event !== void 0) ? event : null;
        };
        $mol_string.prototype.event = function () {
            var _this = this;
            return (__assign({}, _super.prototype.event.call(this), { "input": function (event) { return _this.event_change(event); }, "keypress": function (event) { return _this.event_key_press(event); } }));
        };
        return $mol_string;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_string.prototype, "value", null);
    __decorate([
        $.$mol_mem()
    ], $mol_string.prototype, "value_changed", null);
    __decorate([
        $.$mol_mem()
    ], $mol_string.prototype, "type", null);
    __decorate([
        $.$mol_mem()
    ], $mol_string.prototype, "event_change", null);
    __decorate([
        $.$mol_mem()
    ], $mol_string.prototype, "event_key_press", null);
    $.$mol_string = $mol_string;
})($ || ($ = {}));
//string.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_string = (function (_super) {
            __extends($mol_string, _super);
            function $mol_string() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._timer = 0;
                return _this;
            }
            $mol_string.prototype.event_change = function (next) {
                var _this = this;
                var val = next.target.value.trim();
                clearTimeout(this._timer);
                this._timer = setTimeout(function () { return _this.value(val); }, 200);
            };
            $mol_string.prototype.event_key_press = function (next) {
                if (next.keyCode === $.$mol_keyboard_code.enter) {
                    this.value(next.target.value.trim());
                }
            };
            $mol_string.prototype.disabled = function () {
                return !this.enabled();
            };
            return $mol_string;
        }($.$mol_string));
        $mol.$mol_string = $mol_string;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//string.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var $;
(function ($) {
    var $mol_row = (function (_super) {
        __extends($mol_row, _super);
        function $mol_row() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_row.prototype.style = function () {
            return (__assign({}, _super.prototype.style.call(this), { "minHeight": this.minimal_height() }));
        };
        return $mol_row;
    }($.$mol_view));
    $.$mol_row = $mol_row;
})($ || ($ = {}));
(function ($) {
    var $mol_row_sub = (function (_super) {
        __extends($mol_row_sub, _super);
        function $mol_row_sub() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return $mol_row_sub;
    }($.$mol_view));
    $.$mol_row_sub = $mol_row_sub;
})($ || ($ = {}));
//row.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_row = (function (_super) {
            __extends($mol_row, _super);
            function $mol_row() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_row.prototype.item_offsets_top = function () {
                var next = [];
                var sub = this.sub();
                if (!sub)
                    return next;
                var context = this.context_sub();
                var widthLimit = context.$mol_view_visible_width();
                var allHeight = 0;
                var rowWidth = 0;
                var row_height = 0;
                for (var _i = 0, sub_1 = sub; _i < sub_1.length; _i++) {
                    var child = sub_1[_i];
                    next.push(allHeight);
                    if (!(child instanceof $.$mol_view))
                        continue;
                    var width = child.minimal_width();
                    var height = child.minimal_height();
                    rowWidth += width;
                    if (rowWidth > widthLimit) {
                        allHeight += row_height;
                        rowWidth = width;
                        row_height = height;
                    }
                    else {
                        row_height = Math.max(row_height, height);
                    }
                }
                next.push(allHeight + row_height);
                return next;
            };
            $mol_row.prototype.sub_visible = function () {
                var sub = this.sub();
                var visible = [];
                var context = this.context_sub();
                var heightLimit = context.$mol_view_visible_height();
                var offsets = this.item_offsets_top();
                var height = 0;
                for (var i = 0; i < offsets.length - 1; ++i) {
                    if (offsets[i] > heightLimit)
                        break;
                    var child = sub[i];
                    if (child instanceof $.$mol_view) {
                        child.context(context);
                    }
                    visible.push(child);
                }
                return visible;
            };
            $mol_row.prototype.minimal_height = function () {
                var offsets = this.item_offsets_top();
                return offsets[offsets.length - 1];
            };
            return $mol_row;
        }($.$mol_row));
        __decorate([
            $.$mol_mem()
        ], $mol_row.prototype, "item_offsets_top", null);
        $mol.$mol_row = $mol_row;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//row.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_form = (function (_super) {
        __extends($mol_form, _super);
        function $mol_form() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_form.prototype.submit_blocked = function () {
            return false;
        };
        $mol_form.prototype.form_fields = function () {
            return [];
        };
        $mol_form.prototype.Bar_fields = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return _this.form_fields(); };
            });
        };
        $mol_form.prototype.buttons = function () {
            return [];
        };
        $mol_form.prototype.Bar_buttons = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return _this.buttons(); };
            });
        };
        $mol_form.prototype.sub = function () {
            return [].concat(this.Bar_fields(), this.Bar_buttons());
        };
        return $mol_form;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_form.prototype, "Bar_fields", null);
    __decorate([
        $.$mol_mem()
    ], $mol_form.prototype, "Bar_buttons", null);
    $.$mol_form = $mol_form;
})($ || ($ = {}));
//form.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_form = (function (_super) {
            __extends($mol_form, _super);
            function $mol_form() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_form.prototype.submit_blocked = function () {
                return this.form_fields().some(function (field) { return field.errors().length !== 0; });
            };
            return $mol_form;
        }($.$mol_form));
        __decorate([
            $.$mol_mem()
        ], $mol_form.prototype, "submit_blocked", null);
        $mol.$mol_form = $mol_form;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//form.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_labeler = (function (_super) {
        __extends($mol_labeler, _super);
        function $mol_labeler() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_labeler.prototype.dom_name = function () {
            return "label";
        };
        $mol_labeler.prototype.label = function () {
            return [].concat(this.title());
        };
        $mol_labeler.prototype.Title = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return _this.label(); };
            });
        };
        $mol_labeler.prototype.content = function () {
            return null;
        };
        $mol_labeler.prototype.Content = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.content()); };
            });
        };
        $mol_labeler.prototype.sub = function () {
            return [].concat(this.Title(), this.Content());
        };
        return $mol_labeler;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_labeler.prototype, "Title", null);
    __decorate([
        $.$mol_mem()
    ], $mol_labeler.prototype, "Content", null);
    $.$mol_labeler = $mol_labeler;
})($ || ($ = {}));
//labeler.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_form_field = (function (_super) {
        __extends($mol_form_field, _super);
        function $mol_form_field() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_form_field.prototype.name = function () {
            return "";
        };
        $mol_form_field.prototype.errors = function () {
            return [];
        };
        $mol_form_field.prototype.Bid = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return _this.errors(); };
            });
        };
        $mol_form_field.prototype.label = function () {
            return [].concat(this.name(), this.Bid());
        };
        $mol_form_field.prototype.control = function () {
            return null;
        };
        $mol_form_field.prototype.Content = function () {
            return this.control();
        };
        return $mol_form_field;
    }($.$mol_labeler));
    __decorate([
        $.$mol_mem()
    ], $mol_form_field.prototype, "Bid", null);
    $.$mol_form_field = $mol_form_field;
})($ || ($ = {}));
//field.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_button = (function (_super) {
        __extends($mol_button, _super);
        function $mol_button() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_button.prototype.enabled = function () {
            return true;
        };
        $mol_button.prototype.event_click = function (event, force) {
            return (event !== void 0) ? event : null;
        };
        $mol_button.prototype.event_activate = function (event, force) {
            return this.event_click(event);
        };
        $mol_button.prototype.event_key_press = function (event, force) {
            return (event !== void 0) ? event : null;
        };
        $mol_button.prototype.event = function () {
            var _this = this;
            return (__assign({}, _super.prototype.event.call(this), { "click": function (event) { return _this.event_activate(event); }, "keypress": function (event) { return _this.event_key_press(event); } }));
        };
        $mol_button.prototype.disabled = function () {
            return false;
        };
        $mol_button.prototype.tab_index = function () {
            return "0";
        };
        $mol_button.prototype.hint = function () {
            return "";
        };
        $mol_button.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "disabled": this.disabled(), "role": "button", "tabindex": this.tab_index(), "title": this.hint() }));
        };
        $mol_button.prototype.sub = function () {
            return [].concat(this.title());
        };
        return $mol_button;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_button.prototype, "event_click", null);
    __decorate([
        $.$mol_mem()
    ], $mol_button.prototype, "event_activate", null);
    __decorate([
        $.$mol_mem()
    ], $mol_button.prototype, "event_key_press", null);
    $.$mol_button = $mol_button;
})($ || ($ = {}));
//button.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_button = (function (_super) {
            __extends($mol_button, _super);
            function $mol_button() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_button.prototype.disabled = function () {
                return !this.enabled();
            };
            $mol_button.prototype.event_activate = function (next) {
                if (!this.enabled())
                    return;
                this.event_click(next);
            };
            $mol_button.prototype.event_key_press = function (event) {
                if (event.keyCode === $.$mol_keyboard_code.enter) {
                    return this.event_activate(event);
                }
            };
            $mol_button.prototype.tab_index = function () {
                return this.enabled() ? _super.prototype.tab_index.call(this) : null;
            };
            return $mol_button;
        }($.$mol_button));
        $mol.$mol_button = $mol_button;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//button.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_button_major = (function (_super) {
        __extends($mol_button_major, _super);
        function $mol_button_major() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return $mol_button_major;
    }($.$mol_button));
    $.$mol_button_major = $mol_button_major;
})($ || ($ = {}));
(function ($) {
    var $mol_button_minor = (function (_super) {
        __extends($mol_button_minor, _super);
        function $mol_button_minor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return $mol_button_minor;
    }($.$mol_button));
    $.$mol_button_minor = $mol_button_minor;
})($ || ($ = {}));
(function ($) {
    var $mol_button_danger = (function (_super) {
        __extends($mol_button_danger, _super);
        function $mol_button_danger() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return $mol_button_danger;
    }($.$mol_button));
    $.$mol_button_danger = $mol_button_danger;
})($ || ($ = {}));
//button_types.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $saprun_stuff = (function (_super) {
        __extends($saprun_stuff, _super);
        function $saprun_stuff() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $saprun_stuff.prototype.Body_singup = function () {
            return new $.$saprun_stuff_form_box();
        };
        $saprun_stuff.prototype.body = function () {
            return [].concat(this.Body_singup());
        };
        return $saprun_stuff;
    }($.$mol_page));
    __decorate([
        $.$mol_mem()
    ], $saprun_stuff.prototype, "Body_singup", null);
    $.$saprun_stuff = $saprun_stuff;
})($ || ($ = {}));
(function ($) {
    var $saprun_stuff_form_box = (function (_super) {
        __extends($saprun_stuff_form_box, _super);
        function $saprun_stuff_form_box() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $saprun_stuff_form_box.prototype.Logo_main = function () {
            return new $.$mol_image().setup(function (obj) {
                obj.uri = function () { return "-/saprun/stuff/thumbs/logo_main.png"; };
            });
        };
        $saprun_stuff_form_box.prototype.table_id_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "table_id_label");
        };
        $saprun_stuff_form_box.prototype.table_id_errors = function () {
            return [];
        };
        $saprun_stuff_form_box.prototype.table_id_hint = function () {
            return "231456";
        };
        $saprun_stuff_form_box.prototype.table_id = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $saprun_stuff_form_box.prototype.Table_id_control = function () {
            var _this = this;
            return new $.$mol_string().setup(function (obj) {
                obj.hint = function () { return _this.table_id_hint(); };
                obj.value = function (val) { return _this.table_id(val); };
            });
        };
        $saprun_stuff_form_box.prototype.Table_id = function () {
            var _this = this;
            return new $.$mol_form_field().setup(function (obj) {
                obj.name = function () { return _this.table_id_label(); };
                obj.errors = function () { return _this.table_id_errors(); };
                obj.control = function () { return _this.Table_id_control(); };
            });
        };
        $saprun_stuff_form_box.prototype.password_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "password_label");
        };
        $saprun_stuff_form_box.prototype.password_errors = function () {
            return [];
        };
        $saprun_stuff_form_box.prototype.password_hint = function () {
            return "******";
        };
        $saprun_stuff_form_box.prototype.password = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $saprun_stuff_form_box.prototype.password_control = function () {
            var _this = this;
            return new $.$mol_string().setup(function (obj) {
                obj.hint = function () { return _this.password_hint(); };
                obj.value = function (val) { return _this.password(val); };
            });
        };
        $saprun_stuff_form_box.prototype.Password = function () {
            var _this = this;
            return new $.$mol_form_field().setup(function (obj) {
                obj.name = function () { return _this.password_label(); };
                obj.errors = function () { return _this.password_errors(); };
                obj.control = function () { return _this.password_control(); };
            });
        };
        $saprun_stuff_form_box.prototype.login_submit_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "login_submit_label");
        };
        $saprun_stuff_form_box.prototype.event_submit = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        $saprun_stuff_form_box.prototype.Login_submit = function () {
            var _this = this;
            return new $.$mol_button_minor().setup(function (obj) {
                obj.title = function () { return _this.login_submit_label(); };
                obj.event_click = function (val) { return _this.event_submit(val); };
            });
        };
        $saprun_stuff_form_box.prototype.Form = function () {
            var _this = this;
            return new $.$mol_form().setup(function (obj) {
                obj.form_fields = function () { return [].concat(_this.Table_id(), _this.Password()); };
                obj.buttons = function () { return [].concat(_this.Login_submit()); };
            });
        };
        $saprun_stuff_form_box.prototype.Sign_up_form = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.Form()); };
            });
        };
        $saprun_stuff_form_box.prototype.sub = function () {
            return [].concat(this.Logo_main(), this.Sign_up_form());
        };
        return $saprun_stuff_form_box;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $saprun_stuff_form_box.prototype, "Logo_main", null);
    __decorate([
        $.$mol_mem()
    ], $saprun_stuff_form_box.prototype, "table_id", null);
    __decorate([
        $.$mol_mem()
    ], $saprun_stuff_form_box.prototype, "Table_id_control", null);
    __decorate([
        $.$mol_mem()
    ], $saprun_stuff_form_box.prototype, "Table_id", null);
    __decorate([
        $.$mol_mem()
    ], $saprun_stuff_form_box.prototype, "password", null);
    __decorate([
        $.$mol_mem()
    ], $saprun_stuff_form_box.prototype, "password_control", null);
    __decorate([
        $.$mol_mem()
    ], $saprun_stuff_form_box.prototype, "Password", null);
    __decorate([
        $.$mol_mem()
    ], $saprun_stuff_form_box.prototype, "event_submit", null);
    __decorate([
        $.$mol_mem()
    ], $saprun_stuff_form_box.prototype, "Login_submit", null);
    __decorate([
        $.$mol_mem()
    ], $saprun_stuff_form_box.prototype, "Form", null);
    __decorate([
        $.$mol_mem()
    ], $saprun_stuff_form_box.prototype, "Sign_up_form", null);
    $.$saprun_stuff_form_box = $saprun_stuff_form_box;
})($ || ($ = {}));
//stuff.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $saprun_stuff = (function (_super) {
            __extends($saprun_stuff, _super);
            function $saprun_stuff() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return $saprun_stuff;
        }($.$saprun_stuff));
        $mol.$saprun_stuff = $saprun_stuff;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//stuff.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_meter = (function (_super) {
        __extends($mol_meter, _super);
        function $mol_meter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_meter.prototype.width = function (val, force) {
            return (val !== void 0) ? val : 0;
        };
        $mol_meter.prototype.height = function (val, force) {
            return (val !== void 0) ? val : 0;
        };
        $mol_meter.prototype.left = function (val, force) {
            return (val !== void 0) ? val : 0;
        };
        $mol_meter.prototype.right = function (val, force) {
            return (val !== void 0) ? val : 0;
        };
        $mol_meter.prototype.bottom = function (val, force) {
            return (val !== void 0) ? val : 0;
        };
        $mol_meter.prototype.top = function (val, force) {
            return (val !== void 0) ? val : 0;
        };
        return $mol_meter;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_meter.prototype, "width", null);
    __decorate([
        $.$mol_mem()
    ], $mol_meter.prototype, "height", null);
    __decorate([
        $.$mol_mem()
    ], $mol_meter.prototype, "left", null);
    __decorate([
        $.$mol_mem()
    ], $mol_meter.prototype, "right", null);
    __decorate([
        $.$mol_mem()
    ], $mol_meter.prototype, "bottom", null);
    __decorate([
        $.$mol_mem()
    ], $mol_meter.prototype, "top", null);
    $.$mol_meter = $mol_meter;
})($ || ($ = {}));
//meter.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_meter = (function (_super) {
            __extends($mol_meter, _super);
            function $mol_meter() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._request_id = 0;
                return _this;
            }
            $mol_meter.prototype.defer_task = function () {
                var _this = this;
                this._request_id = requestAnimationFrame(function () { return _this.update(); });
            };
            $mol_meter.prototype.dom_node = function () {
                return this.object_owner().dom_node();
            };
            $mol_meter.prototype.update = function () {
                var elem = this.render();
                var rect = elem.getBoundingClientRect();
                this.width(Math.round(rect.width));
                this.height(Math.round(rect.height));
                this.top(Math.round(rect.top));
                this.bottom(Math.round(rect.bottom));
                this.left(Math.round(rect.left));
                this.right(Math.round(rect.right));
                this.defer_task();
            };
            $mol_meter.prototype.destroyed = function (next) {
                if (next)
                    cancelAnimationFrame(this._request_id);
                return _super.prototype.destroyed.call(this, next);
            };
            $mol_meter.prototype.width = function (val) {
                var _this = this;
                if (val !== void 0)
                    return val;
                if (this.render().tagName === 'BODY')
                    return $.$mol_window.size().width;
                new $.$mol_defer(function () { return _this.update(); });
                return 0;
            };
            $mol_meter.prototype.height = function (val) {
                var _this = this;
                if (val !== void 0)
                    return val;
                if (this.render().tagName === 'BODY')
                    return $.$mol_window.size().height;
                new $.$mol_defer(function () { return _this.update(); });
                return 0;
            };
            return $mol_meter;
        }($.$mol_meter));
        __decorate([
            $.$mol_mem()
        ], $mol_meter.prototype, "width", null);
        __decorate([
            $.$mol_mem()
        ], $mol_meter.prototype, "height", null);
        $mol.$mol_meter = $mol_meter;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//meter.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_ghost = (function (_super) {
        __extends($mol_ghost, _super);
        function $mol_ghost() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_ghost.prototype.Sub = function () {
            return new $.$mol_view();
        };
        return $mol_ghost;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_ghost.prototype, "Sub", null);
    $.$mol_ghost = $mol_ghost;
})($ || ($ = {}));
//ghost.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_ghost = (function (_super) {
            __extends($mol_ghost, _super);
            function $mol_ghost() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_ghost.prototype.dom_node = function () {
                return $.$mol_view_dom.node(this.Sub());
            };
            $mol_ghost.prototype.render = function () {
                this.Sub().render();
                return _super.prototype.render.call(this);
            };
            return $mol_ghost;
        }($.$mol_ghost));
        $mol.$mol_ghost = $mol_ghost;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//ghost.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_book = (function (_super) {
        __extends($mol_book, _super);
        function $mol_book() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_book.prototype.pages_extended = function () {
            return [];
        };
        $mol_book.prototype.sub = function () {
            return this.pages_extended();
        };
        $mol_book.prototype.pages = function () {
            return [];
        };
        $mol_book.prototype.width = function () {
            return this.Meter().width();
        };
        $mol_book.prototype.Meter = function () {
            return new $.$mol_meter();
        };
        $mol_book.prototype.plugins = function () {
            return [].concat(this.Meter());
        };
        $mol_book.prototype.page = function (index) {
            return null;
        };
        $mol_book.prototype.page_visible = function (index) {
            return true;
        };
        $mol_book.prototype.Page = function (index) {
            var _this = this;
            return new $.$mol_book_page().setup(function (obj) {
                obj.Sub = function () { return _this.page(index); };
                obj.visible = function () { return _this.page_visible(index); };
            });
        };
        return $mol_book;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_book.prototype, "Meter", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_book.prototype, "Page", null);
    $.$mol_book = $mol_book;
})($ || ($ = {}));
(function ($) {
    var $mol_book_placeholder = (function (_super) {
        __extends($mol_book_placeholder, _super);
        function $mol_book_placeholder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_book_placeholder.prototype.minimal_width = function () {
            return 400;
        };
        $mol_book_placeholder.prototype.sub = function () {
            return [].concat(this.title());
        };
        return $mol_book_placeholder;
    }($.$mol_view));
    $.$mol_book_placeholder = $mol_book_placeholder;
})($ || ($ = {}));
(function ($) {
    var $mol_book_page = (function (_super) {
        __extends($mol_book_page, _super);
        function $mol_book_page() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_book_page.prototype.visible = function () {
            return true;
        };
        $mol_book_page.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "mol_book_page_visible": this.visible() }));
        };
        return $mol_book_page;
    }($.$mol_ghost));
    $.$mol_book_page = $mol_book_page;
})($ || ($ = {}));
//book.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_book = (function (_super) {
            __extends($mol_book, _super);
            function $mol_book() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_book.prototype.pages_filtered = function () {
                return this.pages().filter(function (page) { return page; });
            };
            $mol_book.prototype.break_point = function () {
                var pages = this.pages_filtered();
                var limit = this.width();
                var width = 0;
                for (var break_point = pages.length; break_point > 0; --break_point) {
                    width += pages[break_point - 1].minimal_width();
                    if (width > limit)
                        break;
                }
                if (break_point === pages.length)
                    --break_point;
                return break_point;
            };
            $mol_book.prototype.page = function (index) {
                return this.pages_filtered()[index];
            };
            $mol_book.prototype.page_visible = function (index) {
                return index >= this.break_point();
            };
            $mol_book.prototype.pages_extended = function () {
                var _this = this;
                return this.pages_filtered().map(function (page, index) { return _this.Page(index); });
            };
            $mol_book.prototype.title = function () {
                return this.pages_filtered()[this.pages_filtered().length - 1].title();
            };
            return $mol_book;
        }($.$mol_book));
        __decorate([
            $.$mol_mem()
        ], $mol_book.prototype, "pages_filtered", null);
        __decorate([
            $.$mol_mem()
        ], $mol_book.prototype, "break_point", null);
        $mol.$mol_book = $mol_book;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//book.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $my_kp_dashbord = (function (_super) {
        __extends($my_kp_dashbord, _super);
        function $my_kp_dashbord() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $my_kp_dashbord.prototype.Function = function () {
            return new $.$my_kp_dashbord_function();
        };
        $my_kp_dashbord.prototype.Dashbord = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.Function()); };
            });
        };
        $my_kp_dashbord.prototype.Menu = function () {
            var _this = this;
            return new $.$mol_page().setup(function (obj) {
                obj.head = function () { return null; };
                obj.body = function () { return [].concat(_this.Dashbord()); };
                obj.foot = function () { return null; };
            });
        };
        $my_kp_dashbord.prototype.pages = function () {
            return [].concat(this.Menu());
        };
        return $my_kp_dashbord;
    }($.$mol_book));
    __decorate([
        $.$mol_mem()
    ], $my_kp_dashbord.prototype, "Function", null);
    __decorate([
        $.$mol_mem()
    ], $my_kp_dashbord.prototype, "Dashbord", null);
    __decorate([
        $.$mol_mem()
    ], $my_kp_dashbord.prototype, "Menu", null);
    $.$my_kp_dashbord = $my_kp_dashbord;
})($ || ($ = {}));
(function ($) {
    var $my_kp_dashbord_function = (function (_super) {
        __extends($my_kp_dashbord_function, _super);
        function $my_kp_dashbord_function() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return $my_kp_dashbord_function;
    }($.$mol_view));
    $.$my_kp_dashbord_function = $my_kp_dashbord_function;
})($ || ($ = {}));
//dashbord.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $my_kp_dashbord = (function (_super) {
            __extends($my_kp_dashbord, _super);
            function $my_kp_dashbord() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return $my_kp_dashbord;
        }($.$my_kp_dashbord));
        $mol.$my_kp_dashbord = $my_kp_dashbord;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//dashbord.view.js.map
//# sourceMappingURL=web.js.map
