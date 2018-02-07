<template>
<Row>
  <Col :xs="{ span: 0, offset: 0 }" :lg="{ span: 0, offset: 0 }"></Col>
  <Col :xs="{ span: 18, offset: 2 }" :sm="{ span: 12, offset: 6 }" :md="{ span: 12, offset: 6 }" :lg="{ span: 5, offset: 10 }">
  <Card>
    <p slot="title">SignIn</p>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" >
      <FormItem prop="email">
        <Input type="email" v-model="formInline.email" placeholder="Email">
        <Icon type="ios-email-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="formInline.password" placeholder="Password">
        <Icon type="ios-locked-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')" :loading="loading">Signin</Button>
      </FormItem>
    </Form>
  </Card>
  </Col>
  <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }"></Col>
</Row>
</template>

<script>
export default {
  layout(context) {
    return "public";
  },
  data() {
    return {
      loading: false,
      formInline: {
        email: '',
        password: ''
      },
      ruleInline: {
        email: [{
          required: true,
          message: 'Please fill in the email',
          trigger: 'blur'
        }],
        password: [{
            required: true,
            message: 'Please fill in the password.',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    handleSubmit(name) {
      var _thproc = this
      _thproc.loading = true
      _thproc.$refs[name].validate((valid) => {
        if (valid) {
          this.$store.dispatch('services/signin', _thproc.formInline).then(function(resp){
            debugger
            if (resp instanceof Error) {
              _thproc.$Message.error(resp.response ? resp.response.data.error : 'Try again..')
            } else {
              _thproc.$Message.success({
                content: resp.success,
                duration: 1.5,
                onClose: () => {
                  _thproc.$Message.info({
                    content: 'redirect to signin...',
                    duration: 1.2,
                    onClose: () => {
                      setTimeout((inst) => {inst.$router.push({name:'signin'})}, 1000, _thproc)
                    }
                  })
                }
              })              
            }
          }).catch(function (err){
            console.log(err)
          })
        } else {
          _thproc.$Message.error('Fail!');
        }
        setTimeout((inst) => {inst.loading = false}, 2000, _thproc)
      })
    }
  }
};
</script>

<style scoped>

</style>