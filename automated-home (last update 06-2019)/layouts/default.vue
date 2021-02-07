<template>
  <div>
    <div class="overlay"></div>
    <Header></Header>
    <main class="main">
      <div class="main__content">
        <Category></Category>
        <nuxt/>
      </div>
      <div class="main__sidebar">
        <inbox></inbox>
      </div>
    </main>
    <div class="footer">
      <QuickBar></QuickBar>
    </div>
  </div>
</template>

<script>
import Header from "~/components/Header";
import QuickBar from "~/components/QuickBar";
import Inbox from "~/components/Inbox";
import Category from "~/components/Category";

export default {
  components: { Header, QuickBar, Inbox, Category }
};
</script>

<style lang="scss">
@import "~/assets/scss/variables.scss";

.main {
  display: flex;
  min-height: calc(100vh - 70px);

  &__content {
    flex: 1;
    align-items: center;
    padding: 10px;
  }

  &__sidebar {
    padding: 10px;
  }

  &__map {
    max-height: 500px;
  }
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: $color;
  padding: 10px;
  height: 60px;
}

// override components
.inbox__box {
  height: 100px;
}

@media (max-width: 767px) {
  .header-wrapper {
    height: 55px;
  }
  .main {
    margin-top: 25px;
  }
  .footer-wrapper {
    height: 80px;
    overflow: hidden;
  }
}
</style>
