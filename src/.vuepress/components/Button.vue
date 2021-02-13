<template>
  <a class="button" :href="href">
      <slot></slot>
  </a>
</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({
    props: {
        href: {
            type: String,
            required: true
        }
    }
})
</script>

<style>
    .button {
        padding: 0 2rem;
        line-height: 3rem;
        font-size: 1.2rem;
        font-weight: 500;

        display: inline-block;
        border-radius: 6px;
        color: #fff;
        background-color: var(--accentColor);
        border: 2px solid var(--acentColor);
        transition: background-color .1s ease;
    }

    .button:hover {
        text-decoration: none;
        color: #fff;
        background-color: var(--accentColorLight);
    }
</style>