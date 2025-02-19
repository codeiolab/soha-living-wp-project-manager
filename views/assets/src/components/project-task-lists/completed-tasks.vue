<template>
    <div class="pm-todo-wrap">                    
        <div v-if="!task.edit_mode" class="pm-todo-item">
            
            <div class="todo-content">
                <div class="task-left">
                    <div class="checkbox">
                        <input id="completed-task" v-if="!show_spinner" :disabled="can_complete_task(task)" v-model="task.status"  @change="doneUndone()" type="checkbox"  value="" name="" >
                        <label for="completed-task"></label>
                        <span class="pm-spinner" v-if="show_spinner"></span>
                    </div>
                </div>
                <div class="title-wrap">
                    <div class="task-title">
                        <a class="title" href="#" @click.prevent="getSingleTask(task)" v-html="ucfirst(task.title)"></a>
                    </div>  
                </div> 

                <div class="task-right task-action-wrap">
                    <div class="task-time-recurrent">
                        <div v-if="taskTimeWrap(task)" :class="'task-activity task-time '+taskDateWrap(task.due_date.date)">
                            <span v-if="task_start_field">{{ taskDateFormat( task.start_at.date ) }}</span>
                            <span v-if="isBetweenDate( task_start_field, task.start_at.date, task.due_date.date )">&ndash;</span>
                            <span>{{ taskDateFormat(task.due_date.date) }}</span>
                        </div>
                        <div v-if="task.recurrent && task.recurrent > 0" class="recurrent-task"><i class="bb-icon-repeat bb-icon-l"></i></div>
                    </div>
                    <div v-if="task.assignees.data.length" class="task-activity assigned-users-content">
                        <a class="image-anchor" v-for="user in task.assignees.data" :key="user.id" :href="myTaskRedirect(user.id)" :title="user.display_name">
                            <img class="image" :src="user.avatar_url" :alt="user.display_name" height="48" width="48">
                        </a>
                    </div>
                    <div v-else class="no-task-assigne task-activity assigned-users-content"></div>
                    <div class="task-comment-total" v-if="task.meta.total_comment > 0">
                        <span>{{ task.meta.total_comment }}</span>
                        <i class="bb-icon-comment bb-icon-l"></i>
                    </div>
                </div>   
                <div v-if="can_edit_task(task) && !isArchivedTaskList(task)" @click.prevent="showHideTaskMoreMenu(task, list)" class="more-menu task-more-menu">
                    <pm-popper trigger="click" :options="popperOptions">
                        <div class="pm-popper popper">
                            <div class="more-menu-ul-wrap">
                                <ul>
                                    <li>
                                        <a @click.prevent="deleteTask({task: task, list: list})" class="li-a" href="#">
                                            <span class="icon-pm-delete"></span>
                                            <span>{{ __('Delete', 'wedevs-project-manager') }}</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!-- popper trigger element -->
                        <span slot="reference" title="Action" class="pm-popper-ref popper-ref icon-pm-more-options"></span>
                    </pm-popper>
                </div>               
            </div>
        </div>
        
        <div v-if="parseInt(taskId) && parseInt(projectId)">
            <single-task :taskId="taskId" :projectId="projectId"></single-task>
        </div>
    </div>
</template>


<script>
    import new_task_form from './new-task-form.vue';
    import Mixins from './mixin';
    
    export default {
        props: ['task', 'list'],
        mixins: [Mixins],
        data () {
            return {
                taskId: false,
                projectId: false,
                show_spinner: false,
            }
        },
        components: {
            'new-task-form': new_task_form,
            'single-task': pm.SingleTask
        },
        computed: {
            doActionData () {
                return {
                    task: this.task,
                    list: this.list
                }
            },
            route_name (){
                if( this.$route.name === 'single_list' ){
                    return 'single_task'
                }

                return 'lists_single_task'
            },
            // popper options
            popperOptions () {
                return {
                    placement: 'bottom-end',
                    modifiers: { offset: { offset: '0, 5px' } }
                }
            }
        },
        created () {
            window.addEventListener('click', this.windowActivity);
            pmBus.$on('pm_after_close_single_task_modal', this.afterCloseSingleTaskModal);
        },
        methods: {
            windowActivity (el) {
                var taskActionWrap = jQuery(el.target).closest('.task-more-menu');
                
                if(!taskActionWrap.length) {
                    this.task.moreMenu = false;
                }
            },
            afterCloseSingleTaskModal () {
                
                if(this.$route.name == 'lists_single_task') {
                    this.$router.push({
                        name: 'task_lists'
                    });
                } else if(this.$route.name == 'single_task') {
                    this.$router.push({
                        name: 'single_list'
                    });
                } else {
                    this.taskId = false;
                    this.projectId = false;
                }
            },
            getSingleTask (task) {
                this.$store.commit('projectTaskLists/updateSingleTaskActiveMode', true);
                this.taskId = parseInt(task.id);
                this.projectId = parseInt(task.project_id);
            },
            is_assigned: function(task) {
                return true;
                var get_current_user_id = this.$store.state.projectTaskLists.get_current_user_id,
                    in_task  = task.assigned_to.indexOf(get_current_user_id);
                
                if ( task.can_del_edit || ( in_task != '-1' ) ) {
                    return true;
                }

                return false;
            },

            doneUndone (){
                var self = this,
                 status = this.task.status ? 1: 0;
                 this.show_spinner = true;
                var args = {
                    data: {
                        title: this.task.title,
                        task_id: this.task.id,
                        status : status,
                    },
                    callback: function(res){
                        self.$store.commit( 'projectTaskLists/afterTaskDoneUndone', {
                            status: status,
                            task: res.data,
                            list_id: self.list.id,
                            task_id: self.task.id
                        });
                        self.show_spinner = false;
                    }
                }

                                    
                this.taskDoneUndone( args );
            }
        }
    }
</script>

