<template>
    <div class="task-group">
        
        <ul :data-list_id="list.id"   class="incomplete-task-ul pm-connected-sortable" v-pm-sortable :class="{'has-items' : getIncompleteTasks.length }">
            
            <li :data-id="task.id" :data-order="task.order" v-for="task in getIncompleteTasks" :key="task.id" :class="'incomplete-task-li pm-fade-out-'+task.id">
                <incompleted-tasks :task="task" :list="list"></incompleted-tasks>
            </li>
        </ul> 
        
        <div class="nonsortable more-task-wrap">
            
            <div v-if="isIncompleteLoadMoreActive(list)" class="group-action-btn">
                <a :class="loadMoreCircle ? 'anchor-btn white-text' : 'anchor-btn'" @click.prevent="selfLoadMoreIncompleteTasks(list)" href="#">
                    {{ __( 'More Tasks', 'wedevs-project-manager') }}
                </a>
                <span v-if="loadMoreCircle" class="pm-circle-spinner"></span>
            </div>
            
            <div v-if="parseInt(list.meta.total_complete_tasks) > 0 && checkSearchStatus()" class="group-action-btn show-completed-task">
                
                <a v-if="!showCompletedTask" @click.prevent="fetchCompleteTasks(list)" class="anchor-btn" href="#">
                    <span>{{ __('Show Completed Tasks', 'wedevs-project-manager') }}</span>
                </a>
                <a v-if="showCompletedTask" @click.prevent="showHideCompletedTask()" class="anchor-btn" href="#">    
                    <span>{{ __('Hide Completed Tasks', 'wedevs-project-manager') }}</span>
                </a>
            </div>
        </div>
     
        <ul v-if="showCompletedTask" :data-list_id="list.id"  class="complete-task-ul nonsortable pm-connected-sortable">
            <li :data-id="task.id" :data-order="task.order"  v-for="task in getCompleteTasks" :key="task.id" :class="'complete-task-li pm-fade-out-'+task.id">
                <complete-tasks :task="task" :list="list"></complete-tasks>       

            </li>
        </ul>

        <div
            v-if="isCompleteLoadMoreActive(list) && showCompletedTask"
            class="nonsortable more-task-wrap">

            <div class="group-action-btn">
                <a :class="completedLoadMore ? 'anchor-btn white-text' : 'anchor-btn'" @click.prevent="selfLoadMoreCompleteTasks(list)" href="#">{{ __( 'More Tasks', 'wedevs-project-manager') }}</a>
                <span v-if="completedLoadMore" class="pm-circle-spinner"></span>
            </div>
        </div>

        <div v-if="createNewTask && !isArchivePage()" class="list-task-form nonsortable">
            <new-task-form :list="list"></new-task-form>
        </div>
        
    </div>
</template>

<style lang="less">
    .task-group {
        margin: 14px 0;
        .pm-ui-state-highlight {
            background: none !important;
            border: 1px dashed #d7dee2 !important;
            min-height: 30px !important;
            margin: 0 21px 10px 48px !important;
        }
        
        .incomplete-task-ul.has-items {
            margin-bottom: 8px !important;
        }
        
        .more-task-wrap {
            margin-bottom: 18px;
            display: flex;
            align-items: center;
            margin: 0px 0 20px;

            .group-action-btn {
                margin-right: 15px;
                position: relative;

                .pm-circle-spinner {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    margin-left: -16px;
                    margin-top: -11px;
                }

                .anchor-btn {
                    height: 30px;
                    font-size: 12px;
                    padding: 6px 13px;
                    border-radius: 3px;
                    border: 1px solid #e4e5e5;
                    color: #788383;
                    font-weight: 300;
                    background: #fff;   

                    &:hover {
                        border-color: #1A9ED4;
                        color: #1A9ED4;
                    }
                }

                .white-text {
                    color: #fff;
                    &:hover {
                        color: #fff;
                    }
                }
            }
        }


        .complete-task-ul{
            .task-title {
                a {
                    text-decoration: line-through;
                }
            }
            .pm-todo-wrap {
                //margin: 0 33px 0 47px !important;

                .task-title {
                    word-break: break-all;
                    word-wrap: break-word;
                    hyphens: auto;
                    .title {
                        color: #525252;
                    }
                }

                .checkbox {
                    input[type="checkbox"] {
                        background: #1ABC9C;
                        border-color: #1ABC9C;
                    }
                    input[type="checkbox"]:checked {
                        &:before {
                            color: #fff;
                        }
                    }
                }
            }
        }

        .list-task-form {
            .update-button {
                position: absolute;
                right: 0;
                top: 0px;
                background: #fafafa !important;
                color: #fff !important;
                font-size: 12px;
                font-weight: bolder;
                padding: 5px 8px !important;
                border: 1px solid #ddd;
            }
        }

        .user-wrap {
            display: inline-block;
            .assigned-user {
                img {
                    height: 24px;
                    width: 24px;
                    border-radius: 12px;
                }
            }
        }
        .incomplete-task-li, .complete-task-li {
            /*margin-bottom: 10px;*/
            padding: 8px 0;
            border-top: 1px solid transparent;
            border-bottom: 1px solid transparent;
            /*background: red;
            border-bottom: 1px solid #fff;*/
            
            &:hover {
                background: #fff;
                border-color: #f0f0f0;
                .pm-todo-wrap {
                    .task-more-menu {
                        .icon-pm-more-options {
                            &:before {
                               color: #d6d6d6;
                            }
                        }
                    }
                }
            }
           
        }
        .pm-todo-wrap {
            //margin: 0 33px !important;

            .task-update-wrap {
                margin: 0 0 0 14px;
                width: 100%;
            }

            &:hover {
                .pm-todo-item .task-left > .move {
                    .icon-pm-drag-drop {
                        &:before {
                            color: #bababa;
                        }
                    }
                }

            }  

            .pm-todo-item {
                
                position: relative;
            }
            .todo-content {
                display: flex;
                align-items: baseline;
                // align-items: center;

                .task-left {
                    display: flex;
                    align-items: baseline;
                    /*position: relative;
                    top: -2px;*/

                    .move {
                        cursor: grab;
                        padding-right: 8px;
                        .blank-drag-drop {
                            margin-left: 8px;
                        }

                        .icon-pm-drag-drop {

                            &:before {
                                font-size: 12px;
                                font-weight: bold;
                                color: #fafafa;
                            }
                        }
                    }
                    .checkbox {
                        position: relative;
                        top: -1.5px;
                        // display: flex;
                        // align-items: center;
                    }
                }
                .title-wrap {
                    display: flex;
                    /*align-items: baseline;*/
                    /*position: relative;*/
                    /*top: -1px;*/
                }

                .more-menu {
                    padding: 0 0 0 12px;
                    position: relative;
                    display: flex;
                    justify-content: flex-end;
                    flex: 1;
                    /*top: 1px;*/

                    .icon-pm-more-options {
                        padding: 0 5px;
                        margin: 0 -5px; 
                        cursor: pointer;
                        &:before {
                            color: #fafafa;
                        }
                        &:hover {
                            &:before {
                                color: #6d6d6d;
                            }
                        }
                    }

                    

                    .more-menu-ul-wrap, .list-update-warp {
                        z-index: 9999;
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
                        border: 1px solid #DDDDDD;
                        background: #fff;
                        border-radius: 3px;
                        box-shadow: 0px 2px 40px 0px rgba(214, 214, 214, 0.6);
                        padding: 7px 0;

                        .li-a {
                            display: inline-block;
                            width: 100%;
                            padding: 0 30px 0 12px;
                            color: #7b7d7e;
                            font-weight: 400;
                            font-size: 12px;

                            &:hover {
                                color: #000;
                                .icon-pm-pencil, .icon-pm-move, .icon-pm-private, .icon-pm-unlock {
                                    &:before {
                                        color: #000;
                                    }
                                }
                                .icon-pm-delete {
                                    &:before {
                                        color: #d62222;
                                    }
                                }
                            }
                        }

                        .icon-pm-pencil, 
                        .icon-pm-delete, 
                        .icon-pm-move, 
                        .icon-pm-private,
                        .icon-pm-unlock {
                            display: inline-block;
                            width: 20px;
                            &:before {
                                color: #d7dee2;
                            }
                            &:hover {
                                &:before {
                                    color: #000;
                                }
                            }
                        }
                    }
                }

                .task-action-wrap {
                    display: flex;
                    align-items: center;
                    position: relative;
                    top: 3px;

                    .task-time {
                        white-space: nowrap;
                    }

                    .task-activity {
                        margin-left: 15px;
                        line-height: 0;
                    }
                }
                .checkbox {
                    min-width: 30px;
                    input[type="checkbox"] {
                        border-radius: 3px;
                    }
                }

                .task-title {
                    word-break: break-all;
                    word-wrap: break-word;
                    hyphens: auto;
                    .title {
                        font-size: 14px;
                        color: #525252;
                    }
                    margin-right: 20px;
                }
                .pm-due-date {
                    color: #E94F44 !important;
                    .icon-pm-calendar {
                        &:before {
                            color: #E94F44 !important;
                        }
                    }
                }
                .pm-current-date {
                    color: #4A90E2 !important;
                    .icon-pm-calendar {
                        &:before {
                            color: #4A90E2 !important;
                        }
                    }
                }
                .pm-due-date, .pm-current-date {
                    font-size: 12px;
                    white-space: nowrap;
                    background: none;
                    padding: 0 !important;
                }
                .comment {
                    display: flex;
                    align-items: center;
                    color: #A5A5A5;
                    .icon-pm-comment {
                        &:before {
                            color: #d7dee2;
                        }
                    }
                    
                    span {
                        margin-right: 2px;
                    }
                }
                .task-edit-pencil {
                    margin-right: 18px;
                    font-size: 11px;
                    cursor: pointer;
                }
                .task-delete {
                    margin-right: 18px;
                }
                .assigned-users-content {
                    display: flex;
                    align-items: center;
                    /*position: relative;
                    top: 2.5px;*/

                    .image-anchor {
                        /*line-height: 0;*/
                        margin-right: 3px;
                    }
                    .image {
                        height: 16px;
                        width: 16px;
                        border-radius: 12px;
                        display: inline-block;
                    }
                }
            }
        }
        .incomplete-task-ul {
            padding: 1px 0 !important;
        }
        .complete-task-ul {
            
        }

        @media screen and (max-width: 480px) {
            .incomplete-task-li, .complete-task-li {
                margin-bottom: 20px;
            }

            .pm-todo-wrap {
                margin: 0 16px !important;
                .todo-content {
                    flex-wrap: wrap;
                    position: relative;

                    input[type="checkbox"] {
                        height: 16px;
                        width: 16px;
                        &:before {
                            font: normal 22px/1 dashicons !important;
                        }
                        
                    }

                    .task-left {
                        .move {
                            cursor: grab;
                            padding-right: 10px;
                            padding-left: 10px;
                            position: relative;
                            top: 2px;
                        }
                    } 

                    .title-wrap {
                        flex: 50%;
                    }

                    .task-more-menu {
                        position: absolute;
                        top: 0;
                        right: 0;
                        flex: none;
                    }

                    .task-action-wrap {
                        margin-left: 42px;
                        margin-top: 5px;
                        flex-wrap: wrap;
                        
                        .task-activity {
                            margin-top: 8px;
                        }
                    }
                }
            } 

            .complete-task-li {
                .pm-todo-wrap {
                    .todo-content {
                        .task-action-wrap {
                            margin-left: 17px;
                        }
                    }
                }
            }
        }
    }
</style>

<script>
    import new_task_form from './new-task-form.vue';
    import incompleted_tasks from './incompleted-tasks.vue';
    import completed_tasks from './completed-tasks.vue';
    import Mixins from './mixin';


    export default {
        
        // Get passing data for this component. Remember only array and objects are
        props: ['list', 'isActiveFilter'],

        mixins: [Mixins],

        /**
         * Initial data for this component
         * 
         * @return obj
         */
        data () {
            return {
                showCompletedTask: false,
                showTaskForm: false,
                task: {},
                tasks: this.list.tasks,
                task_index: 'undefined', // Using undefined for slideToggle class
                task_loading_status: false,
                complete_show_load_more_btn: false,
                currnet_user_id: this.$store.state.projectTaskLists.get_current_user_id,
                more_incomplete_task_spinner: false,
                more_completed_task_spinner: false,
                loading_completed_tasks: true,
                loading_incomplete_tasks: true,
                completed_tasks_next_page_number:null,
                hasList: false,
                loadMoreCircle: false,
                completedLoadMore: false
            }
        },

        created () {
            //preventing multiple click for load more complete task
            pm.Vue.set(this.list, 'task_loading_status', false);
            this.isTaskFilterActive();
        },

        watch: {
            list: {
                handler () {
                    var self = this;
                    pm.Vue.nextTick(function() {
                        let list_incomplete = typeof self.list.incomplete_tasks == 'undefined' ? 0 : self.list.incomplete_tasks.data.length;
                        let list_complete = typeof self.list.complete_tasks == 'undefined' ? 0 : self.list.complete_tasks.data.length;
                        
                        if( list_incomplete || list_complete ) {
                            self.hasList = true;
                        } else {
                            self.hasList = false;
                        }
                    });

                    this.isTaskFilterActive();
                },

                deep: true
            },
            
            //Open task filter form. search with complete task and close the form and close complete task wrap
            "$route" (route, prev) {
                if ( prev.query.filterTask == 'active' ) {
                    if ( !this.isActiveFilter ) {
                        this.showCompletedTask = false;
                    }
                } 
            }
        },

        computed: {
            createNewTask () {
                return !this.isInbox(this.list.id) && this.can_create_task && !this.isArchivedList(this.list)
            },
            /**
             * Check, Has task from this props list
             * 
             * @return boolen
             */
            taskLength () {
                return typeof this.list.tasks != 'undefined' && this.list.tasks.length ? true : false;
            },

            /**
             * Get incomplete tasks
             * 
             * @param  array tasks 
             * 
             * @return array       
             */
            getIncompleteTasks () {
                if ( this.list.incomplete_tasks ) {
                    this.list.incomplete_tasks.data.map(function(task, index) {
                        task.status = false;
                    });

                    return this.list.incomplete_tasks.data;
                }

                return [];
            },

            getCompleteTasks () {
                if ( this.list.complete_tasks ) {
                    this.list.complete_tasks.data.map(function(task, index) {
                        task.status = true;
                    });

                    return this.list.complete_tasks.data;
                }

                return [];
            },

            /**
             * Get completed tasks
             * 
             * @param  array tasks 
             * 
             * @return array       
             */
            getCompletedTask () {
                if ( this.list.complete_tasks ) {
                    this.list.complete_tasks.data.map(function(task, index) {
                        task.status = true;
                    });

                    return this.list.complete_tasks.data;
                }
            },

            loadMoreButton (){
                if(typeof this.list.incomplete_tasks  == 'undefined'){
                    return false;
                }
                var pagination = this.list.incomplete_tasks.meta.pagination
                if(pagination.current_page < pagination.total_pages){
                    this.completed_tasks_next_page_number = pagination.current_page+1;
                    return true;
                }

                return false;
            },
            taskFilterStatus () {
                return this.$store.state.projectTaskLists.isActiveTaskFilter;
            }
        },

        components: {
            'new-task-form': new_task_form,
            'incompleted-tasks': incompleted_tasks,
            'complete-tasks': completed_tasks,
            'single-task': pm.SingleTask
        },

        methods: { 

            selfLoadMoreCompleteTasks(list) {
                var self = this;

                if ( self.completedLoadMore ) {
                    return;
                }
                
                let task_ids = list.complete_tasks.data.map( task => task.id );

                var request = {
                    type: 'GET',
                    url: `${self.base_url}pm/v2/projects/${self.project_id}/task-lists/${list.id}/more/tasks`,
                    data: {
                        task_ids: task_ids,
                        status: 1
                    },
                    success (res) {
                        res.data.tasks.data.forEach( task => {
                            self.addTaskMeta(task);
                        } );

                        self.$store.commit( 'projectTaskLists/setTasks', {
                            id: list.id,
                            complete_tasks: res.data.tasks
                        });

                        self.completedLoadMore = false;
                    }
                };
                self.completedLoadMore = true;
                self.httpRequest(request);

                // this.loadMoreCompleteTasks(list, task_ids, function() {
                //     self.completedLoadMore = false;
                // });
            },

            selfLoadMoreIncompleteTasks(list) {
                var self = this;

                if ( self.loadMoreCircle ) {
                    return;
                }
                
                let task_ids = list.incomplete_tasks.data.map( task => task.id );

                var request = {
                    type: 'GET',
                    url: `${self.base_url}pm/v2/projects/${self.project_id}/task-lists/${list.id}/more/tasks`,
                    data: {
                        task_ids: task_ids,
                        status: 0
                    },
                    success (res) {
                        res.data.tasks.data.forEach( task => {
                            self.addTaskMeta(task);
                        } );

                        self.$store.commit( 'projectTaskLists/setTasks', {
                            id: list.id,
                            incomplete_tasks: res.data.tasks
                        });

                        self.loadMoreCircle = false;
                    }
                };
                self.loadMoreCircle = true;
                self.httpRequest(request);

                // this.loadMoreIncompleteTasks(list, function() {
                //     self.loadMoreCircle = false;
                // });
            },
            checkSearchStatus () {
                // && this.$route.query.status != 'complete'
                if(this.$route.query.filterTask == 'active') {
                    return false;
                }

                return true;
            },
            isTaskFilterActive () {
                if(this.$route.query.filterTask == 'active' && this.$route.query.status == 'complete') {
                    this.showCompletedTask = true;
                    
                } 
            },

            fetchCompleteTasks (list) {
                var self = this;

                if(list.complete_tasks.data.length) {
                    this.showCompletedTask = true;
                    return;
                }
                var args = {
                    condition: {
                        with: 'complete_tasks'
                    },

                    callback (res) {
                        
                    }
                }
                this.loadMoreCompleteTasks( list, function(res) {
                    self.showCompletedTask = true;
                } );
            },
            showHideCompletedTask() {
                this.showCompletedTask = this.showCompletedTask ? false : true;
            },
            is_assigned (task) {
                return true;
                var get_current_user_id = this.$store.state.projectTaskLists.get_current_user_id,
                    in_task  = task.assigned_to.indexOf(get_current_user_id);
                
                if ( task.can_del_edit || ( in_task != '-1' ) ) {
                    return true;
                }

                return false;
            },
            /**
             * Get incomplete tasks
             * 
             * @param  array tasks 
             * 
             * @return array       
             */
            getIncompletedTasks (lists) {
                return lists.tasks.filter(function( task ) {
                    return ( task.completed == '0' || !task.completed );
                });
            },

            /**
             * Get completed tasks
             * 
             * @param  array tasks 
             * 
             * @return array       
             */
            getCompleteTask (lists) {
                return lists.tasks.filter(function( task ) {
                    return ( task.completed == '1' || task.completed );
                }); 
            } 
        }
    }
</script>


