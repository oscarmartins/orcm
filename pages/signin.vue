<template>
  <Row>
    <Col :xs="{ span: 0, offset: 0 }" :lg="{ span: 8, offset: 2 }">
    </Col>
    <Col :xs="{ span: 8, offset: 8 }" :lg="{ span: 4, offset: 10 }">
    <Card>
      <p slot="title">SignIn</p>
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="user">
          <Input type="text" v-model="formInline.user" placeholder="Username">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formInline.password" placeholder="Password">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
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
          user: '',
          password: ''
        },
        ruleInline: {
          user: [{
            required: true,
            message: 'Please fill in the user name',
            trigger: 'blur'
          }],
          password: [{
              required: true,
              message: 'Please fill in the password.',
              trigger: 'blur'
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