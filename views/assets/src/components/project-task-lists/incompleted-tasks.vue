<template>
    <div class="pm-todo-wrap">                    
        <div v-if="!task.edit_mode" class="pm-todo-item">
            
            <div class="todo-content">
                <div class="task-left">
                    <div class="move pm-task-drag-handle">
                        <span :class="is_manager (project) ? 'icon-pm-drag-drop' : 'blank-drag-drop'"></span>
                    </div> 
                    <div class="checkbox">
                        <input id="incompleted-task" v-if="!show_spinner" :disabled="can_complete_task(task)" v-model="task.status"  @change="doneUndone()" type="checkbox"  value="" name="" >
                        <label for="incompleted-task"></label>
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
                        <div v-if="taskTimeWrap(task)" :title="getTaskFullDate(task)" :class="'task-activity task-time '+taskDateWrap(task.due_date.date)">
                            <span v-if="task_start_field && task.due_date.date">{{ taskDateFormat( task.start_at.date ) }}</span>
                            <span v-if="isBetweenDate( task_start_field, task.start_at.date, task.due_date.date )">&ndash;</span>
                            <span>{{ taskDateFormat(task.due_date.date) }}</span>
                        </div>
                        <div v-if="!taskTimeWrap(task)" @click.prevent="getSingleTask(task)" class="task-activity task-time"><i class="bb-icon-calendar bb-icon-l"></i></div>
                        <div v-if="task.recurrent && task.recurrent > 0" class="recurrent-task"><i class="bb-icon-repeat bb-icon-l"></i></div>
                    </div>

                    <div v-if="task.assignees.data.length" class="task-activity assigned-users-content">
                        <a class="image-anchor" v-for="(user, key) in task.assignees.data" :key="user.id" :href="myTaskRedirect(user.id)" :title="user.display_name">
                            <img class="image" :src="user.avatar_url" :alt="user.display_name" height="48" width="48">
                        </a>
                        <!-- more user button and their markup -->
                        <!-- <span v-if="task.assignees.data.length > 2" class="pm-more-users pm-has-dropdown">
                            <a @click.prevent="showMoreUser(task)" href="#" class="pm-dropdown-trigger">+{{ task.assignees.data.length - 2 }}</a>
                            <ul :class="'pm-dropdown-menu '+ pmDropDownOpen(task)">
                                <li v-for="(user, key) in task.assignees.data" v-if="key > 1" :key="key" class="pm-has-tooltip">
                                    <img class="pm-img-circle" :src="user.avatar_url" :alt="user.display_name">
                                    <span class="pm-tooltip-label">{{ user.display_name }}</span>
                                </li>
                            </ul>
                        </span> -->
                    </div>
                    <div v-else class="no-task-assigne task-activity assigned-users-content"></div>

                    <div class="task-comment-total" v-if="task.meta.total_comment > 0">
                        <span>{{ task.meta.total_comment }}</span>
                        <i class="bb-icon-comment bb-icon-l"></i>
                    </div>
                    <div class="task-activity" v-if="isPrivateTask(task.meta.privacy)">
                        <span class="bb-icon-lock-alt bb-icon-l"></span>
                    </div>
                </div>  

                <div v-if="can_edit_task(task) && !isArchivedTaskList(task)" class="nonSortableTag more-menu task-more-menu">
                    <pm-popper trigger="click" :options="popperOptions">
                        <div class="pm-popper popper">
                            <div class="more-menu-ul-wrap">
                                <ul>
                                    <li v-if="PM_Vars.is_pro && user_can('view_private_task') && !isPrivateTask(task.meta.privacy)"  class="first-li">
                                        <a @click.prevent="TaskLockUnlock(task)" class="li-a" href="#">
                                            <span  class="icon-pm-private"></span>
                                            <span>{{ __('Make Private', 'wedevs-project-manager') }}</span>
                                        </a>
                                    </li>
                                    <li v-if="PM_Vars.is_pro && user_can('view_private_task') && isPrivateTask(task.meta.privacy)"  class="first-li">
                                        <a @click.prevent="TaskLockUnlock(task)" class="li-a" href="#">
                                            <span class="icon-pm-unlock"></span>
                                            <span>{{ __('Make Public', 'wedevs-project-manager') }}</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a @click.prevent="taskDuplicate(task.id)" class="li-a" href="#">
                                            <span class="flaticon-pm-copy-files"></span>
                                            <span>{{ __('Duplicate', 'wedevs-project-manager') }}</span>
                                        </a>
                                    </li>
                                    <li class="edit-task-btn">
                                        <a @click.prevent="taskFormActivity('toggle', false, task, $event)" class="li-a" href="#">
                                            <span class="icon-pm-pencil"></span>
                                            <span>{{ __('Edit', 'wedevs-project-manager') }}</span>
                                        </a>
                                    </li>

                                    <li>
                                        <a @click.prevent="move({task: task, list: list})" class="li-a" href="#">
                                            <span class="icon-pm-move"></span>
                                            <span>{{ __('Move', 'wedevs-project-manager') }}</span>
                                        </a>
                                    </li>

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
                        <span slot="reference" :title="__( 'action', 'wedevs-project-manager')" class="pm-popper-ref popper-ref icon-pm-more-options"></span>
                    </pm-popper>
                </div>                
            </div>
        </div>
        
        <div v-if="task.edit_mode && can_create_task" class="task-update-wrap nonSortableTag">
            <new-task-form  
                :task="task" 
                :list="list"
                @closeTaskForm="closeTaskForm"
            />
        </div>

        <div v-if="parseInt(taskId) && parseInt(projectId)">
            <single-task 
                :taskId="parseInt(taskId)" 
                :projectId="parseInt(projectId)" 
            />
        </div>

        <div v-if="moveTaskItems.popupModal">
            <move-task :items="moveTaskItems" />
        </div>
    </div>

</template>

<style lang="less">
    .task-activity .pm-action-wrap {
        display: flex;
        align-items: center;
        .recuring-content {
            margin-right: 15px;
        }
    }
    .more-menu-ul-wrap {
        text-align: left; 
        min-width: 150px;
        right: -20px;
        position: absolute;

        .flaticon-pm-copy-files {
            display: inline-block;
            width: 20px;
            &:before {
                color: #b5b4b4;
            }
            &:hover {
                &:before {
                    color: #000;
                }
            }
        }       
    }    
</style>
<script>
    import new_task_form from './new-task-form.vue';
    import DoAction from './../common/do-action.vue';
    import Mixins from './mixin';
    import MoveTask from './move-task.vue';
    
    export default {
        props: {
            task: {
                type: [Object],
                default () {
                    return {}
                }
            },
            list: {
                type: [Object],
                default () {
                    return {};
                } 
            }
        },
        
        mixins: [Mixins],

        data () {
            return {
                taskId: false,
                projectId: false,
                show_spinner: false,
                
                moveTaskItems: {
                    task: {},
                    list: {},
                    lists: [],
                    projectId: false,
                    popupModal: false,
                }
            }
        },

        created () {
            var self = this;
            window.addEventListener('click', this.windowActivity);
            pmBus.$on('pm_after_close_single_task_modal', this.afterCloseSingleTaskModal);
            jQuery('body').keyup(function(e) {
                if (e.keyCode === 27) {
                    self.task.edit_mode = false;
                }
            });
        },

        components: {
            'new-task-form': new_task_form,
            'do-action': DoAction,
            'single-task': pm.SingleTask,
            'move-task': MoveTask
        },
        
        computed: {
            route_name (){
                if( this.$route.name === 'single_list' ){
                    return 'single_task'
                }

                return 'lists_single_task'
            },

            isSingleTask () {
                return this.$route.params.task_id ? true : false;
            },

            doActionData () {
                return {
                    task: this.task,
                    list: this.list
                }
            },
            // popper options
            popperOptions () {
                return {
                    placement: 'bottom-end',
                    modifiers: { offset: { offset: '0, 5px' } }
                }
            },
            project () {
                return this.$store.state.project;
            }
        },
        
        methods: {
            showMoreUser(task){
                if (task.showMoreUser) {
                    return "pm-dropdown-open";
                }

                return "";
            },
            pmDropDownOpen(task){
                task.showMoreUser = task.showMoreUser ? false : true;
            },
            closeTaskForm () {
                this.task.edit_mode = false;
            },

            move (items) {
                this.moveTaskItems.popupModal = true;
                this.moveTaskItems.task = items.task;
                this.moveTaskItems.list = items.list;
                this.moveTaskItems.projectId = this.project_id;
            },

            taskFormActivity (toggle, status, task, el) {
                var li = jQuery(el.target).closest('.incomplete-task-li');
                
                this.showHideTaskFrom(toggle, status, task);

                pm.Vue.nextTick(function() {
                    li.find('.task-input-field').focus();
                });

            },

            getTaskFullDate (task) {
                var date = '';
                
                if(this.task_start_field && task.start_at.date) {
                    date = this.getFullDate(task.start_at.date, task.start_at.time);
                }

                if(this.task_start_field && task.start_at.date && task.due_date.date) {
                    date = date + '-';
                }

                if(task.due_date.date) {
                    date = date + this.getFullDate(task.due_date.date, task.due_date.time);
                }
                
                return date;
            },

            isPrivateTask (isPrivate) {
                return isPrivate == '1' ? true : false;
            },

            windowActivity (el) {
                 //updateField  = jQuery(el.target).closest('.task-update-wrap'),
                    //updateBtn = jQuery(el.target).closest('.edit-task-btn'),
                var taskActionWrap = jQuery(el.target).closest('.task-more-menu');
                    //hasLabelPopup = this.hasLabelPopup(el);
                
                if(!taskActionWrap.length) {
                    this.task.moreMenu = false;
                }
                
                //if ( !updateBtn.length && !updateField.length && !hasLabelPopup) {
                    //this.task.edit_mode = false;
                //}
            },

            hasLabelPopup (el) {
                var toltip = jQuery(el.target).closest('.tooltip'),
                    toltip = toltip.attr('id');

                if(typeof toltip !== 'undefined' && toltip.length) {
                    return true;
                }

                return false;
                
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
                        self.show_spinner = false
                    }
                }

                                    
                this.taskDoneUndone( args );
            }
        }
    }
</script>
