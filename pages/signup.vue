<template>
<Row>
  <Col :xs="{ span: 0, offset: 0 }" :lg="{ span: 0, offset: 0 }"></Col>
  <Col :xs="{ span: 18, offset: 2 }" :sm="{ span: 12, offset: 6 }" :md="{ span: 12, offset: 6 }" :lg="{ span: 5, offset: 10 }">
  <Card>
    <p slot="title">SignUp</p>
    <Form ref="formInline" :model="formInline" :rules="ruleInline">
      <FormItem prop="name">
        <Input type="text" v-model="formInline.name" placeholder="User Name">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
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
      <FormItem prop="confirmPassword">
        <Input type="password" v-model="formInline.confirmPassword" placeholder="Confirm Password">
        <Icon type="ios-locked-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" :loading="loading" @click="handleSubmit('formInline')">submit</Button>
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
    const passwordValidator = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your {{fld}}'.replace('{{fld}}', rule.field === 'password' ? 'Password' : 'Confirm Password')));
      } else {
        if (rule.field === 'password') {
          if (this.formInline.password !== '') {
            this.$refs.formInline.validateField('confirmPassword');
          }
        } else {
          if (this.formInline.password !== this.formInline.confirmPassword) {
            callback(new Error('The two input passwords do not match!'));
          }
        }
        callback();
      }
    }
    return {
      loading: false,
      formInline: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      ruleInline: {
        name: [{
          required: true,
          message: 'Please fill in the user name',
          trigger: 'blur'
        }],
        email: [{
          required: true,
          message: 'Please fill in the email',
          trigger: 'blur'
        }, {
          type: 'email',
          message: 'Incorrect email format',
          trigger: 'blur'
        }],
        password: [{
          validator: passwordValidator,
          trigger: 'blur'
        }],
        confirmPassword: [{
          validator: passwordValidator,
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    handleSubmit(name) {
      var _this22 = this
      _this22.loading = true
      _this22.$refs[name].validate((valid) => {
        if (valid) {
          this.$store.dispatch('services/signup', _this22.formInline).then(function(resp){
            if (resp instanceof Error) {
              _this22.$Message.error(resp.response ? resp.response.data.error : 'Try again..')
            } else {
              _this22.$Message.success({
                content: resp.success,
                duration: 1.5,
                onClose: () => {
                  _this22.$Message.info({
                    content: 'redirect to signin...',
                    duration: 1.2,
                    onClose: () => {
                      setTimeout((inst) => {inst.$router.push({name:'signin'})}, 1000, _this22)
                    }
                  })
                }
              })              
            }
          }).catch(function (err){
            console.log(err)
          })
          
        } else {
          _this22.$Message.error('Fail!');
        }
        setTimeout((inst) => {inst.loading = false}, 2000, _this22)
      })
    }
  }
};
</script>

<style scoped>

</style>