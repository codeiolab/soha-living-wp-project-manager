<template>
    <div class="mytask-outstanding mytask-current">
        <table class="wp-list-table widefat posts current-task-table">
            <thead>
                <tr>
                    <td>&nbsp;</td>
                    <td>{{ __('Task', 'wedevs-project-manager') }}</td>
                    <td>{{ __('Due Date', 'wedevs-project-manager') }}</td>
                    <td>{{ __('Assignee', 'wedevs-project-manager') }}</td>
                    <td>{{ __('Project', 'wedevs-project-manager') }}</td>
                    <td>{{ __('Task List', 'wedevs-project-manager') }}</td>
                </tr>
            </thead>
            <tbody>
                <tr v-if="tasks.length" v-for="task in tasks">
                    <td>
                        <my-task-checkbox :task="task"></my-task-checkbox>
                    </td>
                    <td><a href="#" @click.prevent="popuSilgleTask(task)">{{ task.title }}</a></td>
                    <td>
                        <div class="task-time-recurrent">
                            <div :class="'task-activity task-time'">
                                <span v-if="task.due_date.date">{{ taskDateFormat(task.due_date.date) }}</span>
                                <span v-else @click.prevent="popuSilgleTask(task)"><i class="bb-icon-calendar bb-icon-l"></i></span>
                            </div>
                            <div v-if="task.recurrent && task.recurrent > 0" class="recurrent-task"><i class="bb-icon-repeat bb-icon-l"></i></div>
                        </div>
                    </td>
                    <td>
                        <div class="my-tasks-assignee">
                            <div v-if="task.assignees.data.length" class="task-activity assigned-users-content">
                                <a class="image-anchor" v-for="user in task.assignees.data" :key="user.id" :href="myTaskRedirect(user.id)" :title="user.display_name">
                                    <img class="image" :src="user.avatar_url" :alt="user.display_name" height="48" width="48">
                                </a>
                            </div>
                            <!-- <div v-html="getRelativeDueDate(task)"></div> -->
                        </div>
                    </td>
                    <td>
                        <a :href="`${PM_Vars.project_page}#/projects/${task.project_id}/task-lists`">
                            {{ task.project_title }}
                        </a>
                    </td>
                    <td>
                        <!-- For ERP Integration -->
                        <a :href="`${PM_Vars.project_page}#/projects/${task.project_id}/task-lists/${task.task_list_id}`" v-html="task.task_list.data.title"></a>
                    </td>
                </tr>
                 <tr v-if="!tasks.length">
                    <td colspan="4">{{ __('No task found!', 'wedevs-project-manager') }}</td>
                </tr>
            </tbody>
        </table>
        <div v-if="parseInt(individualTaskId) && parseInt(individualProjectId)">
            <single-task 
                :taskId="parseInt(individualTaskId)" 
                :projectId="parseInt(individualProjectId)"
                @closeTaskModal="closeTaskModal"
            />
        </div>
        <router-view name="singleTask"></router-view>
    </div>
</template>
<style lang="less">
    .mytask-outstanding {
        .outstanding-task-table {
            .id-td {
                width: 85px;
            }
            .pointer {
                cursor: pointer;
            }
            thead td {
                position: relative;
            }
            .sort-wrap {
                position: absolute;
                right: 25px;
                display: flex;
                top: 50%;
                flex-direction: column;
                transform: translate(10px, -50%);
                i {
                    line-height: 0;
                    transform: rotate(180deg);
                    &:not(.active-sorting) {
                        color: #b5b5b5;
                    }
                    &:before {
                        font-size: 8px !important;

                    }

                }
                .flaticon-sort {
                    margin-top: 6px;
                }
            }   
        }
    }
</style>
<script>
    import myTaskCheckbox from './my-task-checkbox.vue';
    export default {
        props: {
            tasks: {
                type: [Array],
                default () {
                    return [];
                }
            }
        },

        data () {
            return {
                individualTaskId: 0,
                individualProjectId: 0,
                sorting: {
                    // id: {
                    //     asc: true,
                    //     desc: false
                    // },
                    title: {
                        asc: false,
                        desc: false
                    },
                    due_date: {
                        asc: false,
                        desc: false
                    },
                }
            }
        },

        components: {
            'single-task': pm.SingleTask,
            myTaskCheckbox,
        },

        created () {
            pmBus.$on('pm_after_close_single_task_modal', this.afterCloseSingleTaskModal);
            pmBus.$on('pm_generate_task_url', this.generateTaskUrl);
            pmBus.$on('pm_after_complete_current_task', this.removeCompletedTaskFromList);
        },

        methods: {
            removeCompletedTaskFromList(task){
                this.$emit('afterCloseTaskModal', task);
            },
            closeTaskModal (task) {
                this.$emit('afterCloseTaskModal', task);
            },

            activeSorting(key) {
                var self = this;
                
                jQuery.each(this.sorting, function( index, val ) {
                    if(index != key) {
                        self.sorting[index].asc = false;
                        self.sorting[index].desc = false;
                    }
                })

                if( !self.sorting[key].asc && !self.sorting[key].desc) {
                    self.sorting[key].asc = true;
                } else {
                    self.sorting[key].asc = self.sorting[key].asc ? false : true;
                    self.sorting[key].desc = self.sorting[key].desc ? false : true;
                } 

                if(self.sorting[key].asc === true) {
                    
                    if(key=='due_date') {
                        var order = 'desc'
                    } else {
                        var order = 'asc'
                    }

                    self.$emit('columnSorting', {
                        orderby: key,
                        order: order
                    });
                }

                if(self.sorting[key].desc === true) {
                    
                    if(key=='due_date') {
                        var order = 'asc'
                    } else {
                        var order = 'desc'
                    }

                    self.$emit('columnSorting', {
                        orderby: key,
                        order: order
                    });
                }
            },

            goToProject(task) {
                this.$router.push({
                    name: 'task_lists',
                    params: { 
                        project_id: task.project_id,
                    }
                });
            },

            goToSigleList (task) {
                this.$router.push({
                    name: 'single_list',
                    params: { 
                        project_id: task.project_id,
                        list_id: task.task_list_id
                    }
                });
            },

            afterCloseSingleTaskModal () {
                this.individualTaskId = false;
                this.individualProjectId = false;
            },

            popuSilgleTask (task) {
                this.individualTaskId = task.id;
                this.individualProjectId = task.project_id;
            },

            getOverdueValue (task) {
                let date = new Date(task.due_date.date);
                var dueDate = pm.Moment(date).add(1, "days").format('YYYY-MM-DD');
                
                return this.relativeDate(dueDate);
    
            },

            getCreatedAtValue (task) {
                if(this.$route.query.start_at == '' || this.$route.query.due_date == '') {
                    return task.created_at;
                }

                if(this.$route.query.start_at != '' && this.$route.query.due_date != '') {
                    return task.start_at +'-'+ task.due_date;
                }
            },

            getCreatedAtLabel () {

                if(this.$route.query.start_at == '' || this.$route.query.due_date == '') {
                    return __('Created at', 'wedevs-project-manager');
                }

                if(this.$route.query.start_at != '' && this.$route.query.due_date != '') {
                    return __('Date Between', 'wedevs-project-manager');
                }
            }
        }
    }
</script>
