namespace $ { export class $saprun_stuff_bord extends $mol_page {

	/// Head $saprun_stuff_bord_head
	@ $mol_mem()
	Head() {
		return new $saprun_stuff_bord_head()
	}

	/// head / <= Head
	head() {
		return [].concat( this.Head() )
	}

	/// title_menu \Документы
	title_menu() {
		return "Документы"
	}

	/// Close_icon $mol_icon_cross
	@ $mol_mem()
	Close_icon() {
		return new $mol_icon_cross()
	}

	/// Close $mol_link sub / <= Close_icon
	@ $mol_mem()
	Close() {
		return new $mol_link().setup( obj => { 
			obj.sub = () => [].concat( this.Close_icon() )
		} )
	}

	/// menu_rows /
	menu_rows() {
		return [] as any[]
	}

	/// Menu $mol_list rows <= menu_rows
	@ $mol_mem()
	Menu() {
		return new $mol_list().setup( obj => { 
			obj.rows = () => this.menu_rows()
		} )
	}

	/// Menu_page $mol_page 
	/// 	minimal_width 300 
	/// 	title <= title_menu 
	/// 	tools / <= Close 
	/// 	body / <= Menu
	@ $mol_mem()
	Menu_page() {
		return new $mol_page().setup( obj => { 
			obj.minimal_width = () => 300
			obj.title = () => this.title_menu()
			obj.tools = () => [].concat( this.Close() )
			obj.body = () => [].concat( this.Menu() )
		} )
	}

	/// title_bord \Формуляры
	title_bord() {
		return "Формуляры"
	}

	/// bord_rows /
	bord_rows() {
		return [] as any[]
	}

	/// Bord $mol_list rows <= bord_rows
	@ $mol_mem()
	Bord() {
		return new $mol_list().setup( obj => { 
			obj.rows = () => this.bord_rows()
		} )
	}

	/// Bord_page $mol_page 
	/// 	minimal_width 600 
	/// 	title <= title_bord 
	/// 	body / <= Bord
	@ $mol_mem()
	Bord_page() {
		return new $mol_page().setup( obj => { 
			obj.minimal_width = () => 600
			obj.title = () => this.title_bord()
			obj.body = () => [].concat( this.Bord() )
		} )
	}

	/// Dashbord $mol_book pages / 
	/// 	<= Menu_page 
	/// 	<= Bord_page
	@ $mol_mem()
	Dashbord() {
		return new $mol_book().setup( obj => { 
			obj.pages = () => [].concat( this.Menu_page() , this.Bord_page() )
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

namespace $ { export class $saprun_stuff_bord_head extends $mol_view {

	/// Logo_start_page $mol_image uri \-/saprun/stuff/thumbs/logokp.png
	@ $mol_mem()
	Logo_start_page() {
		return new $mol_image().setup( obj => { 
			obj.uri = () => "-/saprun/stuff/thumbs/logokp.png"
		} )
	}

	/// events \События
	events() {
		return "События"
	}

	/// Link1 $mol_link sub / <= events
	@ $mol_mem()
	Link1() {
		return new $mol_link().setup( obj => { 
			obj.sub = () => [].concat( this.events() )
		} )
	}

	/// submit_label \2
	submit_label() {
		return "2"
	}

	/// Evens $mol_button_danger title <= submit_label
	@ $mol_mem()
	Evens() {
		return new $mol_button_danger().setup( obj => { 
			obj.title = () => this.submit_label()
		} )
	}

	/// help \Тех.поддержка
	help() {
		return "Тех.поддержка"
	}

	/// Link2 $mol_link sub / <= help
	@ $mol_mem()
	Link2() {
		return new $mol_link().setup( obj => { 
			obj.sub = () => [].concat( this.help() )
		} )
	}

	/// Add \Еще
	Add() {
		return "Еще"
	}

	/// Link3 $mol_link sub / <= Add
	@ $mol_mem()
	Link3() {
		return new $mol_link().setup( obj => { 
			obj.sub = () => [].concat( this.Add() )
		} )
	}

	/// Menu $mol_view sub / 
	/// 	<= Link1 
	/// 	<= Evens 
	/// 	<= Link2 
	/// 	<= Link3
	@ $mol_mem()
	Menu() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( this.Link1() , this.Evens() , this.Link2() , this.Link3() )
		} )
	}

	/// close_title \Выход
	close_title() {
		return "Выход"
	}

	/// Exit $mol_link sub / <= close_title
	@ $mol_mem()
	Exit() {
		return new $mol_link().setup( obj => { 
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

