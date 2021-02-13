<template>
  <div class="about-me">
    <img
      class="about-me__icon"
      src="https://cv.sierrasoftworks.com/resources/avatar.jpg"
      alt="A picture of Benjamin Pannell"
    />
    <p class="about-me__name">Benjamin Pannell</p>
    <p class="about-me__role">Site Reliability Engineer, Microsoft</p>
    <p class="about-me__location">Dublin, Ireland</p>
  </div>
</template>

<script>
export default {};
</script>

<style>
.about-me {
  max-width: 960px;
  margin: 0 auto;
  text-align: center;
}

.about-me p {
  margin: 0;
}

.about-me__icon {
    max-width: 100px;
    border-radius: 100%;
}

.about-me__name {
  font-weight: bold;
}

.about-me__role {
  font-size: 0.9rem;
}

.about-me__location {
  font-weight: lighter;
  font-size: 0.9rem;
}
</style>