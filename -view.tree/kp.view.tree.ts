namespace $ { export class $my_kp extends $mol_page {

	/// Logo_start_page $mol_image uri \-/my/kp/thumbs/logotextmini.svg
	@ $mol_mem()
	Logo_start_page() {
		return new $mol_image().setup( obj => { 
			obj.uri = () => "-/my/kp/thumbs/logotextmini.svg"
		} )
	}

	/// Menu $mol_view
	@ $mol_mem()
	Menu() {
		return new $mol_view()
	}

	/// close_title \Войти
	close_title() {
		return "Войти"
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

	/// Header $mol_view sub / 
	/// 	<= Logo_start_page 
	/// 	<= Menu 
	/// 	<= Exit
	@ $mol_mem()
	Header() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( this.Logo_start_page() , this.Menu() , this.Exit() )
		} )
	}

	/// head / <= Header
	head() {
		return [].concat( this.Header() )
	}

	/// Logo_main $mol_image uri \-/my/kp/thumbs/logomain.svg
	@ $mol_mem()
	Logo_main() {
		return new $mol_image().setup( obj => { 
			obj.uri = () => "-/my/kp/thumbs/logomain.svg"
		} )
	}

	/// table_id_label @ \Табельный номер
	table_id_label() {
		return $mol_locale.text( this.locale_contexts() , "table_id_label" )
	}

	/// table_id_errors /
	table_id_errors() {
		return [] as any[]
	}

	/// table_id_hint \231456
	table_id_hint() {
		return "231456"
	}

	/// table_id?val \
	@ $mol_mem()
	table_id( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// Table_id_control $mol_string 
	/// 	hint <= table_id_hint 
	/// 	value?val <=> table_id?val
	@ $mol_mem()
	Table_id_control() {
		return new $mol_string().setup( obj => { 
			obj.hint = () => this.table_id_hint()
			obj.value = ( val? : any ) => this.table_id( val )
		} )
	}

	/// Table_id $mol_form_field 
	/// 	name <= table_id_label 
	/// 	errors <= table_id_errors 
	/// 	control <= Table_id_control
	@ $mol_mem()
	Table_id() {
		return new $mol_form_field().setup( obj => { 
			obj.name = () => this.table_id_label()
			obj.errors = () => this.table_id_errors()
			obj.control = () => this.Table_id_control()
		} )
	}

	/// password_label @ \Пароль
	password_label() {
		return $mol_locale.text( this.locale_contexts() , "password_label" )
	}

	/// password_errors /
	password_errors() {
		return [] as any[]
	}

	/// password_hint \******
	password_hint() {
		return "******"
	}

	/// password?val \
	@ $mol_mem()
	password( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/// password_control $mol_string 
	/// 	hint <= password_hint 
	/// 	value?val <=> password?val
	@ $mol_mem()
	password_control() {
		return new $mol_string().setup( obj => { 
			obj.hint = () => this.password_hint()
			obj.value = ( val? : any ) => this.password( val )
		} )
	}

	/// Password $mol_form_field 
	/// 	name <= password_label 
	/// 	errors <= password_errors 
	/// 	control <= password_control
	@ $mol_mem()
	Password() {
		return new $mol_form_field().setup( obj => { 
			obj.name = () => this.password_label()
			obj.errors = () => this.password_errors()
			obj.control = () => this.password_control()
		} )
	}

	/// login_submit_label @ \Войти
	login_submit_label() {
		return $mol_locale.text( this.locale_contexts() , "login_submit_label" )
	}

	/// event_submit?val null
	@ $mol_mem()
	event_submit( val? : any , force? : $mol_atom_force ) {
		return ( val !== void 0 ) ? val : <any> null
	}

	/// Login_submit $mol_button_minor 
	/// 	title <= login_submit_label 
	/// 	event_click?val <=> event_submit?val
	@ $mol_mem()
	Login_submit() {
		return new $mol_button_minor().setup( obj => { 
			obj.title = () => this.login_submit_label()
			obj.event_click = ( val? : any ) => this.event_submit( val )
		} )
	}

	/// Form $mol_form 
	/// 	form_fields / 
	/// 		<= Table_id 
	/// 		<= Password 
	/// 	buttons / <= Login_submit
	@ $mol_mem()
	Form() {
		return new $mol_form().setup( obj => { 
			obj.form_fields = () => [].concat( this.Table_id() , this.Password() )
			obj.buttons = () => [].concat( this.Login_submit() )
		} )
	}

	/// Sign_up_form $mol_view sub / <= Form
	@ $mol_mem()
	Sign_up_form() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( this.Form() )
		} )
	}

	/// Form_box $mol_view sub / 
	/// 	<= Logo_main 
	/// 	<= Sign_up_form
	@ $mol_mem()
	Form_box() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( this.Logo_main() , this.Sign_up_form() )
		} )
	}

	/// body / <= Form_box
	body() {
		return [].concat( this.Form_box() )
	}

	/// Logo_lo $mol_image uri \-/my/kp/thumbs/logolo.svg
	@ $mol_mem()
	Logo_lo() {
		return new $mol_image().setup( obj => { 
			obj.uri = () => "-/my/kp/thumbs/logolo.svg"
		} )
	}

	/// phone \
	/// 	\Тех.поддержка:
	/// 	\8(812) 456-11-00
	phone() {
		return "Тех.поддержка:\n8(812) 456-11-00"
	}

	/// Box_phone $mol_text text <= phone
	@ $mol_mem()
	Box_phone() {
		return new $mol_text().setup( obj => { 
			obj.text = () => this.phone()
		} )
	}

	/// help \
	/// 	\[Получить / восстановить доступ](#)
	/// 	\[Инструкция по работе с порталом](#)
	help() {
		return "[Получить / восстановить доступ](#)\n[Инструкция по работе с порталом](#)"
	}

	/// Box_link_help $mol_text text <= help
	@ $mol_mem()
	Box_link_help() {
		return new $mol_text().setup( obj => { 
			obj.text = () => this.help()
		} )
	}

	/// web \
	/// 	\[Официальный сайт Администрации ЛО](http://lenobl.ru/)
	/// 	\[Официальный сайт ГосУслуг](https://www.gosuslugi.ru/)
	web() {
		return "[Официальный сайт Администрации ЛО](http://lenobl.ru/)\n[Официальный сайт ГосУслуг](https://www.gosuslugi.ru/)"
	}

	/// Box_link_web $mol_text text <= web
	@ $mol_mem()
	Box_link_web() {
		return new $mol_text().setup( obj => { 
			obj.text = () => this.web()
		} )
	}

	/// Footer $mol_view sub / 
	/// 	<= Logo_lo 
	/// 	<= Box_phone 
	/// 	<= Box_link_help 
	/// 	<= Box_link_web
	@ $mol_mem()
	Footer() {
		return new $mol_view().setup( obj => { 
			obj.sub = () => [].concat( this.Logo_lo() , this.Box_phone() , this.Box_link_help() , this.Box_link_web() )
		} )
	}

	/// foot / <= Footer
	foot() {
		return [].concat( this.Footer() )
	}

} }

