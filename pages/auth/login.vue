<template>
    <div>
        <Form :model="formItem" :label-width="80">
        <FormItem label="Input">
            <Input v-model="formItem.input" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem>
            <Button type="primary">Submit</Button>
            <Button type="ghost" style="margin-left: 8px">Cancel</Button>
        </FormItem>
        
    </Form>
    </div>
</template>
<script>
  export default {
      layout: 'public',
        data () {
            return {
                formItem: {
                    input: ''
                }
            }
        }
    }
</script>
<style scoped>

</style>