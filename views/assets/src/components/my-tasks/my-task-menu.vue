<template>
    <div class="pm-project-header pm-project-head">
        <div class="pm-project-group">
            <ul class="pm-my-task-menu">
                    <li>
                    <router-link :to="routeLink('current')" class="pm-my-outstandigntask">
                        {{ __('Tasks', 'wedevs-project-manager' ) }}

                    </router-link>

                </li>

                <li>
                    <router-link :to="routeLink('tasks')" class="pm-my-taskoverview">
                        {{ __('Overview', 'wedevs-project-manager' )}}

                    </router-link>

                </li>
                <li>
                    <router-link :to="routeLink('activities')" class="pm-my-completetask">
                        {{ __('Activities', 'wedevs-project-manager' )}}

                    </router-link>

                </li>
            </ul>
            <div class="clearfix"></div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        routeLink( name ) {
            var route = { name : 'mytask-'+ name };

            if( typeof this.$route.params.user_id !== 'undefined' ) {
                route.params = { user_id : this.$route.params.user_id }
            }

            return route;
        }
    }
}
</script>