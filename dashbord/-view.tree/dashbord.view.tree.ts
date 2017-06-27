namespace $ { export class $my_kp_dashbord extends $mol_page {

	/// head null
	head() {
		return <any> null
	}

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

	/// body / <= Dashbord
	body() {
		return [].concat( this.Dashbord() )
	}

	/// foot null
	foot() {
		return <any> null
	}

} }

namespace $ { export class $my_kp_dashbord_function extends $mol_view {

} }

