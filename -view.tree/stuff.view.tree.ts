namespace $ { export class $saprun_stuff extends $mol_page {

	/// head null
	head() {
		return <any> null
	}

	/// Body_singup $saprun_stuff_form_box
	@ $mol_mem()
	Body_singup() {
		return new $saprun_stuff_form_box()
	}

	/// body / <= Body_singup
	body() {
		return [].concat( this.Body_singup() )
	}

	/// foot null
	foot() {
		return <any> null
	}

} }

namespace $ { export class $saprun_stuff_form_box extends $mol_view {

	/// Logo_main $mol_image uri \-/saprun/stuff/thumbs/logo.png
	@ $mol_mem()
	Logo_main() {
		return new $mol_image().setup( obj => { 
			obj.uri = () => "-/saprun/stuff/thumbs/logo.png"
		} )
	}

	/// name \
	/// 	\# Кадровый портал
	/// 	\Правительства Ленинградской области
	name() {
		return "# Кадровый портал\nПравительства Ленинградской области"
	}

	/// Logo_name $mol_text text <= name
	@ $mol_mem()
	Logo_name() {
		return new $mol_text().setup( obj => { 
			obj.text = () => this.name()
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

	/// sub / 
	/// 	<= Logo_main 
	/// 	<= Logo_name 
	/// 	<= Sign_up_form
	sub() {
		return [].concat( this.Logo_main() , this.Logo_name() , this.Sign_up_form() )
	}

} }

