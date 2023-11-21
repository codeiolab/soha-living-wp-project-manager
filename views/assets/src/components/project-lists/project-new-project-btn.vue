<template>
    <div class="project-add-modal">
        <a href="#" id="pm-create-project" @click.prevent="showHideProjectForm()" class="pm-btn pm-btn-primary pm-btn-uppercase">
            <i class="bb-icon-plus bb-icon-l" aria-hidden="true"></i>
            &nbsp;&nbsp;{{ __( 'New Project', 'wedevs-project-manager') }}
        </a>
        <div class="new-project-form" v-if="is_active_project_form">
            <i class="bb-icon-times bb-icon-l" @click.prevent="showHideProjectForm()"></i>
            <project-create-form :project="{}"></project-create-form>
        </div>
    </div>
</template>

<script>
    import project_create_form from './project-create-form.vue';
    import Mixins from './mixin';
    export default{
        components: {
            'project-create-form': project_create_form,
        },
        mixins: [Mixins],
        data () {
            return {
                is_active_project_form: false
            }
        },
        methods: {
            showHideProjectForm () {
                return this.is_active_project_form = !this.is_active_project_form;
            },
        }
    }
    // var project_btn = {
    //     methods: {
    //         is_popup_active () {
    //             jQuery('#pm-project-dialog').dialog( "open" );
    //             //this.$store.commit('is_popup_active', {is_active: true});
    //         }
    //     }
    // }

    // export default project_btn;
</script>