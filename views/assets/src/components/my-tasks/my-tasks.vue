<template>
    <div>
        <div class="pm-wrap pm my-tasks pm-my-tasks">
            <div class="pm-common-header">
                <h1 class="wp-heading-inline pm-d-inline">
                    {{ __( 'Tasks', 'wedevs-project-manager') }}
                </h1>
                <a href="#" @click.prevent="openTaskForm()" class="page-title-action button-secondary"><i aria-hidden="true" class="bb-icon-plus bb-icon-l"></i>&nbsp;&nbsp;{{ __( 'New Task', 'wedevs-project-manager') }}</a>
            </div>
            <!-- <my-task-header></my-task-header> -->
            <router-view></router-view>
            <new-task-form v-if="taskForm" @disableTaskForm="closeTaskForm" :users="[$route.params.user_id]"></new-task-form>
        </div>
    </div>
</template>


<script>
import myTaskHeader from './my-task-header.vue';
import Mixins from './mixin';
import NewTaskForm from './new-task.vue';

export default {
    beforeRouteEnter (to, from, next) {
        next(vm => {

        });
    },
    mixins: [Mixins],
    data() {
        return {
            users: [],
            taskForm: false
        }
    },
    created () {
        this.getUserMeta();
        this.getAllusers();
    },
    components: {
        'myTaskHeader': myTaskHeader,
        'new-task-form': NewTaskForm
    },

    methods: {
        closeTaskForm () {
            this.taskForm = false;
        },
        openTaskForm () {
            this.taskForm = true;
        }
    },
}
</script>

<style lang="less">
    .pm-my-tasks {
        .multiselect__content {
            z-index: 9999;
        }
    }
</style>
