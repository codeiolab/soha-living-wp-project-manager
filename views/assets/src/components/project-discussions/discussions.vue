<template>
    <div class="pm-wrap pm-front-end">
        <pm-header></pm-header>
        <pm-heder-menu></pm-heder-menu>
        <div v-if="!isFetchDiscussion" class="pm-data-load-before" >
            <div class="loadmoreanimation">
                <div class="load-spinner">
                    <div class="rect1"></div>
                    <div class="rect2"></div>
                    <div class="rect3"></div>
                    <div class="rect4"></div>
                    <div class="rect5"></div>
                </div>
            </div>
        </div>

        <!-- {{ pm.i18n.__('Add List', 'cpm') }} -->
        <div v-if="can_create_message()">
            <a @click.prevent="showHideDiscussForm('toggle')" class="pm-btn pm-plus-white pm-new-message-btn pm-btn-uppercase" href="" id="pm-add-message"> <i aria-hidden="true" class="bb-icon-plus bb-icon-l"></i>
                {{ __( 'New Discussion', 'wedevs-project-manager') }} 
            </a>
        </div>
        <!-- <pre>{{ $store.state.project_users }}</pre> -->
        <div class="pm-discussion pm-discussion-container" v-if="isFetchDiscussion">
            <div class="pm-blank-template discussion" v-if="blankTemplate && is_discuss_form_active">
                <transition name="slide" v-if="can_create_message()">
                    <div class="pm-new-message-form" v-if="is_discuss_form_active">
                        <h3>{{ __( 'Create a New Discussion', 'wedevs-project-manager') }}</h3>
                        <new-discuss-form  :discuss="{}"></new-discuss-form>
                    </div>
                </transition>
            </div>
            <div v-if="discussTemplate">
                <div class="pm-row discussion">
                    <transition name="slide" v-if="can_create_message()">
                        <div class="pm-form pm-new-message-form" v-if="is_discuss_form_active">
                            <h3>{{ __( 'Create a New Discussion', 'wedevs-project-manager')}}</h3>
                            <new-discuss-form  :discuss="{}"></new-discuss-form>
                        </div>
                    </transition>

                </div>
                <div class="pm-message-page">
                    <div class="pm-message-list">
                        <ul class="dicussion-list">        
                            <li v-for="discuss in discussion" :key="discuss.id">
                                <div class="discuss-list-content" v-if="!discuss.edit_mode">
                                    <router-link 
                                        class="pm-col-9 pm-messge-link" 
                                        :to="{ name: 'individual_discussions',  params: { discussion_id: discuss.id }}">
                                        
                                        <div class="pm-message-inner">
                                            <a class="pm-col-1" :href="myTaskRedirect(discuss.creator.data.id)" :title="discuss.creator.data.display_name" >
                                                <img :alt="discuss.creator.data.display_name" :src="discuss.creator.data.avatar_url" class="avatar avatar-48 photo" height="48" width="48">
                                            </a>
                                            <div class="pm-messege-wrapper pm-col-11">
                                                <div v-html="discuss.title" />
                                                
                                                <div class="dicussion-meta">
                                                    {{ __( 'By', 'wedevs-project-manager') }}
                                                    <a :href="myTaskRedirect(discuss.creator.data.id)" :title="discuss.creator.data.display_name" >
                                                        {{ discuss.creator.data.display_name }}
                                                    </a> 
                                                    {{ __( 'on', 'wedevs-project-manager') }}
                                                    {{ taskDateFormat(discuss.created_at.date) }}, {{ dateTimeFormat(discuss.created_at.datetime) }}                  
                                                    <div class="comment-count">
                                                        <i class="bb-icon-comment bb-icon-l"></i>
                                                        <router-link 
                                                            class="pm-link" 
                                                            :to="{ name: 'individual_discussions',  params: { discussion_id: discuss.id }}">
                                                            {{ discuss.meta.total_comments }} {{ __( 'Comments', 'wedevs-project-manager') }} 
                                                        </router-link>           
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </router-link>

                                    <div v-if="can_edit_message(discuss)">
                                        <div class="discuss-more-menu milestone-more-menu">
                                            <!-- popper -->
                                            <pm-popper trigger="click" :options="popperOptions">
                                                <div class="pm-popper popper">
                                                    <div class="more-menu-ul-wrap">
                                                        <ul>
                                                            <li>
                                                                <a :title="edit" @click.prevent="showHideDiscussForm('toggle', discuss)" class="pm-icon-edit" href="#">
                                                                    <span>{{ __('Edit', 'wedevs-project-manager') }}</span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a @click.prevent="deleteSelfDiscuss(discuss.id)" class="pm-milestone-delete" :title="delete_this_message" href="#">
                                                                    <span>{{ __('Delete', 'wedevs-project-manager') }}</span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a :title="make_it_private" v-if="PM_Vars.is_pro && user_can('view_private_message')" @click.prevent="lockUnlock(discuss)" class="pm-milestone-open" href="#">
                                                                    <span v-if="privateClass( discuss ) == 'dashicons dashicons-lock'">{{ __('Public', 'wedevs-project-manager') }}</span>
                                                                    <span v-else>{{ __('Lock', 'wedevs-project-manager') }}</span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                
                                                <!-- popper trigger element -->
                                                <span slot="reference" title="Assign user" class="pm-popper-ref popper-ref icon-pm-more-options"></span>
                                            </pm-popper>
                                        </div>
                                    </div>
                                </div>

                                <div class="clear"></div>
                                <transition name="slide" v-if="can_create_message()">
                                    <new-discuss-form v-if="discuss.edit_mode" :discuss="discuss"></new-discuss-form>
                                </transition>
                                
                            </li>
                     
                        </ul>    
                    </div>
                    <div class="clear"></div>
                </div>
            
                <pm-pagination 
                    :total_pages="total_discussion_page" 
                    :current_page_number="current_page_number" 
                    component_name='discussion_pagination'>
                    
                </pm-pagination> 
            </div>
        </div>
        
    </div>

</template>

<style lang="less">
    .pm-discussion {
        .pm-blank-template {
            background: transparent;
            border: none;
            box-shadow: none;
        }
    }
</style>


<script>
    import header from './../common/header.vue';
    import new_discuss_form from './new-discuss-form.vue';
    import pagination from './../common/pagination.vue';
    import Mixins from './mixin';

    export default {
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.getGlobalMilestones();
                vm.discussQuery();
            });
        },

        mixins: [Mixins],

        data () {
            return {
                edit: __('Edit', 'wedevs-project-manager'),
                delete_this_message: __('Delete this message', 'wedevs-project-manager'),
                make_it_private: __('Make it private', 'wedevs-project-manager'),
                current_page_number: 1,
                header: 'this is custom header'
            }
        },

        watch: {
            '$route' (route) {
                this.discussQuery();
            }
        },

        components: {
            'pm-header': header,
            'new-discuss-form': new_discuss_form,
            'pm-pagination': pagination,
        },

        computed: {
            discussTemplate () {
                return this.$store.state.projectDiscussions.discuss_template;
            },
            blankTemplate () {
                if(!this.$store.state.projectDiscussions.blank_template){
                    this.$store.state.projectDiscussions.is_discuss_form_active = false;
                }
                return this.$store.state.projectDiscussions.blank_template;
            },
            is_discuss_form_active () {
                return this.$store.state.projectDiscussions.is_discuss_form_active;
            },

            discussion () {
                return this.decodeDiscussionHtml( this.$store.state.projectDiscussions.discussion );
            },

            total_discussion_page () {
                return this.$store.state.projectDiscussions.meta.pagination.total_pages;
            },

            isFetchDiscussion () {
                return this.$root.$store.state.projectDiscussLoaded;
            }
        },
        
        methods: {
            popperOptions () {
                return {
                    placement: 'bottom-end',
                    modifiers: { offset: { offset: '0, 3px' } },
                }
            },
            discussQuery () {
                var self = this;
                
                var conditions = {
                    with: 'comments',
                    per_page: 20,
                    page: this.setCurrentPageNumber()
                };

                var args = {
                    conditions: conditions,
                    callback: function(){
                        self.lazyAction();
                        self.$root.$store.state.projectDiscussLoaded = true;
                        pm.NProgress.done();
                    }  
                }

                this.getDiscussion(args);
            },

            deleteSelfDiscuss ( id ) {
                var self = this;
                var args = {
                    discuss_id: id,
                    callback: function() {
                        self.lazyAction();
                    }
                }

                self.deleteDiscuss(args);
            },

            decodeDiscussionHtml ( discussions ) {
                return discussions.map( singleDiscussion => {
                    const txt = document.createElement( 'textarea' );
                    txt.innerHTML = singleDiscussion.title;
                    singleDiscussion.title = txt.value;

                    return singleDiscussion;
                } );
            },
        }
    }

</script>
