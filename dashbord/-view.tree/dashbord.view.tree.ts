namespace $ { export class $my_kp_dashbord extends $mol_book {

	/// Function $my_kp_dashbord_function
	@ $mol_mem()
	Function() {
		return new $my_kp_dashbord_function()
	}

	/// Dashbord $mol_view sub / <= Function
	@ $mol_mem()
	Dashbord() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( this.Function() )
		} )
	}

	/// Menu $mol_page 
	/// 	head null 
	/// 	body / <= Dashbord 
	/// 	foot null
	@ $mol_mem()
	Menu() {
		return new $mol_page().setup( obj => { 
			obj.head = () => <any> null
			obj.body = () => [].concat( this.Dashbord() )
			obj.foot = () => <any> null
		} )
	}

	/// pages / <= Menu
	pages() {
		return [].concat( this.Menu() )
	}

} }

namespace $ { export class $my_kp_dashbord_function extends $mol_view {

} }

