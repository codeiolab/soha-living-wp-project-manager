<template>
    <div v-if="can_edit_milestone(milestone)" class="milestone-more-menu">
        <!-- popper -->
        <pm-popper trigger="click" :options="popperOptions">
            <div class="pm-popper popper">
                <div class="more-menu-ul-wrap">
                    <ul>
                        <li>
                            <a @click.prevent="showHideMilestoneForm('toggle', milestone)" class="pm-icon-edit" :title="edit_milestone" href="#">
                                <span>{{ __('Edit', 'wedevs-project-manager') }}</span>
                            </a>
                        </li>
                        <li>
                            <a @click.prevent="deleteSelfMilestone()" class="pm-milestone-delete" :title="delete_milestone" href="#">
                                <span>{{ __('Delete', 'wedevs-project-manager') }}</span>
                            </a>
                        </li>
                        <li>
                            <a v-if="is_complete" @click.prevent="milestoneMarkUndone(milestone)" class="pm-milestone-open" :title="mark_as_incomplete" href="#">
                                <span>{{ __('Mark as Incomplete', 'wedevs-project-manager') }}</span>
                            </a>
                        </li>
                        <li>
                            <a v-if="!is_complete" @click.prevent="milestoneMarkDone(milestone)" class="pm-milestone-complete" :title="mark_as_complete" href="#">
                                <span>{{ __('Mark as Complete', 'wedevs-project-manager') }}</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" @click.prevent="milestoneLockUnlock(milestone)" v-if="PM_Vars.is_pro && user_can('view_private_milestone')">
                                <span v-if="milestone.meta.privacy == 0">{{ __('Lock', 'wedevs-project-manager') }}</span>
                                <span v-else>{{ __('Public', 'wedevs-project-manager') }}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            
            <!-- popper trigger element -->
            <span slot="reference" title="Assign user" class="pm-popper-ref popper-ref icon-pm-more-options"></span>
        </pm-popper>
    </div>
</template>

<script>
    import Mixins from './mixin';
    
    export default {
        props: ['milestone'],

        mixins: [Mixins],

        data () {
            return {
                due_date: this.milestone.achieve_date.date,
                edit_milestone: __( 'Edit Milestone', 'wedevs-project-manager'),
                delete_milestone: __( 'Delete milestone', 'wedevs-project-manager'),
                mark_as_incomplete: __( 'Mark as incomplete', 'wedevs-project-manager'),
                mark_as_complete: __( 'Mark as complete', 'wedevs-project-manager'),


            }
        },

        computed: {
            is_complete () {
                return this.milestone.status === 'complete' ? true : false;
            }
        },
        methods:{
            popperOptions () {
                return {
                    placement: 'bottom-end',
                    modifiers: { offset: { offset: '0, 3px' } },
                }
            },
            milestoneMarkDone (milestone) {
                var args = {
                    data: {
                        id: milestone.id,
                        title: milestone.title,
                        status: 'complete'
                    },
                    callback (res) {
                        milestone.status = 'complete';
                    }
                }
                this.updateMilestone(args);
            },

            milestoneMarkUndone (milestone) {
                var args = {
                    data: {
                        id: milestone.id,
                        title: milestone.title,
                        status: 'incomplete'
                    },
                    callback (res) {
                        milestone.status = 'incomplete';
                    }
                }
                this.updateMilestone(args);
            },
            deleteSelfMilestone(){

                var self = this;
                var hasCurrentPage = self.$route.params.current_page_number;
                var args = {
                    milestone_id: this.milestone.id,
                    callback: function(res){
                        if (!self.$store.state.projectMilestones.milestones.length) {
                            self.$router.push({
                                name: 'milestones', 
                                params: { 
                                    project_id: self.project_id 
                                }
                            });
                            if(hasCurrentPage) {
                               self.$store.commit( 'projectMilestones/fetchMilestoneStatus', false ); 
                            }
                            
                        } else {
                            self.getSelfMilestones();
                        }

                        self.templateAction();
                    }
                }
                this.deleteMilestone( args );
            }
        }
    }
</script>