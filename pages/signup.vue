<template>
<Row>
  <Col :xs="{ span: 0, offset: 0 }" :lg="{ span: 0, offset: 0 }"></Col>
  <Col :xs="{ span: 18, offset: 2 }" :sm="{ span: 12, offset: 6 }" :md="{ span: 12, offset: 6 }" :lg="{ span: 5, offset: 10 }">
  <Card>
    <p slot="title">SignUp</p>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" >
       <FormItem prop="name">
        <Input type="text" v-model="formInline.name" placeholder="User Name">
        <Icon type="ios-profile-outline" slot="prepend"></Icon>
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
        <Button type="primary" @click="handleSubmit('formInline')" >submit</Button>
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
        }],
        password: [{
            required: true,
            message: 'Please fill in the password.',
            trigger: 'blur',
          },
          {
            type: 'string',
            min: 6,
            message: 'The password length cannot be less than 6 bits',
            trigger: 'blur'
          },
          {
            target: 'confirmPassword',
            message: 'The password cannot equal confirm password',
            trigger: 'blur',
          }
        ],
        confirmPassword: [{
            required: true,
            message: 'Please fill in the password.',
            trigger: 'blur',
            target: 'password'
          },
          {
            type: 'string',
            min: 6,
            message: 'The password length cannot be less than 6 bits',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!');
        } else {
          this.$Message.error('Fail!');
        }
      })
    }
  }
};
</script>

<style scoped>

</style>