<template>
  <div class="firstCard">
    <Swipe
      class="my-swipe"
      :autoplay="3000"
      height="130"
      indicator-color="white">
      <SwipeItem v-for="image in swiperImages" :key="image">
        <img :src="image" />
      </SwipeItem>
    </Swipe>
    <Row class="bannerButton" justify="space-around">
      <Col span="4">
        <div class="col">
          <Icon name="newspaper" size="7vw" />
          实况
        </div></Col
      >
      <Col span="4">
        <div class="col">
          <Icon name="newspaper" size="7vw" />
          实况
        </div>
      </Col>
      <Col span="4">
        <div class="col">
          <Icon name="label" size="7vw" />
          状态
        </div>
      </Col>
      <Col span="4">
        <div class="col">
          <Icon name="notes" size="7vw" />
          日程
        </div>
      </Col>
      <Col span="4">
        <div class="col">
          <Icon name="records" size="7vw" />
          咨询
        </div>
      </Col>
    </Row>
  </div>
  <InfoCard/>
</template>

<script setup lang="ts">
import { Swipe, SwipeItem, Row, Col, Icon } from "vant";
import InfoCard from "@/components/InfoCard.vue";
const swiperImages = ["/1.png", "/2.png", "/3.png"];

</script>

<style scoped>
.firstCard {
  margin: 5px;
  border: 1px solid whitesmoke;
  border-radius: 10px;
  overflow: hidden;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  margin: 10px 0px;
}
.van-col:active {
  background-color: whitesmoke;
}
.bannerButton {
  background-color: white;
}
</style>
