<template>
    <div v-if="upComingMileStones.length" class="pm-upcomming-milestone pm-milestone-data">
        <span class="group-title"><i class="bb-icon-flag bb-icon-l"></i>{{ __( 'Upcoming Milestones', 'wedevs-project-manager')}}</span>
        <div class="pm-milestone-list">
            <div v-for="milestone in upComingMileStones" class="pm-milestone late">
                <div class="milestone-detail ">
                    <h3 class="milestone-head">
                        <div class="milestone-detail-top">
                            <span v-html="milestone.title"></span>
                            <action :milestone="milestone"></action>
                        </div>
                        <span class="time-left">
                            ({{ humanDate(milestone) }} {{ __( 'left -', 'wedevs-project-manager') }} 
                            <time :datetime="momentFormat(milestone)" :title="momentFormat(milestone)">
                                {{ getDueDate(milestone) }}
                            </time>
                            )
                        </span>
                    </h3>

                    <div class="detail">
                        <div v-html="milestone.content"></div>
                    </div>
                </div>

                <transition name="slide" v-if="can_edit_milestone(milestone)">
                    <div class="pm-milestone-edit-form" style="float:none;" v-if="milestone.edit_mode" >
                        <new-milestone-form section="milestones" :milestone="milestone"></new-milestone-form>
                    </div>
                </transition>
                <div class="pm-milestone-items-details">
                    <div v-if="milestone.task_lists.data.length"  class="pm-col-6 pm-milestone-todo pm-sm-col-12">
                        <h3>{{ __( 'Task Lists', 'wedevs-project-manager') }}</h3>

                        <ul>
                            <li v-for="list in milestone.task_lists.data">
                                <list :list="list"></list>
                            </li>
                        </ul>
                    </div>
                
                    <div v-if="milestone.discussion_boards.data.length"  class="pm-col-8 pm-milestone-discussion pm-sm-col-12">
                        <h3>{{  __( 'Discussions', 'wedevs-project-manager') }}</h3>
                        <ul>
                            <li v-for="discuss in milestone.discussion_boards.data">
                                <discuss :discuss="discuss"></discuss>
                            </li>
    
                        </ul>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import new_milestone_form from './new-milestone-form.vue';
    import list from './list.vue';
    import action from './action-milestones.vue';
    import discuss from './milestone-discussion.vue';
    import Mixins from './mixin';

    export default {
        mixins: [Mixins],
        components: {
            'new-milestone-form': new_milestone_form,
            'list': list,
            'action': action,
            'discuss': discuss
        },
        computed: {
            upComingMileStones () {
                
                var milestones = this.$store.state.projectMilestones.milestones.filter(function(milestone) {

                    if ( milestone.status === 'complete' ) {
                        return false;
                    }
                    var due_date = milestone.achieve_date.date;

                    if ( !due_date ) {
                        return false;
                    }

                    due_date = new Date(due_date);
                    due_date = pm.Moment(due_date).format('YYYY-MM-DD');

                    if ( ! pm.Moment( due_date ).isValid() ) {
                        return false;
                    }

                    const today = pm.Moment().format( 'YYYY-MM-DD' ),
                        due_day = pm.Moment( due_date ).format( 'YYYY-MM-DD' );

                    const txt = document.createElement( 'textarea' );
                    txt.innerHTML = milestone.title;
                    milestone.title = txt.value;

                    return pm.Moment(due_day).isSameOrAfter(today) ? milestone : false;
                });
                
                milestones = _.sortBy(milestones, function(milestone) { return milestone.achieve_date.date; });
                
                return milestones;
            },
        }
    }
</script>

