<template>
    <div class="pm-checkbox">
        <input v-if="!show_spinner" value="yes" type="checkbox" :id="'mark_as_complete_' + task.id" @change="singleTaskDoneUndone()" ref="completeCheckbox" :checked="isChecked"> 
        <label :for="'mark_as_complete_' + task.id"></label>
        <span class="pm-spinner" v-if="show_spinner"></span>
    </div>
</template>

<script>
import Mixins from './../project-task-lists/mixin';
export default {
    props: {
        task: {
            type: [Object],
            default () {
                return {}
            }
        },
        isChecked: {
            type: Boolean,
            default: false
        }
    },
    mixins: [Mixins],
    data () {
            return {
                taskId: false,
                projectId: false,
                show_spinner: false,
            }
        },
    methods: {
        singleTaskDoneUndone () {
            if (this.isArchivedTaskList(this.task)) {
                return;
            }
            if (this.can_complete_task(this.task)) {
                return;
            }

            var self = this,
                status = this.task.status === 'incomplete' ? 1 : 0;

                this.show_spinner = true;

            var args = {
                data: {
                    task_id: this.task.id ? this.task.id : this.taskId,
                    status : status,
                    project_id: this.task.project_id,
                },
                callback (res) {
                    if( status == '1' ) {
                        self.task.status = true;
                    } else {
                        self.task.status = false;
                    }

                    if ( typeof self.task.activities !== 'undefined' ) {
                        self.task.activities.data.unshift(res.activity.data);
                    } else {
                        self.task.activities = { data: [res.activity.data] };
                    }
                    self.show_spinner = false
                    
                    // Uncheck the checkbox at the end of your method
                    // self.$refs.completeCheckbox.checked = false;
                    
                    pmBus.$emit('pm_after_complete_current_task', this.task);
                }
            }

            this.taskDoneUndone( args );
        },
    }
}
</script>