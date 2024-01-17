<template>
    <div class="pm-attachment-area-minimal">
        <div  id="pm-upload-container">
            <span>
                <a v-pm-uploader  href="#">
                    <i class="bb-icon-attach bb-icon-l"></i>
                </a>
            </span>

            <div class="notify-users" v-if="discussionPage">
                <a href="#" @click.prevent="notifyUserButton()" class="pm-button pm-secondary pm-button-nofity-user">
                    <i class="bb-icon-user bb-icon-l"></i>
                </a>

                <div class="pm-multiselect-top pm-multiselect-single-task" v-if="activeNotifyUsers">
                    <div class="pm-multiselect-content">
                        <div class="assign-to">{{ __('Assign to', 'wedevs-project-manager') }}</div>
                        <multiselect
                            v-model="notify_users"
                            :options="project_users"
                            :multiple="true"
                            :close-on-select="false"
                            :clear-on-select="true"
                            :show-labels="true"
                            :searchable="true"
                            :placeholder="__('Search User', 'wedevs-project-manager')"
                            select-label=""
                            selected-label="selected"
                            deselect-label=""
                            label="display_name"
                            track-by="id"
                            :allow-empty="true">

                            <template slot="option" slot-scope="props">
                                <img class="option__image" :src="props.option.avatar_url" alt="No Man’s Sky">
                                <div class="option__desc">
                                    <span class="option__title">{{ props.option.display_name }}</span>
                                </div>
                            </template>

                        </multiselect>
                    </div>
                </div>
            </div>
            
            <div class="pm-upload-filelist" v-if="files.length > 0">
                <div class="pm-uploaded-item" v-for="file in files" :key="file.id">
                    <a class="pm-uploaded-img" :href="file.url" target="_blank">
                        <img v-if="file.absoluteUrl" class="pm-uploaded-file" :src="file.absoluteUrl" :alt="file.name" :title="file.name">
                        <img v-if="!file.absoluteUrl" class="pm-uploaded-file" :src="file.thumb" :alt="file.name" :title="file.name">
                    </a>
                    <a href="#" @click.prevent="deletefile(file.id)" class="button">{{ __( 'Delete File', 'wedevs-project-manager') }}</a>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="less">
    .pm-attachment-area {
        .pm-uploaded-img {
            display: inline-block;

            .pm-uploaded-file {
                object-fit: contain;
            }
        }
    }
</style>


<script>
  import Multiselect from 'vue-multiselect';

    // Register a global custom directive called v-pm-popup-box
    Vue.directive('pm-uploader', {
        inserted: function (el, binding, vnode) { 
            new PM_Uploader(el, 'pm-upload-container', vnode.context );
        },
    });

    export default {
        props: {
            files: {
                type: Array,
                default: function () {
                    return []
                }
            },
            delete: {
                type: Array,
                default: function () {
                    return []
                }
            },
            single: {
                type: Boolean,
                default: false,
            },
            attr: {
                type: Object,
                default () {
                    return {
                        onlyButton: false,
                        buttonText: __('select files', 'wedevs-project-manager')
                    }
                }
            },
            discussionPage: {
                type: Boolean,
                default: function () {
                    return []
                }
            }
        },

        data () {
            return {
                activeNotifyUsers: false,
                notify_users:[],
            }
        },

        methods: {
            /**
             * Set the uploaded file
             *
             * @param  object file_res
             *
             * @return void
             */
            fileUploaded: function( file_res ) {

                if ( typeof this.files == 'undefined' ) {
                    this.files = [];
                }

                this.files.push( file_res.res.file );
                
            },

            /**
             * Delete file
             *
             * @param  object file_id
             *
             * @return void
             */
            deletefile: function(file_id) {
                if ( ! confirm( this.text.are_you_sure ) ) {
                    return;
                }
                var self = this;
                var index = self.getIndex(self.files, file_id, 'id');

                if (index !== false) {
                    self.files.splice(index, 1);
                    this.delete.push(file_id);
                }  
            },
            test () {

            },
            notifyUserButton () {
                this.activeNotifyUsers = this.activeNotifyUsers ? false : true;

                if(this.activeNotifyUsers) {
                    pm.Vue.nextTick(function() {
                        jQuery('.notify-users').find('.multiselect__input').show().focus();
                    });
                }
            },
        },
        computed: {
            project_users () {
                return this.$root.$store.state.project_users;
            },
        },
        components: {
            'multiselect': Multiselect,
        },
    }
</script>
