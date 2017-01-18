;(function($) {

	'use strict';

	// Task root object 
	var CPM_Task = new Vue({
		el: '#cpm-task-el',

		mixins: [CPM_Mixin],

		data: {
			project_id: CPM_Vars.project_id,
			loading: true,
			hide_list_form: true,
			lists: '',
			milestones: '',
			init: {},
			list: {},
			text: {
				new_todo: CPM_Vars.message.new_todo
			}
		},

		// Initial doing 
		created: function() {
			this.$on( 'cpm_task_hook', this.getTaskHook );
			this.getInitialData( this.project_id );
			//this.getMilestone( this.project_id );
		},

		methods: {
			// New todo list
			newList: function() {
				this.hide_list_form = this.hide_list_form ? false : true;
			},

			// Get all hook from chiled components
			getTaskHook: function( hook, data, e ) {

				switch( hook ) {
					case 'hide_todo_list_form':
						this.hide_list_form = true;
						break;

					default:
						break;
				}
			},

			// Get initial data for todo list page 
			getInitialData: function( project_id ) {
				var self = this,
					data = {
						project_id: project_id,
						_wpnonce: CPM_Vars.nonce,
						action: 'cpm_initial_todo_list'
					}

				jQuery.post( CPM_Vars.ajaxurl, data, function( res ) {
	                if ( res.success ) {
	                    self.milestones = res.data.milestones;
	                    self.lists      = res.data.lists;
	                    self.tasks      = res.data.tasks;
	                    self.init       = res.data;
	                    
	                    if ( self.lists.length ) {
	                    	self.loading = false;
	                    }
	                    
	                    //for (var key in res.data ) {
						// 	if ( res.data.hasOwnProperty( key ) ) {
						// 		self.$data[key] = res.data[key];
						// 	}
						// }
	                } 
	                
	            });
			}
		}
	});

})(jQuery);