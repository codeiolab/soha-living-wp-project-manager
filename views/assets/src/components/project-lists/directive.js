
var Project = {
    coWorkerSearch: function(el, binding, vnode) {
        
        var $ = jQuery;
        var pm_abort;
        var context = vnode.context;

        $( ".pm-project-coworker" ).autocomplete( {
            minLength: 1,
            
            source: function( request, response ) {
                var args = {
                    conditions: {
                       query : request.term
                    },
                    callback: function (res) {
                        if ( res.data.length ) {
                            const assignes = this.$store.state.assignees;
                            if ( assignes.length == 0 ) {
                                response( res.data );
                                return;
                            }
                            const users = assignes.map( item => item.id );
                            const result  = res.data.filter( item => !users.includes( item.id ) );
                            response( result );
                        } else {
                            response({
                                value: '0',
                            });
                        }
                    }
                }

                if ( pm_abort ) {
                    pm_abort.abort();
                }
                pm_abort = context.get_search_user(args);
            },

            search: function() {
                $( this ).addClass( 'pm-spinner' );
            },

            open: function() {
                var self = $( this );
                self.autocomplete( 'widget' ).css( 'z-index', 999999 );
                self.removeClass( 'pm-spinner' );
                return false;
            },

            select: function( event, ui ) {
                if ( ui.item.value === '0' ) {
                    
                    $( "form.pm-user-create-form" ).find( 'input[type=text]' ).val( '' );
                    
                    if ( parseInt(PM_Vars.can_add_user_project_create_time) == 1 ) {
                        $( "#pm-create-user-wrap" ).dialog( "open" );
                    }
                    
                } else {

                    var has_user = context.selectedUsers.find(function(user) {
                        return ui.item.id === user.id ? true : false;
                    });
                    
                    if (!has_user) {
                        context.addUserMeta(ui.item);
                        
                        context.$store.commit('updateSeletedUser', {
                            item:  ui.item,
                            project_id: context.project_id
                        });
                    }
                    
                    
                    $( '.pm-project-role>table' ).append( ui.item._user_meta );
                    $( "input.pm-project-coworker" ).val( '' );
                }
                return false;
            }

        } ).data( "ui-autocomplete" )._renderItem = function( ul, item ) {
            var no_user = context.__( 'No users found.', 'wedevs-project-manager'),
                create_new_user = context.__( 'Create a new user', 'wedevs-project-manager');
            
            if ( item.email ) {
                return $( "<li>" )
                    .append( '<a>'+item.display_name+'</a>' )
                    .appendTo( ul );
            
            } else {

                if ( parseInt(PM_Vars.can_add_user_project_create_time) == 1 ) {
                    return $( "<li>" )
                        .append( '<a><div class="no-user-wrap"><p>'+no_user+'</p> <span class="pm-more-user-form-btn button-primary">'+create_new_user+'</span></div></a>' )
                        .appendTo( ul );
                } else {
                    return $( "<li>" )
                        .append( '<a><div class="no-user-wrap"><p>'+no_user+'</p></div></a>' )
                        .appendTo( ul ); 
                }
            }
        };
    },
    projectSortable: function(el, binding, vnode) {
        var $ = jQuery;
        var component = vnode.context;
        
        $(el).sortable({
            // cancel: '.nonsortable,form',
            placeholder: "pm-ui-state-highlight",
            items: '> *',
            handle: '.pm-project-drag-handle',
            disabled: !component.is_manager(),
            
            update: function(event, ui) {
                if(ui.sender) {
                    
                } else {
                    let projects  = $(ui.item).closest('div.pm-projects-row').find('article.pm-project-item');
                    let orders = Project.projectSorting(projects);
                    
                    component.projectOrder({
                        orders: orders
                    });
                };
            }
        });
    },
    projectSorting (projects) {
        projects = projects || [];
        var $ = jQuery,
            orders = [];
 
        // finding new order sequence and old orders
        projects.each( function(index, e) {
            let project_id = $(e).data('id');
            
            orders.push({
                index: index,
                id: project_id
            });
        }); 

        return orders;
    },
}


// Register a global custom directive called v-pm-popup-box
pm.Vue.directive('pm-users', {
    inserted: function (el, binding, vnode) { 
        Project.coWorkerSearch(el, binding, vnode);
    }
});
var dilogbox = false;
// Register a global custom directive called v-pm-popup-box
pm.Vue.directive('pm-popup-box', {
    inserted: function (el, buinding, vnode) {

        if (
            dilogbox !== false
                &&
            typeof dilogbox.dialog( "instance" ) != 'undefined'
        ){
            dilogbox.dialog( "destroy" );
        }
        dilogbox = jQuery(el).dialog({
            autoOpen: false,
            modal: true,
            dialogClass: 'pm-ui-dialog',
            width: 485,
            height: 'auto',
            position:['middle', 100],
        });
        
    }
});

// Register a global custom directive called v-pm-popup-box
pm.Vue.directive('pm-user-create-popup-box', {

    inserted: function (el) {
        jQuery(function($) {
            $(el).dialog({
                autoOpen: false,
                modal: true,
                dialogClass: 'pm-ui-dialog pm-user-ui-dialog',
                width: 400,
                height: 'auto',
                position:['middle', 100],
            });
        });
    }
});

pm.Vue.directive('pm-project-sortable', {
    inserted: function (el, binding, vnode) {
        Project.projectSortable(el, binding, vnode);
    }
});


