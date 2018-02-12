<template>
<div class="layout">
  <Layout>
    <Header>
      <Menu mode="horizontal" theme="dark" active-name="1">
        <div class="layout-logo"></div>
        <div class="layout-nav">
          <MenuItem name="1">
          <Icon type="ios-navigate"></Icon>
          <nuxt-link to="/iview"></nuxt-link>
          </MenuItem>
        </div>
      </Menu>
    </Header>
  </Layout>
  <Layout>
    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
      <nuxt/>
    </Content>
  </Layout>

</div>
</template>

<script>
export default {
  middleware: 'check-auth'
};
</script>

<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}

.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
</style>
