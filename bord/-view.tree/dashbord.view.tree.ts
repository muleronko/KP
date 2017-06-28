namespace $ { export class $saprun_stuff_dashbord extends $mol_book {

	/// Header $saprun_stuff_dashbord_head
	@ $mol_mem()
	Header() {
		return new $saprun_stuff_dashbord_head()
	}

	/// Function $saprun_stuff_dashbord_function
	@ $mol_mem()
	Function() {
		return new $saprun_stuff_dashbord_function()
	}

	/// Dashbord $mol_view sub / <= Function
	@ $mol_mem()
	Dashbord() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( this.Function() )
		} )
	}

	/// Menu $mol_page 
	/// 	head / <= Header 
	/// 	body / <= Dashbord 
	/// 	foot null
	@ $mol_mem()
	Menu() {
		return new $mol_page().setup( obj => { 
			obj.head = () => [].concat( this.Header() )
			obj.body = () => [].concat( this.Dashbord() )
			obj.foot = () => <any> null
		} )
	}

	/// pages / <= Menu
	pages() {
		return [].concat( this.Menu() )
	}

} }

namespace $ { export class $saprun_stuff_dashbord_head extends $mol_view {

	/// Logo_start_page $mol_image uri \-/saprun/stuff/thumbs/logotextmini.svg
	@ $mol_mem()
	Logo_start_page() {
		return new $mol_image().setup( obj => { 
			obj.uri = () => "-/saprun/stuff/thumbs/logotextmini.svg"
		} )
	}

	/// Menu $mol_view
	@ $mol_mem()
	Menu() {
		return new $mol_view()
	}

	/// close_title \Выход
	close_title() {
		return "Выход"
	}

	/// Exit $mol_link 
	/// 	arg * link null 
	/// 	sub / <= close_title
	@ $mol_mem()
	Exit() {
		return new $mol_link().setup( obj => { 
			obj.arg = () => ({
			"link" :  <any> null ,
		})
			obj.sub = () => [].concat( this.close_title() )
		} )
	}

	/// sub / 
	/// 	<= Logo_start_page 
	/// 	<= Menu 
	/// 	<= Exit
	sub() {
		return [].concat( this.Logo_start_page() , this.Menu() , this.Exit() )
	}

} }

namespace $ { export class $saprun_stuff_dashbord_function extends $mol_view {

} }

