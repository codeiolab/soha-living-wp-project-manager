<template>
    <div class="pm-checkbox">
        <input value="yes" type="checkbox" :id="'mark_as_complete_' + task.id"> 
        <label :for="'mark_as_complete_' + task.id"></label>
    </div>
</template>

<script>

export default {
    props: {
        task: {
            type: [Object],
            default () {
                return {}
            }
        },
    }
}
</script>